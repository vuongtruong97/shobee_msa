import Rating from 'common-components/UI/Rating/Rating'
import React, { useState } from 'react'
import styles from './ProductInfo.module.scss'
import Button from 'common-components/UI/Button/Button'
import Tag from 'common-components/UI/Tag/Tag'
import WrapStyle from './WrapStyle'
import cartAPI from 'services/cart-api/cart-api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch } from 'react-redux'

import numberWithCommas from 'utils/numberWithCommas'
import { userActions } from 'store/userSlice/userSlice'
import ProductSlider from './ProductSlider'
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
} from 'react-share'

function ProductInfo({ product }) {
    let [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const handleIncrQuantity = () => {
        if (quantity >= product.quantity) {
            return
        }
        setQuantity((prev) => prev + 1)
    }
    const handleDcrQuantity = () => {
        if (quantity <= 0) {
            return
        }
        setQuantity((prev) => prev - 1)
    }
    const handleSetQuantity = (e) => {
        if (e.target.value > product.quantity) return
        setQuantity(e.target.value)
    }
    const addItemToCart = async () => {
        try {
            if (quantity > 0) {
                const res = await cartAPI.modified({
                    product_id: product._id,
                    shop_id: product.shop._id,
                    quantity: quantity,
                })
                console.log(res)
                toast.success(res.data.message)
                const newCart = await cartAPI.getCartList()
                dispatch(userActions.setCartInfo(newCart.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <WrapStyle>
            <div className='col col-12 sm-6 md-5 lg-4 xl-4'>
                <div className={styles.show}>
                    <ProductSlider image_urls={product.image_urls} />
                    <div className={styles.share}>
                        <FacebookShareButton
                            url={window.location.href}
                            quote='vuong dep trai'
                            hashtag='shobee'
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <PinterestShareButton
                            url={window.location.href}
                            media={product.image_urls && product.image_urls[0]}
                        >
                            <PinterestIcon size={32} round={true} />
                        </PinterestShareButton>
                        <FacebookMessengerShareButton
                            appId='310952877774062'
                            url={window.location.href}
                        >
                            <FacebookMessengerIcon size={32} round={true} />
                        </FacebookMessengerShareButton>
                        <TwitterShareButton url={window.location.href}>
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                    </div>
                </div>
            </div>
            <div className='col col-12 sm-6 md-7 lg-8 xl-8'>
                <div className={styles.prop}>
                    <div className={styles.title}>{product.name}</div>
                    <div className={styles.reputation}>
                        <div>
                            <Rating
                                style={{ fontSize: '1.5rem' }}
                                initialRating={product?.rate}
                                readonly
                            />
                            &nbsp;&nbsp;
                        </div>
                        <div>
                            <b>{product?.rate ? product.rate : 0}</b> Đánh giá
                        </div>
                        <div>
                            <b>{product.sold}</b> Đã bán
                        </div>
                    </div>
                    <div className={styles.price}>
                        {product?.discount && (
                            <span
                                style={{
                                    textDecoration: 'line-through',
                                    color: '#ccc',
                                    fontSize: '1.5rem',
                                }}
                            >
                                {product.price}
                            </span>
                        )}
                        {product?.discount && (
                            <span style={{ color: 'var(--primary)' }}>
                                ₫
                                {numberWithCommas(
                                    (product.price / 100) *
                                        Math.floor(Math.random() * 100)
                                )}
                            </span>
                        )}
                        {!product?.discount && (
                            <span style={{ color: 'var(--primary)' }}>
                                {numberWithCommas(+product.price)}&nbsp;₫
                            </span>
                        )}
                        {product?.discount && <Tag>{product.discount}% Giảm</Tag>}
                    </div>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}>Mã giảm giá</span>
                                <span className={styles.title_detail}> Không có</span>
                            </span>
                        </div>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}> Số lượng</span>
                                <span className={styles.title_detail}>
                                    <div className={styles.quantityCrtl}>
                                        <button
                                            className={styles.quantityCtrlBtn}
                                            onClick={handleDcrQuantity}
                                        >
                                            -
                                        </button>
                                        <input
                                            className={styles.quantityInput}
                                            value={quantity}
                                            type='number'
                                            max={product.quantity}
                                            onChange={handleSetQuantity}
                                        />
                                        <button
                                            className={styles.quantityCtrlBtn}
                                            onClick={handleIncrQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </span>
                            </span>
                        </div>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}>Kho hàng</span>
                                <span className={styles.title_detail}>
                                    <b> &nbsp;{product.quantity}</b>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Button
                            disabled={quantity <= 0}
                            social
                            style={{ marginRight: '1rem' }}
                        >
                            Mua ngay
                        </Button>
                        <Button disabled={quantity <= 0} onClick={addItemToCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                    <div className={styles.policy}></div>
                </div>
            </div>
        </WrapStyle>
    )
}

export default ProductInfo
