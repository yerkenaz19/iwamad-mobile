
import { useEffect, useState } from 'react'
import {
  subscribeToChat,
  type ChatMessage,
} from '../lib/chat'

type ChatStatus = 'connecting' | 'live' | 'error'

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>('connecting')

  useEffect(() => {
    setStatus('connecting')

    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        setMessages(list)
        setStatus('live')
      },
      () => {
        setStatus('error')
      },
    )

    return unsubscribe
  }, [eventId, eventTitle])

  return { messages, status }
}
