import { createSlice } from '@reduxjs/toolkit'
import { TOKEN } from 'constants/browserStorage-constants'
const persistedToken = localStorage.getItem(TOKEN)

const initialState = {
    token: persistedToken,
    fetched: false,
    info: {},
    isLoggedIn: !!persistedToken,
    notification: {},
    cart: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                error: action.payload.error,
                message: action.payload.message,
            }
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        login(state, action) {
            state.token = action.payload
            state.isLoggedIn = true
        },
        logout(state) {
            state.token = undefined
            state.isLoggedIn = false
        },
        setUserInfo(state, action) {
            state.info = { ...action.payload, imageHash: Math.random() }
        },
        setCartInfo(state, action) {
            state.cart = action.payload
        },
    },
})

const userActions = userSlice.actions
const userReducer = userSlice.reducer

export { userActions, userReducer }
