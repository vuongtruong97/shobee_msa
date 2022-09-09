import React from 'react'
import styles from './EmptyNotify.module.scss'
import emptyCartImg from 'assets/images/empty_cart.png'
import { Link } from 'react-router-dom'
function EmptyNotify({ notLogin }) {
    return (
        <div className={styles.empty_cart}>
            <img
                className={styles.emptyCartImg}
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/6643266a9242f0098d4d4bca31090524.png'
            />
            {notLogin ? (
                <p>Đăng nhập để xem thông báo</p>
            ) : (
                <p>Bạn không có thông báo mới nào </p>
            )}
            {notLogin && (
                <div className={styles.link_wrap}>
                    <Link to={'/auth/login'}>Đăng nhập ngay</Link>
                </div>
            )}
        </div>
    )
}

export default EmptyNotify
