import axiosClient from '../axiosClient'
import REVIEW_URL from './api-url'

const reviewAPI = {
    createReview(data) {
        const url = REVIEW_URL.REVIEW_CREATE
        return axiosClient.post(url, data)
    },
    getReview(params) {
        const url = REVIEW_URL.REVIEW_GET
        return axiosClient.get(url, { params: params })
    },
    getMyShopInfo() {
        return axiosClient({
            url: REVIEW_URL.GET_USER_SHOP,
        })
    },
    getShopProducts(shopId) {
        return axiosClient({
            url: REVIEW_URL.GET_SHOP_PROD.replace(':id', shopId),
        })
    },
    getMyShopProduct() {
        return axiosClient({
            url: REVIEW_URL.MY_SHOP_PROD,
        })
    },
    getShopInfo(id) {
        const url = REVIEW_URL.GET_SHOP_INFO.replace(':id', id)
        return axiosClient.get(url)
    },
}

export default reviewAPI
