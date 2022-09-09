import React from 'react'
import styles from './NotifiList.module.scss'

function NotifiList({ notifications }) {
    console.log(notifications)
    return (
        <div className={styles.notifi}>
            <div className={styles.heading}>Thông báo mới nhận</div>
            <div className={styles.notiList}>
                {notifications.map((noti) => (
                    <div className={styles.noti}>
                        <img
                            className={styles.notiImg}
                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/6643266a9242f0098d4d4bca31090524.png'
                        />
                        <div>
                            <div className={styles.title}>{noti.title}</div>
                            <div className={styles.content}>{noti.content}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.footer}>Xem tất cả</div>
        </div>
    )
}

export default NotifiList
