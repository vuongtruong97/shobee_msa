import axiosClient from '../axiosClient'
import NOTI_API from './api-url'

const notiAPI = {
    getNotifications() {
        const url = NOTI_API.GET_NOTI
        return axiosClient.get(url)
    },
    getCartDetail(params) {
        const url = NOTI_API.GET_CART_DETAIL

        return axiosClient.get(url, { params: params })
    },
    getCartList(params) {
        const url = NOTI_API.GET_CART_LIST

        return axiosClient.get(url, { params: params })
    },
}

export default notiAPI
