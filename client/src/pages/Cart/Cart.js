import React, { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Checkbox from 'common-components/UI/Checkbox/Checkbox'
import { Link } from 'react-router-dom'
import { AiFillWechat, AiFillShop, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import numberWithCommas from 'utils/numberWithCommas'
import cartAPI from 'services/cart-api/cart-api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ordersAPI from 'services/orders-api/orders-api'
import Modal from 'common-components/UI/Modal/Modal'
import NeuButton from 'common-components/UI/Button/NeuButton'

function Cart() {
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [aggregate, setAgregate] = useState({})
    const [listOrder, setListOrder] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [deleteInfo, setDeleteInfo] = useState([])

    const fetchCartData = async () => {
        try {
            const res = await cartAPI.getCartDetail()

            if (res.data.success) {
                let cartGroupByShopId = []
                res.data.data.products.forEach((prod) => {
                    const index = cartGroupByShopId.findIndex(
                        (shop) => shop.shop._id === prod.shop_id._id
                    )
                    if (index !== -1) {
                        cartGroupByShopId[index].products.push(prod)
                    } else {
                        cartGroupByShopId.push({
                            shop: prod.shop_id,
                            products: [prod],
                        })
                    }
                })

                setCart(cartGroupByShopId)
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
    const handleCheckBoxAllShop = (shopId) => {
        const shopInCart = cart.find((shop) => shop.shop._id === shopId)
        const shopOrderIndex = orders.findIndex((shop) => shop.shopId === shopId)

        const listProd = cart
            .find((shop) => shop.shop._id === shopId)
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
                prodId: prod.id._id,
                price: prod.id.price,
                quantity: prod.quantity,
            }
        })
        const shopOrder = {
            shopId,
            orders: listOrdeR,
        }
        // if not exist shop insert new shoporder to orders
        if (shopOrderIndex === -1) {
            orders.push(shopOrder)
            return setOrders([...orders])
        }
        // if exist shop replace with full shop order
        if (shopInCart.products.length > orders[shopOrderIndex].orders.length) {
            orders.splice(shopOrderIndex, 1)
            orders[shopOrderIndex] = shopOrder
            return setOrders([...orders])
        }
        // if full shop order ==> remove out of orders
        if (shopInCart.products.length === orders[shopOrderIndex].orders.length) {
            orders.splice(shopOrderIndex, 1)
            return setOrders([...orders])
        }
    }

    // compute order
    const handleCheckBoxProd = (data) => {
        const prodID = data.prodInfo.prodId

        let newListOrder
        if (!listOrder.includes(prodID)) {
            listOrder.push(prodID)
            newListOrder = [...listOrder]
        } else {
            newListOrder = listOrder.filter((prod) => prod !== prodID)
        }
        setListOrder(newListOrder)
        const shopIndex = orders.findIndex((order) => order.shopId === data.shopId)

        //not exist shop
        if (shopIndex === -1) {
            orders.push({ shopId: data.shopId, orders: [data.prodInfo] })
            return setOrders([...orders])
        }
        // exist shop
        if (shopIndex !== -1) {
            const prodIndex = orders[shopIndex].orders.findIndex(
                (order) => order.prodId === data.prodInfo.prodId
            )
            //net exist prod
            if (prodIndex === -1) {
                orders[shopIndex].orders.push(data.prodInfo)
            }
            //exist prod
            if (prodIndex !== -1) {
                const newOrders = orders[shopIndex].orders.filter(
                    (order) => order.prodId !== data.prodInfo.prodId
                )
                if (newOrders.length === 0) {
                    // clear empty shop
                    orders.splice(shopIndex, 1)
                } else {
                    orders[shopIndex].orders = newOrders
                }
            }
            return setOrders([...orders])
        }
    }

    const handleCheckedCheckBox = (shopId, prodId) => {
        const shop = orders.find((shop) => shop.shopId === shopId)
        if (!shop) return false
        const exist = shop.orders.some((order) => order.prodId === prodId)
        return !!exist
    }

    const handleCheckedCheckAllShop = (shopId) => {
        const shopInCart = cart.find((shop) => shop.shop._id === shopId)

        const shopInOrders = orders.find((shop) => shop.shopId === shopId)

        if (!shopInOrders) return false

        if (shopInCart.products.length === shopInOrders.orders.length) {
            return true
        }
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

        setAgregate(aggregate)
    }, [orders, cart, listOrder])

    const handleCreateOrder = async () => {
        try {
            if (listOrder.length > 0) {
                console.log(orders)
                const result = await ordersAPI.createOrders({ list_order: orders })

                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container' style={{ position: 'relative' }}>
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
                                                        shopId: shop.shop._id,
                                                        prodInfo: {
                                                            prodId: prod.id._id,
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
                    <Checkbox />
                    &nbsp;
                    <span>Chọn tất cả</span>
                </div>
                <div>
                    <b>{aggregate.quantity}</b>&nbsp;sản phẩm
                </div>
                <div>
                    Tổng thanh toán:
                    <b style={{ color: 'var(--primary)' }}>
                        {numberWithCommas(aggregate.total ? aggregate.total : 0)}₫
                    </b>
                </div>
                <button
                    disabled={listOrder.length === 0}
                    onClick={handleCreateOrder}
                    className={styles.checkout_btn}
                >
                    Đặt hàng
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
        </div>
    )
}

export default Cart
