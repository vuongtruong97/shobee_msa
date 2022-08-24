import React, { useState, useEffect, useRef } from 'react'
import styles from './ChatOnline.module.scss'

import { BsSearch } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'

function ChatOnline({ conversations, handleSetCurrentChat }) {
    const [convSearchValue, setConvSearchValue] = useState('')
    const [showClearConvSearch, setShowClearConvSearch] = useState(false)

    const convSearchInput = useRef() // pending

    // handle conv search input
    useEffect(() => {
        if (convSearchValue) {
            setShowClearConvSearch(true)
        } else {
            setShowClearConvSearch(false)
        }
    }, [convSearchValue])

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
                {conversations.map((conv) => (
                    <div
                        onClick={() => {
                            handleSetCurrentChat(conv)
                        }}
                        className={styles.conversation}
                        key={conv._id}
                    >
                        <div
                            className={styles.conv_avatar}
                            style={{
                                backgroundImage: `url("https://cf.shopee.vn/file/4b49f33ccd2e90466d88f2a5f2ee83f9_tn")`,
                            }}
                        ></div>
                        <div className={styles.conv_info}>
                            <div className={styles.name}>lanlankid.offical</div>
                            <div className={styles.last_mess}>
                                <div className={styles.text}>
                                    <span>Cậu ơi tớ bảo này địt mẹ cậu nhéasdfsdf</span>
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
