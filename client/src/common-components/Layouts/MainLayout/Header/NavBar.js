import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { IoNotificationsSharp } from 'react-icons/io5'
import { MdSupportAgent } from 'react-icons/md'

import PopOver from 'common-components/UI/PopOver/PopOver'
import fallBackAvatar from 'assets/images/fallback_ava.jpg'

import NotifiList from './NotifiList'
import EmptyNotify from './EmptyNotify'
import PlatformDownload from './PlatformDownload'

import styles from './NavBar.module.scss'
import classNames from 'classnames/bind'
import { userLogout } from 'store/userSlice/userActions'

import socket from 'services/socketIO'
import notiAPI from 'services/notifications-api/noti-api'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cx = classNames.bind(styles)

function NavBar() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const userInfor = useSelector((state) => state.user.info)
    const [notifications, setNotifications] = useState()
    const [showNoti, setShowNoti] = useState(false)
    const [showDownload, setShowDownload] = useState(false)

    let avatarUrl

    if (!!userInfor.avatar_url) {
        avatarUrl = userInfor.avatar_url
    } else {
        avatarUrl = fallBackAvatar
    }

    const [isShowUserActions, setIsShowUserActions] = useState(false)

    const dispatch = useDispatch()

    const handleShowUserActions = () => {
        setIsShowUserActions(!isShowUserActions)
    }
    const handleLogoutUser = () => {
        console.log('dispatch logout action')
        dispatch(userLogout())
    }

    const getNotifications = async () => {
        try {
            const res = await notiAPI.getNotifications()
            if (res.data.success) {
                setNotifications({ data: res.data.data, total: res.data.total })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on('notification', (payload) => {
            getNotifications()
            console.log(payload)
            switch (payload.type) {
                case 'new-message':
                    toast.info(`Bạn có tin nhắn mới !`, { position: 'top-center' })
                    break
                default:
                    toast.info('Bạn có thông báo mới !', { position: 'top-center' })
            }
        })
    }, [])

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <nav className={cx('header-nav')}>
            <ul className={cx('nav-bar')}>
                <li>
                    <Link to='/shop-manage'>Kênh người bán</Link>
                </li>
                <li>
                    <Link to='/shop/register'>Trở thành người bán Shoppe</Link>
                </li>
                <li
                    onMouseOver={() => {
                        setShowDownload(true)
                    }}
                    onMouseLeave={() => {
                        setShowDownload(false)
                    }}
                >
                    Tải ứng dụng
                    <PopOver show={showDownload} right>
                        <PlatformDownload />
                    </PopOver>
                </li>
                <li>
                    <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
                        Kết nối
                        <FaFacebookSquare />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
                        <FaInstagram />
                    </a>
                </li>
            </ul>
            <ul className={cx('nav-bar', 'actions')}>
                <li className={cx('notifi')}>
                    <Link
                        onMouseOver={() => {
                            setShowNoti(true)
                        }}
                        onMouseLeave={() => {
                            setShowNoti(false)
                        }}
                        to='/notification'
                    >
                        <span>
                            <IoNotificationsSharp />
                            {isLoggedIn && notifications?.total > 0 && (
                                <div className={styles.notiPop}>
                                    {notifications?.total}
                                </div>
                            )}
                        </span>
                        Thông báo
                        <PopOver show={showNoti} right>
                            {isLoggedIn && notifications?.data.length > 0 && (
                                <NotifiList notifications={notifications.data} />
                            )}
                            {isLoggedIn && notifications?.data?.length === 0 && (
                                <EmptyNotify />
                            )}
                            {!isLoggedIn && <EmptyNotify notLogin={true} />}
                        </PopOver>
                    </Link>
                </li>
                <li>
                    <Link to='/support'>
                        <MdSupportAgent /> Hỗ trợ
                    </Link>
                </li>
                {!isLoggedIn && (
                    <li>
                        <Link to='auth/register'>Đăng ký</Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <li>
                        <Link to='auth/login'>Đăng nhập</Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li
                        onMouseEnter={handleShowUserActions}
                        onMouseLeave={handleShowUserActions}
                    >
                        <div className={styles['user-avatar']}>
                            <div
                                style={{
                                    backgroundImage: `url(${avatarUrl}?${userInfor.imageHash})`,
                                }}
                                className={styles.userAvatar}
                            ></div>
                        </div>
                        <Link to='user/profile'>{userInfor.email}</Link>
                        {
                            <PopOver show={isShowUserActions}>
                                <Link
                                    className={styles['popover-item']}
                                    to='user/profile'
                                >
                                    Tài Khoản Của Tôi
                                </Link>
                                <Link className={styles['popover-item']} to='user/orders'>
                                    Đơn Mua
                                </Link>
                                <div
                                    onClick={handleLogoutUser}
                                    className={styles['popover-item']}
                                >
                                    Đăng Xuất
                                </div>
                            </PopOver>
                        }
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
