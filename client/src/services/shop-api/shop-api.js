import axiosClient from '../axiosClient'
import SHOP_API from './api-url'

const shopAPI = {
    registerShop(data) {
        return axiosClient({
            url: SHOP_API.SHOP_REGISTER,
            method: 'post',
            data: data,
        })
    },
    getMyShopInfo() {
        return axiosClient({
            url: SHOP_API.GET_USER_SHOP,
        })
    },
    getShopProducts(shopId) {
        return axiosClient({
            url: SHOP_API.GET_SHOP_PROD.replace(':id', shopId),
        })
    },
    getMyShopProduct() {
        return axiosClient({
            url: SHOP_API.MY_SHOP_PROD,
        })
    },
    getShopInfo(id) {
        const url = SHOP_API.GET_SHOP_INFO.replace(':id', id)
        return axiosClient.get(url)
    },
}

export default shopAPI
