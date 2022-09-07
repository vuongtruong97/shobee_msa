import React from 'react'
import styles from './EmptyOrders.module.scss'
function EmptyOrders() {
    return (
        <div className={styles.wrap}>
            <img
                className={styles.image}
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'
            />
            <p>Chưa có đơn hàng</p>
        </div>
    )
}

export default EmptyOrders
