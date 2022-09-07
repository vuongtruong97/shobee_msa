import React from 'react'
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

function ProductRating() {
    const getReview = () => {
        try {
            ;(async () => {
                const res = await reviewAPI.getReview({})
                console.log(res)
            })()
        } catch (error) {}
    }
    getReview()
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
                            Tất cả (100)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            5 Sao (90)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            4 Sao (5)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            3 Sao (2)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            2 Sao (2)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            1 Sao (1)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            Có Bình Luận (50)
                        </div>
                        <div className={cx('filterBtn', { active: false })}>
                            Có Hình Ảnh / Video (30)
                        </div>
                    </div>
                </div>
                <div className={styles.reviewList}>
                    <div className={styles.commentList}>
                        <div className={styles.comment}>
                            <div className={styles.avatar}>
                                <img src={defautAvatar} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.authorName}>vuong truong</div>
                                <div className={styles.ratingStar}>
                                    <Rating initialRating='5' />
                                </div>
                                <div className={styles.ratingTime}>2022-08-12 13:23</div>
                                <div className={styles.ratingText}>
                                    Đã nhận đc hàng. Đủ số lượng như đã đặt. sẽ ủng hộ
                                    thêm lần sau nhé
                                </div>
                                <div className={styles.ratingImages}>
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                </div>
                                <div className={styles.ratingActions}>
                                    <AiFillLike /> Hữu ích ?
                                </div>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.avatar}>
                                <img src={defautAvatar} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.authorName}>vuong truong</div>
                                <div className={styles.ratingStar}>
                                    <Rating initialRating='5' />
                                </div>
                                <div className={styles.ratingTime}>2022-08-12 13:23</div>
                                <div className={styles.ratingText}>
                                    Giao đủ….cũng k nhanh lắm.đóng gói ok.sp nhìn chắc
                                    chắn.sd qua mới biết
                                </div>
                                <div className={styles.ratingImages}>
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                </div>
                                <div className={styles.ratingActions}>
                                    <AiFillLike /> Hữu ích ?
                                </div>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.avatar}>
                                <img src={defautAvatar} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.authorName}>vuong truong</div>
                                <div className={styles.ratingStar}>
                                    <Rating initialRating='5' />
                                </div>
                                <div className={styles.ratingTime}>2022-08-12 13:23</div>
                                <div className={styles.ratingText}>
                                    Sản phẩm đúng như shop đăng bán . Phích chờ liền dây
                                    đúc . Sản phẩm thô không bóng bẩy nhưng sử dụng tốt .
                                    Đóng gói chắc chắn . Đáng tiền
                                </div>
                                <div className={styles.ratingImages}>
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                    <img src={emptyCart} />
                                </div>
                                <div className={styles.ratingActions}>
                                    <AiFillLike /> Hữu ích ?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pageControl}>
                        <div className={cx('btn')}>
                            <MdKeyboardArrowLeft />
                        </div>
                        <div className={cx(['btn', 'no-outline'], { active: true })}>
                            1
                        </div>
                        <div className={cx(['btn', 'no-outline'])}>2</div>
                        <div className={cx(['btn', 'no-outline'])}>3</div>
                        <div className={cx(['btn', 'no-outline'])}>4</div>
                        <div className={cx('btn')}>
                            <MdKeyboardArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </WrapStyle>
    )
}

export default ProductRating
