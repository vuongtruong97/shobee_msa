import axiosClient from 'services/axiosClient'
import axios from 'axios'
import GHN_API from './api-url'

const config = {
    headers: {
        'Content-Type': 'application/json',
        Token: process.env.REACT_APP_GHN_TOKEN,
    },
}

const giaoHangNhanhAPI = {
    getProvince() {
        const url = GHN_API.GET_PROVINCE
        return axios.get(url, config)
    },
    getDistrict(id) {
        console.log(id)
        const url = `${GHN_API.GET_DISTRICT}?province_id=${id}`
        console.log(url)
        return axios.get(url, config)
    },
    getWard(id) {
        const url = `${GHN_API.GET_WARD}?district_id=${id}`
        return axios.get(url, config)
    },
}

export default giaoHangNhanhAPI
