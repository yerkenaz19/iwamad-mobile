import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { events } from '../../src/data/events'

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const event = events.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Place: {event.place}</Text>
      <Text>Seats: {event.seats}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})