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
import { FaRegHeart } from 'react-icons/fa'
import { AiOutlineFileProtect, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

function ProductInfo({ product }) {
    let [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const handleIncrQuantity = () => {
        if (quantity >= product.quantity) {
            return
        }
        setQuantity((prev) => +prev + 1)
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
                    product_id: product.id,
                    shop_id: product.shop._id,
                    quantity: quantity,
                })
                console.log(res)
                if (res.data.success) {
                    toast.success(res.data.message)
                    const newCart = await cartAPI.getCartList()
                    console.log(newCart)
                    dispatch(userActions.setCartInfo(newCart.data.data))
                }
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
                    <div className={styles.subShow}>
                        <div className={styles.share}>
                            <span>Chia s???:</span>
                            <FacebookShareButton
                                url={window.location.href}
                                quote='vuong dep trai'
                                hashtag='shobee'
                            >
                                <FacebookIcon size={28} round={true} />
                            </FacebookShareButton>
                            <PinterestShareButton
                                url={window.location.href}
                                media={product.image_urls && product.image_urls[0]}
                            >
                                <PinterestIcon size={28} round={true} />
                            </PinterestShareButton>
                            <FacebookMessengerShareButton
                                appId='310952877774062'
                                url={window.location.href}
                            >
                                <FacebookMessengerIcon size={28} round={true} />
                            </FacebookMessengerShareButton>
                            <TwitterShareButton url={window.location.href}>
                                <TwitterIcon size={28} round={true} />
                            </TwitterShareButton>
                        </div>
                        <div className={styles.wishList}>
                            <FaRegHeart />
                            ???? th??ch (26)
                        </div>
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
                            <b>{product?.rate ? product.rate : 0}</b> ????nh gi??
                        </div>
                        <div>
                            <b>{product.sold}</b> ???? b??n
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
                                ???
                                {numberWithCommas(
                                    (product.price / 100) * (100 - ~product.discount)
                                )}
                            </span>
                        )}
                        {!product?.discount && (
                            <span style={{ color: 'var(--primary)' }}>
                                {numberWithCommas(+product.price)}&nbsp;???
                            </span>
                        )}
                        {product?.discount && <Tag>{product.discount}% Gi???m</Tag>}
                    </div>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}>M?? gi???m gi??</span>
                                <span className={styles.title_detail}>
                                    <div className={styles.discountTicket}>5% Gi???m</div>
                                    <div className={styles.discountTicket}>10% Gi???m</div>
                                    <div className={styles.discountTicket}>15% Gi???m</div>
                                </span>
                            </span>
                        </div>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}> S??? l?????ng</span>
                                <span className={styles.title_detail}>
                                    <div className={styles.quantityCrtl}>
                                        <div
                                            className={styles.quantityCtrlBtn}
                                            onClick={handleDcrQuantity}
                                        >
                                            <AiOutlineMinus />
                                        </div>
                                        <input
                                            className={styles.quantityInput}
                                            value={quantity}
                                            type='number'
                                            max={product.quantity}
                                            onChange={handleSetQuantity}
                                        />
                                        <div
                                            className={styles.quantityCtrlBtn}
                                            onClick={handleIncrQuantity}
                                        >
                                            <AiOutlinePlus />
                                        </div>
                                    </div>
                                </span>
                            </span>
                        </div>
                        <div className={styles.option}>
                            <span className={styles.optionTitle}>
                                <span className={styles.title_name}>Kho h??ng</span>
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
                            Th??m v??o gi??? h??ng
                        </Button>
                    </div>
                    <div className={styles.policy}>
                        <span>
                            <AiOutlineFileProtect />
                            Shobee ?????m B???o
                        </span>
                        <span>3 ng??y Tr??? H??ng/Ho??n Ti???n</span>
                    </div>
                </div>
            </div>
        </WrapStyle>
    )
}

export default ProductInfo
