import axiosClient from '../axiosClient'
import CATE_API from './api-url'

const categoryApi = {
    getCategories(params) {
        const url = CATE_API.GET_LIST
        return axiosClient.get(url, { params: params })
    },
    getProdOfCate(slug, params) {
        const url = CATE_API.GET_PROD_OF_CATE.replace(':slug', slug)
        return axiosClient.get(url, { params: params })
    },
}

export default categoryApi
