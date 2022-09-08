import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './OrderReviewModal.module.scss'
import { FaBitcoin, FaTimes, FaCamera } from 'react-icons/fa'
import Rating from 'common-components/UI/Rating/Rating'
import Button from 'common-components/UI/Button/Button'
import appendFormData from 'utils/appenFormData'
import reviewAPI from 'services/review-api/review-api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import toastPromise from 'utils/toastPromise'

const rootModal = document.getElementById('root-modal')

function OrderReviewModal({ order, onClose, onSuccess }) {
    const [images, setImages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [star, setStar] = useState(5)

    const handleImages = (files) => {
        const listImage = Array.from(files).map((image) => {
            image.url = URL.createObjectURL(image)
            return image
        })
        setImages(listImage)
    }

    const handleAddComment = (cmt) => {
        setInputValue(inputValue.concat(` ${cmt},`))
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        const products_id = order.products.map((prod) => prod.id._id)

        const data = appendFormData({
            products_id: JSON.stringify(products_id),
            order_id: order.id,
            rating: star,
            comment: inputValue,
            images: images,
        })

        try {
            const res = await await toastPromise(
                reviewAPI.createReview(data),
                'Đang tạo đánh giá 🛒🛒🛒'
            )
            if (res.data.success) {
                toast.success(res.data.message)
                onSuccess((prev) => {
                    return { ...prev }
                })
                onClose()
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {ReactDOM.createPortal(
                <div className={styles.review}>
                    <div className={styles.reviewWrap}>
                        <div className={styles.overlay}>
                            <div className={styles.heading}>
                                <h4 className={styles.title}>Đánh giá sản phẩm</h4>
                                <FaTimes onClick={onClose} />
                            </div>
                            <div className={styles.attention}>
                                <FaBitcoin />
                                <p>
                                    Chia sẻ cảm nhận của bạn về tất cả sản phẩm trong cùng
                                    đơn hàng với tối thiểu 50 ký tự cùng ít nhất một hình
                                    ảnh để nhận 100 Shobee Xu. Lưu ý: Nếu đánh giá có nội
                                    dung không phù hợp, Shobee xu có thể bị thu hồi !
                                </p>
                            </div>
                            <div className={styles.products}>
                                {order.products.map((prod) => (
                                    <div key={prod.id._id} className={styles.prod}>
                                        <img
                                            className={styles.prodImg}
                                            src={prod.id.image_url}
                                        />
                                        <p className={styles.prodName}>{prod.id.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.ratingForm}>
                                <div className={styles.rating}>
                                    <Rating
                                        initialRating={star}
                                        onChange={(star) => {
                                            setStar(star)
                                        }}
                                        style={{ fontSize: '4rem' }}
                                    />
                                </div>
                                <div className={styles.suggests}>
                                    <span
                                        onClick={(e) =>
                                            handleAddComment(e.target.innerHTML)
                                        }
                                        className={styles.suggest}
                                    >
                                        Chất lượng sản phẩm tuyệt vời
                                    </span>
                                    <span
                                        className={styles.suggest}
                                        onClick={(e) =>
                                            handleAddComment(e.target.innerHTML)
                                        }
                                    >
                                        Đóng gói sản phẩm rất đẹp và chắc chắn
                                    </span>
                                    <span
                                        className={styles.suggest}
                                        onClick={(e) =>
                                            handleAddComment(e.target.innerHTML)
                                        }
                                    >
                                        Shop phục vụ rất tốt
                                    </span>
                                    <span
                                        className={styles.suggest}
                                        onClick={(e) =>
                                            handleAddComment(e.target.innerHTML)
                                        }
                                    >
                                        Rất đáng tiền
                                    </span>
                                    <span
                                        className={styles.suggest}
                                        onClick={(e) =>
                                            handleAddComment(e.target.innerHTML)
                                        }
                                    >
                                        Thời gian giao hàng rất nhanh
                                    </span>
                                </div>
                                <textarea
                                    value={inputValue}
                                    spellCheck='false'
                                    onChange={(e) => {
                                        setInputValue(e.target.value)
                                    }}
                                    className={styles.comment}
                                    placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này nhé'
                                ></textarea>
                                <div className={styles.images}>
                                    {images.length > 0 &&
                                        images.map((img) => (
                                            <>
                                                <img
                                                    key={img.name}
                                                    src={img.url}
                                                    className={styles.prodImg}
                                                />
                                            </>
                                        ))}
                                    <label
                                        className={styles.imagesLabel}
                                        htmlFor='reviewImg'
                                    >
                                        <FaCamera />
                                        Thêm hình ảnh
                                    </label>
                                    <input
                                        id='reviewImg'
                                        type='file'
                                        accept='image/*'
                                        multiple
                                        hidden
                                        onChange={(e) => {
                                            handleImages(e.target.files)
                                        }}
                                    />
                                </div>
                                <div className={styles.control}>
                                    <Button onClick={onClose} secondary>
                                        Huỷ
                                    </Button>
                                    <Button onClick={handleSubmitReview}>Đánh giá</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                rootModal
            )}
        </>
    )
}

export default OrderReviewModal
