import axiosClient from '../axiosClient'
import USER_API from './api-url'

const userAPI = {
    register(data) {
        return axiosClient({
            url: USER_API.USER_REGISTER_URL,
            method: 'post',
            data: data,
        })
    },
    login(data) {
        return axiosClient({
            url: USER_API.USER_LOGIN_URL,
            method: 'post',
            data: data,
        })
    },
    logout() {
        return axiosClient({
            method: 'post',
            url: USER_API.USER_LOGOUT,
        })
    },
    getUserInfo() {
        return axiosClient({
            url: USER_API.USER_PROFILE,
        })
    },
    updateUserInfo(info) {
        const url = USER_API.USER_UPDATE
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        }
        return axiosClient.patch(url, info, config)
    },
}

export default userAPI
