import React, { useState, useEffect, useRef } from 'react'
import styles from './ChatDialog.module.scss'
import Filter from 'bad-words'
import { useSelector } from 'react-redux'
import chatAPI from 'services/chat-api/chat-api'
import userAPI from 'services/user-api/user-api'
import socket from 'services/socketIO'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import moment from 'moment'
import 'moment/locale/vi'

import { BsFillImageFill, BsEmojiSmile } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
const filter = new Filter()

function ChatDialog({ user, currentChat, setCurrentChat }) {
    const reduxChatState = useSelector((state) => state.chat.currentChat)

    // const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [activeSendBtn, setActiveSendBtn] = useState(false)
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [receiverInfo, setReceiverInfo] = useState()

    const lastMessRef = useRef()
    const chatInputRef = useRef()

    // listen new message
    useEffect(() => {
        socket.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.sender,
                text: data.text,
                id: data.id,
                createdAt: Date.now(),
            })
        })
    }, [])

    // handle set messages
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await chatAPI.getMessages(currentChat.id)
                setMessages(res.data.data)
                console.log('message fetch', res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (!!currentChat && currentChat.type !== 'dummy') {
            getMessages()
        }
    }, [currentChat])

    const getUserById = async (id) => {
        try {
            const res = await userAPI.getUserById(id)
            if (res.data.success) {
                setReceiverInfo(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserById(currentChat.members.filter((mem) => mem !== user.id))
    }, [currentChat])
    // handle submit message
    const handleSubmit = async (e) => {
        e.preventDefault()
        const text = filter.clean(chatInputRef.current.value) // filter bad words ('english')
        try {
            let currentChatId
            // handle client create new conversation
            if (!currentChat.id) {
                const res = await chatAPI.createConversations({
                    senderId: user.id,
                    receiverId: reduxChatState,
                })

                console.log(res)
                if (res.data.success) {
                    currentChatId = res.data.data.id
                }
                setCurrentChat({ ...currentChat, id: currentChatId })
            } else {
                currentChatId = currentChat.id
            }

            const message = {
                sender: user.id,
                text,
                conversationId: currentChatId,
            }

            const receiverId = currentChat.members.find(
                (memberId) => memberId !== user.id
            )

            socket.emit(
                'sendMessage',
                {
                    senderId: user.id,
                    receiverId,
                    text,
                },
                (res) => {
                    console.log(res.status) // ok
                }
            )

            const res = await chatAPI.sendMessage(message)
            setMessages([...messages, res.data.data])
            chatInputRef.current.value = ''
            chatInputRef.current.focus()
        } catch (err) {
            console.log(err)
        }
    }

    // scroll to last message
    useEffect(() => {
        lastMessRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <div className={styles.conversation_dialog}>
            <div className={styles.conv_head}>
                <img src={receiverInfo?.avatar_url} />
                {receiverInfo && receiverInfo.email}
            </div>
            <div className={styles.conversation_wrap}>
                <div className={styles.conv_list_chat}>
                    {currentChat.type === 'dummy' && (
                        <div className={styles.conv_start}>Bắt đầu trò chuyện</div>
                    )}
                    {messages.map((mess) => (
                        <div
                            className={
                                mess.sender === user.id
                                    ? styles.rightMess
                                    : styles.leftMess
                            }
                            key={mess.id}
                            ref={lastMessRef}
                        >
                            <p>{mess.text}</p>
                            <div className={styles.createdAt}>
                                {moment(mess.createdAt).calendar()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.conv_chat_control}>
                <div className={styles.conv_chat_input}>
                    <textarea
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e)
                            }
                        }}
                        spellCheck='false'
                        ref={chatInputRef}
                        resize='false'
                    />
                </div>
                <div className={styles.conv_chat_option}>
                    <div className={styles.leftOptions}>
                        <div
                            className={styles.conv_chat_icon}
                            onClick={() => {
                                setShowEmojiPicker(!showEmojiPicker)
                            }}
                        >
                            <BsEmojiSmile />
                            {showEmojiPicker && (
                                <div className={styles.conv_chat_emoji_picker}>
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(emoji) => {
                                            chatInputRef.current.value =
                                                chatInputRef.current.value.concat(
                                                    emoji.native
                                                )
                                        }}
                                        emojiButtonColors={['var(--primary)']}
                                        searchPosition={'none'}
                                        maxFrequentRows={3}
                                        emojiButtonSize={28}
                                        emojiSize={18}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.conv_chat_icon}>
                            <BsFillImageFill />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className={styles.sendBtn}
                        style={{
                            color: activeSendBtn ? 'var(--primary)' : null,
                        }}
                    >
                        <BiSend />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatDialog
