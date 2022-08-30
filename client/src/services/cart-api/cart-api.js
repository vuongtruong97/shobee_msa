import axiosClient from '../axiosClient'
import CART_API from './api-url'

const cartAPI = {
    modified(data) {
        const url = CART_API.MODIFIED_CART
        return axiosClient.post(url, data)
    },
    getCartDetail(params) {
        const url = CART_API.GET_CART_DETAIL

        return axiosClient.get(url, { params: params })
    },
    getCartList(params) {
        const url = CART_API.GET_CART_LIST

        return axiosClient.get(url, { params: params })
    },
}

export default cartAPI
