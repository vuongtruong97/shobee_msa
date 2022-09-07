import axiosClient from 'services/axiosClient'
import ORDERS_API from './api-url'

const ordersAPI = {
    createOrders(litsOrder) {
        const url = ORDERS_API.CREATE_ORDERS
        return axiosClient.post(url, litsOrder)
    },
    getCurrentUserOrder(params) {
        console.log(params)
        const url = ORDERS_API.USER_ORDERS
        return axiosClient.get(url, { params: params })
    },
    getShopOrders(id, params) {
        const url = ORDERS_API.SHOP_ORDERS.replace(':id', id)
        return axiosClient.get(url, { params: params })
    },
    updateOrderStatus(id, body) {
        const url = ORDERS_API.ORDER_UPDATE.replace(':id', id)
        return axiosClient.patch(url, body)
    },
    //////////
    deleteORDERS(id) {
        const url = ORDERS_API.DELETE_ORDERS.replace(':id', id)
        return axiosClient.delete(url)
    },
}

export default ordersAPI
