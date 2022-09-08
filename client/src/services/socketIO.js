import { io } from 'socket.io-client'

const host = 'http://localhost:3006'
const socket = io(host, { autoConnect: true })

socket.connect()

export default socket
