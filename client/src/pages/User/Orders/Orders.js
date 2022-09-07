import React, { useEffect, useState } from 'react'
import styles from './Orders.module.scss'

import EmptyOrders from './EmptyOrders'
import OrderReviewModal from './OrderReviewModal'
import { GoSearch } from 'react-icons/go'
import { MdStorefront } from 'react-icons/md'
import { FaShippingFast } from 'react-icons/fa'
import icon from 'assets/images/shobee_icon.svg'
import { Link } from 'react-router-dom'
import numberWithCommas from 'utils/numberWithCommas'
import Button from 'common-components/UI/Button/Button'
import { handleStatus } from 'utils/handleOrderStatus'

import ordersAPI from 'services/orders-api/orders-api'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

function Orders() {
    const [orders, setOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState({})
    const [showReviewModal, setShowReviewModal] = useState()
    const [reviewOrder, setReviewOrder] = useState()
    useEffect(() => {
        ;(async () => {
            const res = await ordersAPI.getCurrentUserOrder(orderStatus)
            console.log(res.data.data)
            if (res.data.success) {
                setOrders(res.data.data)
            }
        })()
    }, [orderStatus])

    const handleSetOrderStatus = (status) => {
        setOrderStatus({ status: status })
    }
    console.log(orders)
    return (
        <div className={styles.orders}>
            <div className={styles.sort}>
                <div
                    onClick={() => {
                        handleSetOrderStatus(null)
                    }}
                    className={cx('sortOption', {
                        active: !orderStatus.status,
                    })}
                >
                    Tất cả
                </div>
                <div
                    onClick={() => {
                        handleSetOrderStatus('PENDING')
                    }}
                    className={cx('sortOption', {
                        active: orderStatus.status === 'PENDING',
                    })}
                >
                    Chờ xác nhận
                </div>
                <div
                    onClick={() => {
                        handleSetOrderStatus('CONFIRM')
                    }}
                    className={cx('sortOption', {
                        active: orderStatus.status === 'CONFIRM',
                    })}
                >
                    Chờ lấy hàng
                </div>
                <div
                    onClick={() => {
                        handleSetOrderStatus('SHIPPING')
                    }}
                    className={cx('sortOption', {
                        active: orderStatus.status === 'SHIPPING',
                    })}
                >
                    Đang giao
                </div>
                <div
                    onClick={() => {
                        handleSetOrderStatus('COMPLETED')
                    }}
                    className={cx('sortOption', {
                        active: orderStatus.status === 'COMPLETED',
                    })}
                >
                    Đã giao
                </div>
                <div
                    onClick={() => {
                        handleSetOrderStatus('CANCELLED')
                    }}
                    className={cx('sortOption', {
                        active: orderStatus.status === 'CANCELLED',
                    })}
                >
                    Đã huỷ
                </div>
            </div>
            <div className={styles.search}>
                <GoSearch />
                <input
                    placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm
'
                />
            </div>
            <div className={styles.list}>
                {orders.length > 0 &&
                    orders
                        .slice(0)
                        .reverse()
                        .map((order) => (
                            <div className={styles.order} key={order.id}>
                                <div className={styles.orderHeading}>
                                    <div className={styles.status}>
                                        <Link to='#'>
                                            <MdStorefront />
                                            Xem shop
                                        </Link>
                                        <div className={styles.statusInfo}>
                                            {order?.status === 'COMPLETED' && (
                                                <span className={styles.shipStatus}>
                                                    <FaShippingFast /> Giao hàng thành
                                                    công
                                                </span>
                                            )}
                                            {order?.status === 'SHIPPING' && (
                                                <span className={styles.shipStatus}>
                                                    <FaShippingFast /> Đơn hàng đang được
                                                    vận chuyển
                                                </span>
                                            )}
                                            <span className={styles.orderStatus}>
                                                {order.isRated
                                                    ? 'ĐÃ ĐÁNH GIÁ'
                                                    : handleStatus(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.orderProducts}>
                                        {order.products.map((prod) => (
                                            <div className={styles.product}>
                                                <img
                                                    className={styles.productImage}
                                                    src={prod.id.image_url}
                                                />
                                                <div className={styles.productDetail}>
                                                    <div className={styles.prodName}>
                                                        {prod.id.name}
                                                    </div>
                                                    <div className={styles.prodQty}>
                                                        x1
                                                    </div>
                                                </div>
                                                <div className={styles.productPrice}>
                                                    ₫{numberWithCommas(prod.id.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.orderTotalPrice}>
                                    <img src={icon} /> Tổng số tiền:
                                    <span className={styles.price}>
                                        ₫
                                        {numberWithCommas(
                                            order.products.reduce((acc, cur) => {
                                                acc += +cur.id.price
                                                return acc
                                            }, 0)
                                        )}
                                    </span>
                                </div>
                                <div className={styles.orderOptions}>
                                    {order?.status === 'COMPLETED' && (
                                        <Button>Mua Lại</Button>
                                    )}
                                    {order?.status === 'PENDING' && (
                                        <Button>Huỷ đơn hàng</Button>
                                    )}
                                    <Button secondary>Liên hệ người bán</Button>
                                    {order.status === 'COMPLETED' && !order?.isRated && (
                                        <Button
                                            onClick={() => {
                                                setReviewOrder(order)
                                                setShowReviewModal(true)
                                            }}
                                        >
                                            Đánh giá ngay
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                {orders.length === 0 && <EmptyOrders />}
            </div>
            {showReviewModal && (
                <OrderReviewModal
                    onClose={() => {
                        setShowReviewModal(false)
                    }}
                    onSuccess={setOrderStatus}
                    order={reviewOrder}
                />
            )}
        </div>
    )
}

export default Orders
