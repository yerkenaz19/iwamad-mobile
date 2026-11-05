import { useState } from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  onPress: () => void
  onLongPress: () => void
}

export default function EventRow({
  event,
  onPress,
  onLongPress,
}: EventRowProps) {
  const [saved, setSaved] = useState(false)

  const handleLongPress = () => {
    setSaved(true)
    onLongPress()
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      onLongPress={handleLongPress}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>
          {event.date} · {event.place}
        </Text>
        {saved && <Text style={styles.saved}>★ Saved</Text>}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
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