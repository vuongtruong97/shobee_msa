import React from 'react'
import styles from './HeaderCart.module.scss'
import { Link } from 'react-router-dom'

import numberWithCommas from 'utils/numberWithCommas'

function HeaderCart({ data }) {
    console.log('re-render')
    return (
        <div className={styles.cart}>
            <div className={styles.cart_title}>Giỏ hàng của bạn</div>
            {data &&
                data.map((prod) => (
                    <Link
                        to={`/product/${prod.product_id._id}`}
                        key={prod.product_id._id}
                        className={styles.product}
                    >
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${
                                    prod.product_id.image_urls &&
                                    prod.product_id.image_urls[0]
                                })`,
                            }}
                        ></div>
                        <div className={styles.name}>{prod.product_id.name}</div>
                        <div className={styles.price}>
                            {numberWithCommas(prod.product_id.price)}&nbsp;<i>₫</i>
                        </div>
                    </Link>
                ))}
            {data.length === 0 && (
                <div
                    className={styles.product}
                    style={{ justifyContent: 'center', fontSize: '1.8rem' }}
                >
                    Chưa có sản phẩm
                </div>
            )}
            <div className={styles.cart_footer}>
                <Link to='/cart'>Xem giỏ hàng</Link>
            </div>
        </div>
    )
}

export default HeaderCart
