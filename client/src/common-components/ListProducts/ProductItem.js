import React, { useRef } from 'react'
import styles from './ProductItem.module.scss'
import numberWithCommas from 'utils/numberWithCommas'

import Rating from 'common-components/UI/Rating/Rating'
import { Link } from 'react-router-dom'

import useOnScreen from 'hooks/useOnScreen'

function ProductItem({ data }) {
    const bgcImage = useRef()

    // lazy load background image
    const isOnScreen = useOnScreen(bgcImage)

    return (
        <Link to={`/product/${data._id}`} className='col col-6 sm-4 md-4 lg-3 xl-2'>
            <div className={styles.productItem}>
                <div className={styles.discount}>
                    <div className={styles.discountPer}>20%</div>
                    <div className={styles.discountText}>GIẢM</div>
                </div>
                <div
                    ref={bgcImage}
                    style={{
                        backgroundImage: isOnScreen ? `url(${data.image_urls[0]})` : null,
                    }}
                    className={styles.image}
                ></div>
                <div className={styles.info}>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.tag}>#Tagname</div>
                    <div className={styles.price}>₫{numberWithCommas(data.price)}</div>
                    <div className={styles.rating}>
                        <Rating
                            fractions={2}
                            readonly
                            initialRating={Math.floor(Math.random() * 5)}
                        />
                        &nbsp; Đã bán: {data.sold}
                    </div>
                    <div className={styles.location}>Hà Nội</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem
