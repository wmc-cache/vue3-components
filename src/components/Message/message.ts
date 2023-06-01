
import Message from '@components/Message/message.vue'
import { createApp } from "vue";
export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageOption {
  type: MessageType
  message: string
  duration?: number
}

export const createMessage = (options: MessageOption): Function => {
  const { type, message, duration } = options
  const div = document.createElement('div')
  const id = `message${(Math.random() * 100000).toFixed(0)}`
  div.id = id
  document.body.appendChild(div)
  const app = createApp(Message, {
    type,
    message,
    duration
  })
  app.mount(`#${id}`);

  const close = () => {
    app.unmount()
  }
  return close
}