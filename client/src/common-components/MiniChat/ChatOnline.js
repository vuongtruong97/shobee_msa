import React, { useState, useEffect, useRef } from 'react'
import styles from './ChatOnline.module.scss'

import { BsSearch } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'

import chatLogo from 'assets/images/chatLogo.svg'

function ChatOnline({ conversations, handleSetCurrentChat, getUserById, user }) {
    const [convSearchValue, setConvSearchValue] = useState('')
    const [showClearConvSearch, setShowClearConvSearch] = useState(false)
    const [convDetails, setConvDetails] = useState()

    const convSearchInput = useRef() // pending

    // handle conv search input
    useEffect(() => {
        if (convSearchValue) {
            setShowClearConvSearch(true)
        } else {
            setShowClearConvSearch(false)
        }
    }, [convSearchValue])

    useEffect(() => {
        const getConversationsDetail = async () => {
            const list = await Promise.all(
                conversations.map(
                    async (conv) =>
                        await getUserById(conv.members.filter((id) => id !== user.id))
                )
            )

            setConvDetails(list)
        }
        getConversationsDetail()
    }, [conversations.length])
    return (
        <div className={styles.conversationList}>
            <div className={styles.searchInput}>
                <div className={styles.search_wrap}>
                    <BsSearch />
                    <input
                        onChange={(e) => {
                            setConvSearchValue(e.target.value)
                        }}
                        value={convSearchValue}
                        ref={convSearchInput}
                        placeholder='Tìm kiếm (chưa hoạt động)'
                    />
                    {showClearConvSearch && (
                        <div
                            onClick={() => {
                                setConvSearchValue('')
                            }}
                            className={styles.clearInput}
                        >
                            <IoCloseOutline />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.conversations}>
                {conversations.map((conv, i) => (
                    <div
                        onClick={() => {
                            handleSetCurrentChat(conv)
                        }}
                        className={styles.conversation}
                        key={conv.id}
                    >
                        <div
                            className={styles.conv_avatar}
                            style={{
                                backgroundImage: `url(${
                                    convDetails && convDetails[i]?.avatar_url
                                })`,
                            }}
                        ></div>
                        <div className={styles.conv_info}>
                            <div className={styles.name}>
                                {convDetails && convDetails[i]?.email}
                            </div>
                            <div className={styles.last_mess}>
                                <div className={styles.text}>
                                    <span>
                                        <i></i> Đang hoạt động
                                    </span>
                                </div>
                                <span className={styles.time}>17:05</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatOnline
