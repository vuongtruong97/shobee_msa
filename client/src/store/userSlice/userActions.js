import { userActions } from './userSlice'
import { toast } from 'react-toastify'
import { TOKEN } from 'constants/browserStorage-constants'

import userAPI from 'services/user-api/user-api'

const userRegister = (data) => {
    return async (dispatch) => {
        try {
            dispatch(userActions.setNotification({ status: 'loading' }))
            const { data: result } = await userAPI.register(data)

            if (result.success) {
                dispatch(userActions.login(result.token))
                dispatch(userActions.setNotification({ status: 'success' }))
                localStorage.setItem(TOKEN, result.token)
                toast.success(result.message)
            }
        } catch (error) {
            dispatch(
                userActions.setNotification({ status: 'error', message: error.message })
            )
            toast.error(error.message)
        }
        dispatch(userActions.setIsLoading(false))
        dispatch(userActions.setNotification({}))
    }
}

const userLogout = () => {
    console.log('logingout...')
    return async (dispatch) => {
        try {
            const res = await userAPI.logout()

            if (res.data.success) {
                localStorage.removeItem(TOKEN)
                dispatch(userActions.logout())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
}

const userLogin = (data) => {
    return async (dispatch) => {
        dispatch(userActions.setNotification({ status: 'loading' }))
        try {
            const { data: result } = await userAPI.login(data)

            if (result.success === false) {
                throw new Error(result.message)
            }
            dispatch(userActions.login(result.token))
            dispatch(userActions.setNotification({ status: 'success' }))
            localStorage.setItem(TOKEN, result.token)
            toast.success(result.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        dispatch(userActions.setNotification({}))
    }
}

const googleLogin = () => {
    return async (dispatch) => {
        try {
            // window.open(`${baseURL}/oauth/google`)
            // const res = await fetch(`${baseURL}/users/login`)
            // console.log(res)
            // const result = await res.json()
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export { userRegister, userLogout, userLogin, googleLogin }
