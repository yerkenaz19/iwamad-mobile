import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.text}>
        This page does not exist.
      </Text>

      <Link href="/" style={styles.link}>
        Go back home
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
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  link: {
    color: '#2563eb',
    fontSize: 16,
  },
})