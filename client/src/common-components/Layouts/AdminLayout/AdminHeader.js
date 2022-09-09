import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminHeader.module.scss'
import { BsGrid3X3Gap, BsBell } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import fallBackAvatar from 'assets/images/fallback_ava.jpg'
import NeuButton from 'common-components/UI/Button/NeuButton'

function AdminHeader() {
    const userInfo = useSelector((state) => state.user.info)

    let avatarUrl

    if (!!userInfo.avatar_url) {
        avatarUrl = userInfo.avatar_url
    } else {
        avatarUrl = fallBackAvatar
    }

    return (
        <div className={styles.header}>
            <Link className={styles.logo} to='/'>
                <NeuButton primary>Home</NeuButton>
            </Link>
            <div className={styles.actions}>
                <div className={styles.user}>
                    <div
                        className={styles.userAvatar}
                        style={{
                            backgroundImage: `url("${avatarUrl}")`,
                        }}
                    ></div>
                    <span className={styles.userName}>{userInfo.email}</span>
                </div>
                <div className={styles.control}>
                    <BsGrid3X3Gap />
                </div>
                <div className={styles.notification}>
                    <BsBell />
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
