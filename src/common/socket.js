import socketIOClient from "socket.io-client";
const socket = socketIOClient({
  path: '/socket',
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 3000,
  reconnectionDelayMax: 6000,
  reconnectionAttempts: 'Infinity',
});
socket.on('connect', () => {
  //console.log("connected");
})
export default socket;