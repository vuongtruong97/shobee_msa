import React from 'react'
import styles from './EmptyCart.module.scss'
import { Link } from 'react-router-dom'
import emptyCartImg from 'assets/images/empty_cart.png'
function EmptyCart() {
    return (
        <div className={styles.empty_cart}>
            <img className={styles.emptyCartImg} src={emptyCartImg} />
            <p>Bạn chưa đăng nhập</p>
            <div className={styles.link_wrap}>
                <Link to={'/auth/login'}>Đăng nhập ngay</Link>
            </div>
        </div>
    )
}

export default EmptyCart
