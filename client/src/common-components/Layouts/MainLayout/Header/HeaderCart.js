import React from 'react'
import styles from './HeaderCart.module.scss'
import { Link } from 'react-router-dom'

import numberWithCommas from 'utils/numberWithCommas'

function HeaderCart({ data, total }) {
    return (
        <div className={styles.cart}>
            <div className={styles.cart_title}>Sản phẩm mới thêm</div>
            {data &&
                data
                    .slice(0)
                    .reverse()
                    .map((prod) => (
                        <Link
                            to={`/product/${prod.id._id}`}
                            key={prod.id._id}
                            className={styles.product}
                        >
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${
                                        prod.id.image_urls && prod.id.image_urls[0]
                                    })`,
                                }}
                            ></div>
                            <div className={styles.name}>{prod.id.name}</div>
                            <div className={styles.price}>
                                {numberWithCommas(prod.id.price)}&nbsp;<i>₫</i>
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
                <span>
                    Tất cả: <b>{total}</b> sản phẩm
                </span>
            </div>
        </div>
    )
}

export default HeaderCart
