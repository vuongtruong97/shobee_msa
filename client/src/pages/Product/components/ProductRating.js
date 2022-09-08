import React, { useEffect, useState } from 'react'
import styles from './ProductRating.module.scss'
import classNames from 'classnames/bind'

import WrapStyle from './WrapStyle'
import Rating from 'common-components/UI/Rating/Rating'
import { AiFillLike } from 'react-icons/ai'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import defautAvatar from 'assets/images/fallback_ava.jpg'
import emptyCart from 'assets/images/empty_cart.png'
import reviewAPI from 'services/review-api/review-api'

const cx = classNames.bind(styles)

function ProductRating({ product }) {
    const [reviews, setReviews] = useState()
    const [pages, setPages] = useState()
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        limit: 6,
    })

    console.log(params)

    useEffect(() => {
        try {
            if (product.id) {
                ;(async () => {
                    const res = await reviewAPI.getReview({
                        ...params,
                        product_id: product.id,
                    })
                    console.log(res)
                    if (res.data.success) {
                        setReviews(res.data.data)
                        setPages(res.data.pages)
                        setTotal(res.data.totals)
                    }
                })()
            }
        } catch (error) {
            console.log(error)
        }
    }, [product, params])

    const handleSetParams = (newParams) => {
        setParams((prev) => {
            return { ...prev, ...newParams }
        })
    }
    return (
        <WrapStyle>
            <div className={styles.reviewWrap}>
                <h4 className={styles.title}>Đánh giá sản phẩm</h4>
                <div className={styles.reviewFilter}>
                    <div className={styles.briefing}>
                        <div className={styles.scoreWrap}>
                            <span className={styles.score}>4.9</span>
                            <span className={styles.maxScore}> trên 5 </span>
                        </div>
                        <Rating style={{ fontSize: '2rem' }} initialRating='5' />
                    </div>
                    <div className={styles.filter}>
                        <div className={cx('filterBtn', { active: true })}>
                            Tất cả ({total})
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ rating: '5' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            5 Sao
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ rating: '4' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            4 Sao
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ rating: '3' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            3 Sao
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ rating: '2' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            2 Sao
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ rating: '1' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            1 Sao
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ filter_type: '0' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            Có Bình Luận
                        </div>
                        <div
                            onClick={() => {
                                handleSetParams({ filter_type: '1' })
                            }}
                            className={cx('filterBtn', { active: false })}
                        >
                            Có Hình Ảnh / Video
                        </div>
                    </div>
                </div>
                <div className={styles.reviewList}>
                    <div className={styles.commentList}>
                        {reviews?.length > 0 &&
                            reviews.map((review) => (
                                <div key={review.id} className={styles.comment}>
                                    <div className={styles.avatar}>
                                        <img src={defautAvatar} />
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.authorName}>Ẩn danh</div>
                                        <div className={styles.ratingStar}>
                                            <Rating
                                                readonly
                                                initialRating={review.rating}
                                            />
                                        </div>
                                        <div className={styles.ratingTime}>
                                            2022-08-12 13:23
                                        </div>
                                        <div className={styles.ratingText}>
                                            {review.comment}
                                        </div>
                                        {review?.image_urls?.length > 0 && (
                                            <div className={styles.ratingImages}>
                                                {review.image_urls.map((img) => (
                                                    <img src={img} />
                                                ))}
                                            </div>
                                        )}
                                        <div className={styles.ratingActions}>
                                            <AiFillLike /> Hữu ích ?
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {reviews?.length === 0 && (
                            <div className={styles.emptyReview}>
                                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/eac95a8ac896158642c2761a9e9cd52e.png' />
                                Chưa có đánh giá
                            </div>
                        )}
                    </div>
                    {pages > 1 && (
                        <div className={styles.pageControl}>
                            <div className={cx('btn')}>
                                <MdKeyboardArrowLeft />
                            </div>
                            <div className={cx(['btn', 'no-outline'], { active: true })}>
                                1
                            </div>
                            {pages > 1 && (
                                <div
                                    onClick={() => {
                                        handleSetParams({ page: '2' })
                                    }}
                                    className={cx(['btn', 'no-outline'])}
                                >
                                    2
                                </div>
                            )}
                            {pages > 2 && (
                                <div
                                    onClick={() => {
                                        handleSetParams({ page: '3' })
                                    }}
                                    className={cx(['btn', 'no-outline'])}
                                >
                                    3
                                </div>
                            )}
                            {pages > 3 && (
                                <div
                                    onClick={() => {
                                        handleSetParams({ page: '4' })
                                    }}
                                    className={cx(['btn', 'no-outline'])}
                                >
                                    4
                                </div>
                            )}

                            <div className={cx('btn')}>
                                <MdKeyboardArrowRight />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </WrapStyle>
    )
}

export default ProductRating
