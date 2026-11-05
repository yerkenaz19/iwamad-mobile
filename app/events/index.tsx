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

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => console.log('Saved:', item.id)}
          />
        )}
        keyExtractor={(e) => String(e.id)}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No events found</Text>
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
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
})