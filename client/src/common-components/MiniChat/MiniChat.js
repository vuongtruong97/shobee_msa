import React, { useState, useEffect } from 'react'
import styles from './MiniChat.module.scss'
import { BiConversation } from 'react-icons/bi'
import { BsArrowDownSquare, BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'
import socket from 'services/socketIO'
import { useSelector } from 'react-redux'
import chatAPI from 'services/chat-api/chat-api'
import userAPI from 'services/user-api/user-api'

import ChatOnline from './ChatOnline'
import EmptyChat from './EmptyChat'
import ChatDialog from './ChatDialog'

function MiniChat() {
    const user = useSelector((state) => state.user.info)
    const reduxChatState = useSelector((state) => state.chat.currentChat)

    const [showChat, setShowChat] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)

    const [listChat, setListChat] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [conversations, setConversations] = useState([])

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
    const getUserById = async (id) => {
        try {
            const res = await userAPI.getUserById(id)
            if (res.data.success) {
                return res.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on('notification', (payload) => {
            if (!conversations.some((conv) => conv.members.includes(payload.senderId))) {
                getConversations()
            }
        })
    }, [])

    // handle redux chat State
    useEffect(() => {
        if (!!reduxChatState) {
            // find exist conversation
            if (conversations.length > 0) {
                console.log('run')
                const existConversation = conversations.find((conv) =>
                    conv.members.includes(reduxChatState)
                )

                if (existConversation) {
                    setCurrentChat(existConversation)
                }
            } else {
                setCurrentChat({
                    members: [reduxChatState, user.id],
                    type: 'dummy',
                })
            }

            setShowChat(true)
            setShowDialog(true)
        }
    }, [reduxChatState])

    // handle show chat state
    const handleSetShowChat = () => {
        setShowChat(!showChat)
    }
    // handle show dialog state
    const handleSetShowDialog = () => {
        setShowDialog(!showDialog)
    }
    // handle set curren chat
    const handleSetCurrentChat = (data) => {
        setShowDialog(true)
        if (currentChat?.id === data.id) return
        setCurrentChat(data)
    }
    // handle online users
    useEffect(() => {
        socket.emit('addUser', user.id)
        if (conversations) {
            socket.on('getUsers', (users) => {
                setOnlineUsers(
                    conversations.filter((f) => users.some((u) => u.userId === f))
                )
            })
        }
    }, [user.id])

    // handle conversation and list chat
    useEffect(() => {
        getConversations()

        const getListChat = async () => {
            try {
                const res = await chatAPI.getListChat()
                console.log(res)
                if (res.data.success) {
                    setListChat(res.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!!user.id) {
            getConversations()
            // getListChat()
        }
    }, [user.id, currentChat])

    return (
        <div className={styles.miniChat}>
            {!showChat && (
                <div onClick={handleSetShowChat} className={styles.entry}>
                    <div className={styles.icon}>
                        <BiConversation />
                    </div>
                    <div className={styles.title}>Chat</div>
                </div>
            )}
            {showChat && (
                <div className={styles.chatBox}>
                    <div className={styles.chatHeader}>
                        <div className={styles.logo}>Chat</div>
                        <div className={styles.operator}>
                            <div
                                onClick={handleSetShowDialog}
                                className={styles.controlDialog}
                            >
                                {showDialog ? (
                                    <BsArrowRightSquare />
                                ) : (
                                    <BsArrowLeftSquare />
                                )}
                            </div>
                            <div
                                onClick={handleSetShowChat}
                                className={styles.chatMinimize}
                            >
                                <BsArrowDownSquare />
                            </div>
                        </div>
                    </div>
                    <div className={styles.chatWindow}>
                        {showDialog && (
                            <div className={styles.chatIndex}>
                                {!currentChat && <EmptyChat />}
                                {currentChat && (
                                    <ChatDialog
                                        user={user}
                                        currentChat={currentChat}
                                        setCurrentChat={setCurrentChat}
                                        getConversations={getConversations}
                                        getUserById={getUserById}
                                    />
                                )}
                            </div>
                        )}

                        <ChatOnline
                            conversations={conversations}
                            handleSetCurrentChat={handleSetCurrentChat}
                            getUserById={getUserById}
                            user={user}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MiniChat
