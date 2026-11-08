
import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { router } from 'expo-router'
import { useEvents } from '../../src/hooks/useEvents'
import { CampusEvent } from '../../src/data/events'
import EventRow from '../../src/components/EventRow'

export default function EventsScreen() {
  const [search, setSearch] = useState('')
  const [savedIds, setSavedIds] = useState<number[]>([])

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEvents()

  const filteredEvents = (data ?? []).filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSaved = (id: number) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    )
  }

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable
          style={styles.retry}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {'{'}
        {savedIds.join(', ')}
        {'}'}
      </Text>

      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No events match</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  search: {
    backgroundColor: 'white',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  hint: {
    marginHorizontal: 16,
    marginBottom: 10,
    color: 'gray',
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
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
})
