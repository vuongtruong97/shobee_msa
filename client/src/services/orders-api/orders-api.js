import axiosClient from 'services/axiosClient'
import ORDERS_API from './api-url'

const ordersAPI = {
    createOrders(litsOrder) {
        const url = ORDERS_API.CREATE_ORDERS
        return axiosClient.post(url, litsOrder)
    },
    getORDERS(id) {
        const url = ORDERS_API.GET_ORDERS.replace(':id', id)
        return axiosClient.get(url)
    },
    updateORDERS(id, newData) {
        const url = ORDERS_API.UPDATE_ORDERS.replace(':id', id)
        return axiosClient.post(url, newData)
    },
    deleteORDERS(id) {
        const url = ORDERS_API.DELETE_ORDERS.replace(':id', id)
        return axiosClient.delete(url)
    },
    getListProd(params) {
        const url = ORDERS_API.GET_LIST
        return axiosClient.get(url, { params: params })
    },
    getListProdOfCategory() {},
}

export default ordersAPI
