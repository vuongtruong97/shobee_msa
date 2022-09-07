import React, { useEffect, useState } from 'react'
import styles from './Orders.module.scss'

import { useSelector } from 'react-redux'
import OrderTable from '../OrderTable/OrderTable'
import ordersAPI from 'services/orders-api/orders-api'

function ShopOrders() {
    const [orders, setOrders] = useState()
    const [params, setParams] = useState({ limit: 5 })

    const user = useSelector((state) => state.user.info)
    console.log(user)
    useEffect(() => {
        ;(async () => {
            const res = await ordersAPI.getShopOrders(user.shop, params)
            if (res.data.success) {
                setOrders(res.data.data)
            }
        })()
    }, [params])
    return (
        <div>
            <OrderTable data={orders} onSetParams={setParams} />
        </div>
    )
}

export default ShopOrders
