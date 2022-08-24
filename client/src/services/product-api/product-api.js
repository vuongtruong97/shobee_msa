import axiosClient from 'services/axiosClient'
import PRODUCT_API from './api-url'

const productAPI = {
    createProduct(newProduct) {
        const url = PRODUCT_API.CREATE_PRODUCT
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        }
        return axiosClient.post(url, newProduct, config)
    },
    getProduct(id) {
        const url = PRODUCT_API.GET_PRODUCT.replace(':id', id)
        return axiosClient.get(url)
    },
    updateProduct(id, newData) {
        const url = PRODUCT_API.UPDATE_PRODUCT.replace(':id', id)
        return axiosClient.post(url, newData)
    },
    deleteProduct(id) {
        const url = PRODUCT_API.DELETE_PRODUCT.replace(':id', id)
        return axiosClient.delete(url)
    },
    getListProd(params) {
        const url = PRODUCT_API.GET_LIST
        return axiosClient.get(url, { params: params })
    },
    getListProdOfCategory() {},
}

export default productAPI
