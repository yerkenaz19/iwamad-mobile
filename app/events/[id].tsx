
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { useEvents } from '../../src/hooks/useEvents'

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isPending, isError, error, refetch } = useEvents()

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const event = data.find((e) => e.id === Number(id))

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
  retry: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
