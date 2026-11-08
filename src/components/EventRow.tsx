
import { Pressable, Text, StyleSheet, View } from 'react-native'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  isSaved: boolean
  onPress: () => void
  onLongPress: () => void
}

export default function EventRow({
  event,
  isSaved,
  onPress,
  onLongPress,
}: EventRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>
          {event.date} · {event.place}
        </Text>
        {isSaved && <Text style={styles.saved}>★ Saved</Text>}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  pressed: {
    backgroundColor: '#dbeafe',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  saved: {
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
})
