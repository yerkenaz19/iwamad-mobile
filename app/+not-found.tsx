
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>

      <Link href="/" style={styles.link}>
        Go home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#2563eb',
    fontSize: 16,
  },
})
