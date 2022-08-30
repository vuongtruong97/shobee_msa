import { io } from 'socket.io-client'

const host = 'http://localhost:3003'
const socket = io(host, { autoConnect: true })

socket.connect()

export default socket
