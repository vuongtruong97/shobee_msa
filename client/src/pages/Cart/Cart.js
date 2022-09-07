import React, { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Checkbox from 'common-components/UI/Checkbox/Checkbox'
import NeuButton from 'common-components/UI/Button/NeuButton'
import Modal from 'common-components/UI/Modal/Modal'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    AiFillWechat,
    AiFillShop,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineShoppingCart,
} from 'react-icons/ai'

import numberWithCommas from 'utils/numberWithCommas'
import ordersAPI from 'services/orders-api/orders-api'
import cartAPI from 'services/cart-api/cart-api'

function Cart() {
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [aggregate, setAgregate] = useState({})
    const [listOrder, setListOrder] = useState([])
    const [deleteInfo, setDeleteInfo] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const userInfo = useSelector((state) => state.user.info)

    const fetchCartData = async () => {
        try {
            const res = await cartAPI.getCartDetail()

            if (res.data.success) {
                let cartGroupByShop_id = []
                res.data.data.products.forEach((prod) => {
                    const index = cartGroupByShop_id.findIndex(
                        (shop) => shop.shop._id === prod.shop_id._id
                    )
                    if (index !== -1) {
                        cartGroupByShop_id[index].products.push(prod)
                    } else {
                        cartGroupByShop_id.push({
                            shop: prod.shop_id,
                            products: [prod],
                        })
                    }
                })

                setCart(cartGroupByShop_id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // init cart data
    useEffect(() => {
        try {
            fetchCartData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    // modified cart and re-fetch cart data
    const modifiedQuantity = async (modified, prevQuantity, e) => {
        if (modified.quantity === 0) {
            return
        }
        if (modified.quantity + prevQuantity === 0) {
            setDeleteInfo([modified, prevQuantity, e])
            return setShowModal(true)
        }
        try {
            const res = await cartAPI.modified(modified)
            console.log(res)
            if (res.data.success) {
                fetchCartData()
            }
        } catch (error) {
            if (e) {
                e.target.value = prevQuantity
            }
            toast.error(error.message)
        }
    }

    const confirmDelete = async (modified, prevQuantity, e) => {
        try {
            const res = await cartAPI.modified(modified)
            console.log(res)
            if (res.data.success) {
                fetchCartData()
                setShowModal(false)
                setDeleteInfo([])
            }
        } catch (error) {
            if (e) {
                e.target.value = prevQuantity
            }
            toast.error(error.message)
        }
    }

    // check shop select all
    const handleCheckBoxAllShop = (shop_id) => {
        const shopInCart = cart.find((shop) => shop.shop._id === shop_id)
        const shopOrderIndex = orders.findIndex((shop) => shop.shop_id === shop_id)

        const listProd = cart
            .find((shop) => shop.shop._id === shop_id)
            .products.map((prod) => prod.id._id)

        const every = listProd.every((prod) => listOrder.includes(prod))

        if (every) {
            const newListOrder = listOrder.filter((prod) => !listProd.includes(prod))

            setListOrder(newListOrder)
        } else {
            const newListOrder = new Set(listOrder.concat(listProd))

            setListOrder(Array.from(newListOrder))
        }

        // create list order from cart
        const listOrdeR = shopInCart.products.map((prod) => {
            return {
                id: prod.id._id,
                price: prod.id.price,
                quantity: prod.quantity,
            }
        })
        const shopOrder = {
            shop_id,
            products: listOrdeR,
        }
        // if not exist shop insert new shoporder to orders
        if (shopOrderIndex === -1) {
            orders.push(shopOrder)
            return setOrders([...orders])
        }
        // if exist shop replace with full shop order
        if (shopInCart.products.length > orders[shopOrderIndex].products.length) {
            orders.splice(shopOrderIndex, 1)
            orders[shopOrderIndex] = shopOrder
            return setOrders([...orders])
        }
        // if full shop order ==> remove out of orders
        if (shopInCart.products.length === orders[shopOrderIndex].products.length) {
            orders.splice(shopOrderIndex, 1)
            return setOrders([...orders])
        }
    }

    // compute order
    const handleCheckBoxProd = (data) => {
        const id = data.prodInfo.id

        let newListOrder
        if (!listOrder.includes(id)) {
            listOrder.push(id)
            newListOrder = [...listOrder]
        } else {
            newListOrder = listOrder.filter((prod) => prod !== id)
        }
        setListOrder(newListOrder)
        const shopIndex = orders.findIndex((order) => order.shop_id === data.shop_id)

        //not exist shop
        if (shopIndex === -1) {
            orders.push({ shop_id: data.shop_id, products: [data.prodInfo] })
            return setOrders([...orders])
        }
        // exist shop
        if (shopIndex !== -1) {
            const prodIndex = orders[shopIndex].products.findIndex(
                (prod) => prod.id === data.prodInfo.id
            )
            //net exist prod
            if (prodIndex === -1) {
                orders[shopIndex].products.push(data.prodInfo)
            }
            //exist prod
            if (prodIndex !== -1) {
                const newOrders = orders[shopIndex].products.filter(
                    (order) => order.id !== data.prodInfo.id
                )
                if (newOrders.length === 0) {
                    // clear empty shop
                    orders.splice(shopIndex, 1)
                } else {
                    orders[shopIndex].products = newOrders
                }
            }
            return setOrders([...orders])
        }
    }

    const handleCheckedCheckBox = (shop_id, id) => {
        const shop = orders.find((shop) => shop.shop_id === shop_id)
        if (!shop) return false
        const exist = shop.products.some((order) => order.id === id)
        return !!exist
    }

    const handleCheckedCheckAllShop = (shop_id) => {
        const shopInCart = cart.find((shop) => shop.shop._id === shop_id)

        const shopInOrders = orders.find((shop) => shop.shop_id === shop_id)

        if (!shopInOrders) return false

        if (shopInCart.products.length === shopInOrders.products.length) {
            return true
        }
    }

    const handleCheckedCheckAllCart = () => {
        return cart.every((shop) => handleCheckedCheckAllShop(shop.shop._id))
    }

    useEffect(() => {
        const aggregate = cart.reduce(
            (acc, shop) => {
                acc.total += shop.products.reduce((acc2, prod) => {
                    if (listOrder.includes(prod.id._id)) {
                        acc.quantity += 1
                        return (acc2 += prod.id.price * prod.quantity)
                    }
                    return acc2
                }, 0)
                return acc
            },
            { total: 0, quantity: 0 }
        )

        setAgregate({ ...aggregate })
    }, [orders, cart, listOrder])

    const handleCreateOrder = async () => {
        if (!userInfo.address || !userInfo.phone) {
            return toast.info(
                <div>
                    <Link to='/user/profile' state={{ from: location }}>
                        Chưa có địa chỉ, số điện thoại, vui lòng cập nhật thông tin tại
                        đây!
                    </Link>
                </div>,
                { autoClose: 7000 }
            )
        }

        setShowSuccessModal(true)
        setIsLoading(true)

        // navigate('/checkout', { state: { orders: orders } })

        console.log(orders)
        console.log(userInfo)
        try {
            const res = await ordersAPI.createOrders({
                list_order: orders,
                address: userInfo.address,
            })
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const selectAllCart = () => {
        cart.forEach((shop) => handleCheckBoxAllShop(shop.shop._id))
    }

    return (
        <div className='container'>
            <div className={styles.heading}>
                <AiOutlineShoppingCart /> Giỏ Hàng
            </div>
            <div className={styles.cart}>
                <div className={styles.shop_list}>
                    {cart.map((shop) => (
                        <div key={shop.shop._id} className={styles.shop}>
                            <div className={styles.head}>
                                <div className={styles.checkbox}>
                                    <Checkbox
                                        checked={handleCheckedCheckAllShop(shop.shop._id)}
                                        onChange={() => {
                                            handleCheckBoxAllShop(shop.shop._id)
                                        }}
                                    />
                                </div>
                                <div className={styles.shop_name}>
                                    <AiFillShop /> &nbsp;
                                    <Link to='#'>{shop.shop.shop_name}</Link>
                                </div>
                                <button className={styles.chat_btn}>
                                    <AiFillWechat />
                                </button>
                            </div>
                            <div className={styles.list_prod}>
                                {shop.products.map((prod) => (
                                    <div key={prod.id._id} className={styles.prod}>
                                        <div className={styles.checkbox}>
                                            <Checkbox
                                                checked={handleCheckedCheckBox(
                                                    shop.shop._id,
                                                    prod.id._id
                                                )}
                                                id={prod.id._id}
                                                onChange={() => {
                                                    handleCheckBoxProd({
                                                        shop_id: shop.shop._id,
                                                        prodInfo: {
                                                            id: prod.id._id,
                                                            quantity: prod.quantity,
                                                            price: prod.id.price,
                                                        },
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className={styles.prod_info}>
                                            <Link to='#'>
                                                <div
                                                    className={styles.prod_img}
                                                    style={{
                                                        backgroundImage: `url(${
                                                            prod.id.image_urls &&
                                                            prod.id.image_urls[0]
                                                        })`,
                                                    }}
                                                ></div>
                                            </Link>
                                            <div className={styles.prod_name}>
                                                <Link to='#'>{prod.id.name}</Link>
                                            </div>
                                        </div>
                                        <div className={styles.price}>
                                            {numberWithCommas(prod.id.price)}
                                            &nbsp;₫
                                        </div>
                                        <div className={styles.quantity}>
                                            <div className={styles.input_quantity}>
                                                <button
                                                    onClick={() => {
                                                        modifiedQuantity(
                                                            {
                                                                shop_id: shop.shop._id,
                                                                product_id: prod.id._id,
                                                                quantity: -1,
                                                            },
                                                            prod.quantity
                                                        )
                                                    }}
                                                    className={styles.quantity_btn}
                                                >
                                                    <AiOutlineMinus />
                                                </button>
                                                <input
                                                    className={styles.quantity_input}
                                                    defaultValue={prod.quantity}
                                                    key={prod.quantity}
                                                    min='1'
                                                    onChange={() => {}}
                                                    onBlur={(e) => {
                                                        modifiedQuantity(
                                                            {
                                                                shop_id: shop.shop._id,
                                                                product_id: prod.id._id,
                                                                quantity:
                                                                    e.target.value -
                                                                    prod.quantity,
                                                            },
                                                            prod.quantity,
                                                            e
                                                        )
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        modifiedQuantity(
                                                            {
                                                                shop_id: shop.shop._id,
                                                                product_id: prod.id._id,
                                                                quantity: 1,
                                                            },
                                                            prod.quantity
                                                        )
                                                    }}
                                                    className={styles.quantity_btn}
                                                >
                                                    <AiOutlinePlus />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.total_price}>
                                            <b>
                                                {numberWithCommas(
                                                    prod.id.price * prod.quantity
                                                )}
                                                &nbsp;₫
                                            </b>
                                        </div>
                                        <div
                                            onClick={() => {
                                                modifiedQuantity(
                                                    {
                                                        shop_id: shop.shop._id,
                                                        product_id: prod.id._id,
                                                        quantity: -prod.quantity,
                                                    },
                                                    prod.quantity
                                                )
                                            }}
                                            className={styles.delete}
                                        >
                                            Xoá
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.checkout}>
                <div className={styles.checkbox}>
                    <Checkbox
                        checked={handleCheckedCheckAllCart()}
                        // onChange={selectAllCart}
                    />
                    &nbsp;
                    <span>Chọn tất cả</span>
                </div>
                <div>
                    <b>{aggregate.quantity}</b>&nbsp;sản phẩm
                </div>
                <div>
                    Tổng thanh toán:
                    <b className={styles.totalCartPrice}>
                        {numberWithCommas(aggregate.total ? aggregate.total : 0)}₫
                    </b>
                </div>
                <button
                    disabled={listOrder.length === 0}
                    onClick={handleCreateOrder}
                    className={styles.checkout_btn}
                >
                    Mua Hàng
                </button>
            </div>

            {showModal && (
                <Modal
                    onClose={() => {
                        setShowModal(false)
                    }}
                    title={'Xoá sản phẩm khỏi giỏ hàng'}
                >
                    <div className={styles.confirmBtnModal}>
                        <NeuButton
                            onClick={() => {
                                confirmDelete(...deleteInfo)
                            }}
                            rounded
                            primary
                        >
                            Xác nhận
                        </NeuButton>
                        <NeuButton
                            primary
                            rounded
                            onClick={() => {
                                setShowModal(false)
                            }}
                        >
                            Huỷ Bỏ
                        </NeuButton>
                    </div>
                </Modal>
            )}

            {showSuccessModal && (
                <Modal
                    onClose={() => {
                        setShowSuccessModal(false)
                    }}
                    title={
                        isLoading
                            ? 'Đang tạo đơn hàng ...'
                            : 'Đơn hàng đã được tạo thành công'
                    }
                >
                    {isLoading && <span>LOADING...</span>}
                    {!isLoading && (
                        <div className={styles.confirmBtnModal}>
                            <Link to='/'>
                                <NeuButton rounded primary>
                                    Tiếp tục mua sắm
                                </NeuButton>
                            </Link>
                            <Link to='/user/orders'>
                                <NeuButton primary rounded>
                                    Xem đơn hàng
                                </NeuButton>
                            </Link>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}

export default Cart
