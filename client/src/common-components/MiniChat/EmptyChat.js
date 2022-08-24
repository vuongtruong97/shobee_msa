import React from 'react'
import styles from './EmptyChat.module.scss'

import chatWellcomeBg from 'assets/images/no_conversation_bg.png'

function EmptyChat() {
    return (
        <div
            className={styles.wellcomeBg}
            style={{
                backgroundImage: `url(${chatWellcomeBg})`,
            }}
        ></div>
    )
}

export default EmptyChat
