import React, { useState, useEffect } from 'react'
import styles from './ProfileSideBar.module.scss'
import { Link, NavLink } from 'react-router-dom'
import { FaUser, FaFileInvoice, FaBell, FaTicketAlt, FaBitcoin } from 'react-icons/fa'
import { FcList, FcSpeaker } from 'react-icons/fc'
import fallBackAvatar from '../../../assets/images/fallback_ava.jpg'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ProfileSideBar() {
    const [showExpand, setShowExpand] = useState(false)
    const handleShowExpand = () => {
        setShowExpand(!showExpand)
    }
    const location = useLocation()
    const userInfo = useSelector((state) => state.user.info)

    console.log(userInfo)

    let avatarUrl

    if (!!userInfo.avatar_url) {
        avatarUrl = userInfo.avatar_url
    } else {
        avatarUrl = fallBackAvatar
    }

    let activeStyle = {
        color: 'var(--primary)',
        fontWeight: '500',
    }

    useEffect(() => {
        if (location.pathname.includes('profile')) {
            setShowExpand(true)
        } else {
            setShowExpand(false)
        }
    }, [location.pathname])

    return (
        <div className={styles.sideBar}>
            <div className={styles.userAvatar}>
                <Link to='#'>
                    <div
                        className={styles.avatar}
                        style={{
                            backgroundImage: `url(${avatarUrl}?${userInfo.imageHash})`,
                        }}
                    ></div>
                </Link>
                <div className={styles.user_name}>
                    <span>Truong Quoc Vuong</span>
                    <Link to='#'>Sửa hồ sơ</Link>
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.profile_info}>
                    <NavLink to='/user/profile'>
                        <div className={styles.option} onClick={handleShowExpand}>
                            <FaUser />
                            <span>Tài khoản của tôi</span>
                        </div>
                    </NavLink>
                    {showExpand && (
                        <div className={styles.info}>
                            <NavLink
                                to='/user/profile'
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <div className={styles.accout_option}>Hồ sơ</div>
                            </NavLink>
                            <NavLink
                                to='/user/payment'
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <div className={styles.accout_option}>Ngân hàng</div>
                            </NavLink>
                            <NavLink
                                to='/user/address'
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <div className={styles.accout_option}>Địa chỉ</div>
                            </NavLink>
                            <NavLink
                                to='/user/password'
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >
                                <div className={styles.accout_option}>Đổ mật khẩu</div>
                            </NavLink>
                        </div>
                    )}
                </div>
                <NavLink
                    to='/user/orders'
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    <div className={styles.option}>
                        <FcList />
                        <span>Đơn mua</span>
                    </div>
                </NavLink>
                <NavLink
                    to='/user/notifications'
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    <div className={styles.option}>
                        <FcSpeaker />
                        <span>Thông báo</span>
                    </div>
                </NavLink>
                <NavLink
                    to='/user/voucher'
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    <div className={styles.option}>
                        <FaTicketAlt fill='var(--secondary-green)' />
                        <span>Kho Voucher</span>
                    </div>
                </NavLink>
                <NavLink
                    to='/user/coin'
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    <div className={styles.option}>
                        <FaBitcoin fill='var(--secondary-yellow)' />
                        <span>Shobee xu</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileSideBar
