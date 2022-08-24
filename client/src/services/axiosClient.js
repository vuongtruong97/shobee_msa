import axios from 'axios'
import { userActions } from 'store/userSlice/userSlice'
import store from 'store/index'
import queryString from 'query-string'
import { TOKEN } from 'constants/browserStorage-constants'

const axiosClient = axios.create({
    // baseURL: 'https://api.snobdev.online/',
    baseURL: process.env.REACT_APP_BASE_URL,
    //baseURL: 'http://shobee.ddns.net:1998',
    //baseURL: 'https://shopeebe.herokuapp.com',
    withCredentials: false,
    headers: {
        // 'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})

// handle response and request here
axiosClient.interceptors.request.use(
    async (prevConfig) => {
        const newConfig = { ...prevConfig }
        const token = localStorage.getItem(TOKEN) ?? ''
        if (token) {
            newConfig.headers.Authorization = `Bearer ${token}`
        }

        return newConfig
    },
    (error) => {
        console.log(error)
        return error
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        console.log('response in axios interceptors')
        return response
    },
    (error) => {
        console.log(error)
        if (error.response.status === 401) {
            console.log('fail 401 loging out...')

            store.dispatch(userActions.logout())
            localStorage.removeItem(TOKEN)
        }

        if (error.response.status === 403) {
            console.log('fail 403 navigate back...')

            // store.dispatch(userActions.logout())
        }
        throw new Error(error.response.data.message)
    }
)

export default axiosClient
