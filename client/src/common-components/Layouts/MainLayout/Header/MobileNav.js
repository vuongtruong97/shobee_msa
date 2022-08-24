import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaBars, FaTimes } from 'react-icons/fa'
import useOnClickOutSide from 'hooks/useOnClickOutSide'

import styles from './MobileNav.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

function MobileNav() {
    const { pathname } = useLocation()
    const [showNav, setShowNav] = useState(false)
    const navListRef = useRef()
    useOnClickOutSide(navListRef, () => setShowNav(false))

    useEffect(() => {
        setShowNav(false)
    }, [pathname])

    useEffect(() => {
        const hiddenNav = () => {
            setShowNav(false)
        }
        window.addEventListener('resize', hiddenNav)
        return () => {
            window.removeEventListener('resize', hiddenNav)
        }
    }, [])

    const handleShowNav = () => {
        setShowNav(true)
    }
    const handleHideNav = () => {
        setShowNav(true)
    }
    return (
        <>
            {!showNav && (
                <div onClick={handleShowNav} className={cx('mobile-nav-button')}>
                    <FaBars />
                </div>
            )}
            {showNav && (
                <div onClick={handleHideNav} className={cx('mobile-nav-button')}>
                    <FaTimes />
                </div>
            )}

            {showNav && (
                <nav ref={navListRef} className={cx('nav-list')}>
                    <ul>
                        <li>
                            <Link className={cx('nav-item')} to='/auth/register'>
                                Đăng ký
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('nav-item')} to='/auth/login'>
                                Đăng nhập
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('nav-item')} to='/contact'>
                                Liên Hệ
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('nav-item')} to='/carrer'>
                                Tuyển dụng
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default MobileNav
