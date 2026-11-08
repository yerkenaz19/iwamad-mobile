
import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native'
import { router } from 'expo-router'
import { events } from '../../src/data/events'
import EventRow from '../../src/components/EventRow'

export default function EventsScreen() {
  const [search, setSearch] = useState('')
  const [savedIds, setSavedIds] = useState<number[]>([])

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSaved = (id: number) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
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
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
})
