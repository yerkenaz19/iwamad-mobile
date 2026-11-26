
import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native'
import { useChat } from '../hooks/useChat'
import { sendMessage } from '../lib/chat'

type ChatPanelProps = {
  eventId: number
  eventTitle: string
}

export default function ChatPanel({
  eventId,
  eventTitle,
}: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle)
  const [text, setText] = useState('')

  const trimmedText = text.trim()

  const handleSend = async () => {
    if (!trimmedText) return

    await sendMessage(eventId, trimmedText)
    setText('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a message"
        value={text}
        onChangeText={setText}
        maxLength={200}
      />

      <Pressable
        style={[
          styles.button,
          !trimmedText && styles.disabledButton,
        ]}
        onPress={handleSend}
        disabled={!trimmedText}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && (
        <Text>Connecting</Text>
      )}

      {status === 'error' && (
        <Text>Chat unavailable</Text>
      )}

      {status === 'live' && messages.length === 0 && (
        <Text>No messages yet</Text>
      )}

      {[...messages].reverse().map((message) => (
        <Text key={message.id} style={styles.message}>
          {message.author}: {message.text}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  button: {
    minHeight: 44,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    paddingVertical: 4,
  },
})
