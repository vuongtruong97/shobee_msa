import axiosClient from '../axiosClient'
import BANNER_API from './api-url'

const bannerAPI = {
    getBanners() {
        const url = BANNER_API.GET_BANNER

        return axiosClient.get(url)
    },
}

export default bannerAPI
