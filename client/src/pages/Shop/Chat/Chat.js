import React, { useState, useEffect, useRef } from 'react'
import DivStyle1 from 'common-components/UI/Div/DivStyle1'
import Conversation from '../components/Conversation/Conversation'
import ListChat from '../components/ListChat/ListChat'
import socket from 'services/socketIO'
import { useSelector } from 'react-redux'
import chatAPI from 'services/chat-api/chat-api'
import emptyConversationPng from 'assets/images/no_conversation_bg.png'

socket.connect()

export default function Chat() {
    const user = useSelector((state) => state.user.info)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(true)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [listChat, setListChat] = useState([])

    // console.log(user)
    // const scrollRef = useRef()

    // console.log('conversations', conversations)
    // console.log('messages', messages)
    // console.log('newMessage', newMessage)
    // console.log('arrivalMessage', arrivalMessage)
    // console.log('onlineUsers', onlineUsers)

    // handle send and get message
    useEffect(() => {
        socket.on('getMessage', (data) => {
            console.log(data)
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    // handle set messages
    useEffect(() => {
        // arrivalMessage &&
        //     currentChat?.members.includes(arrivalMessage.sender) &&
        //     setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    // handle online users
    useEffect(() => {
        socket.emit('addUser', user.shop)
        if (listChat) {
            socket.on('getUsers', (users) => {
                setOnlineUsers(listChat.filter((f) => users.some((u) => u.userId === f)))
            })
        }
    }, [user.shop])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await chatAPI.getConversations()
                if (res.data.success) {
                    setConversations(res.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        const getListChat = async () => {
            try {
                const res = await chatAPI.getListChat()
                if (res.data.success) {
                    setListChat(res.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!!user.shop) {
            getConversations()
            getListChat()
        }
    }, [user.shop])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await chatAPI.getMessages()
                setMessages(res.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        if (!!currentChat) {
            getMessages()
        }
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user.shop,
            text: newMessage,
            conversationId: currentChat.shop,
        }

        const receiverId = currentChat.members.find((member) => member !== user.shop)

        socket.current.emit('sendMessage', {
            senderId: user.shop,
            receiverId,
            text: newMessage,
        })

        try {
            const res = await chatAPI.sendMessage()
            setMessages([...messages, res.data])
            setNewMessage('')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    console.log('re-render')
    return (
        <div className='row' style={{ height: '85vh' }}>
            <div className='col col-2 sm-2 lg-3'>
                <DivStyle1 maxheight>
                    <ListChat onlineUsers={onlineUsers} listChat={listChat} />
                </DivStyle1>
            </div>
            <div className='col col-10 sm-10 lg-9'>
                <DivStyle1 maxheight>
                    {currentChat && <Conversation handleSubmit={handleSubmit} />}
                    {!currentChat && (
                        <div
                            style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                fontSize: '1.8rem',
                            }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${emptyConversationPng})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '40%',
                                    width: '40%',
                                }}
                            ></div>
                            <span>
                                Chào mừng bạn đến với tính năng Chat dành cho Người Bán
                                Shobee!
                            </span>
                            <span>Bắt đầu trả lời người mua!</span>
                        </div>
                    )}
                </DivStyle1>
            </div>
        </div>
    )
}
