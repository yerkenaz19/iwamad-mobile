
import { Pressable, Text, StyleSheet, View } from 'react-native'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  isSaved: boolean
  onPress: () => void
  onToggleSaved: () => void
}

export default function EventRow({
  event,
  isSaved,
  onPress,
  onToggleSaved,
}: EventRowProps) {
  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={60}
      renderRightActions={(_progress, _translation, swipeable) => (
        <Pressable
          style={styles.action}
          onPress={() => {
            onToggleSaved()
            swipeable.close()
          }}
        >
          <Text style={styles.actionText}>
            {isSaved ? 'Unsave' : 'Save'}
          </Text>
        </Pressable>
      )}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Pressable
          style={({ pressed }) => [
            styles.row,
            pressed && styles.pressed,
          ]}
          onPress={onPress}
          onLongPress={onToggleSaved}
        >
          <View>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.details}>
              {event.date} · {event.place}
            </Text>
            {isSaved && (
              <Animated.Text entering={ZoomIn} style={styles.saved}>
                ★ Saved
              </Animated.Text>
            )}
          </View>
        </Pressable>
      </Animated.View>
    </ReanimatedSwipeable>
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
  action: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 6,
    backgroundColor: '#2563eb',
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
