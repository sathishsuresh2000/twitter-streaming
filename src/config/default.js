export default {
  socketConfig: {
    path: '/',
    reconnection: true,
    reconnectionDelay: 3000,
    reconnectionDelayMax: 6000,
    reconnectionAttempts: 'Infinity'
  },
  api: {
    message: {
      list: "/messages",
      newMessages: "/messages/new"
    }
  }
}