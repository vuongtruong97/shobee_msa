import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice/userSlice'
import { cartReducer } from './cartSlice/cartSlice'
import { uiReducer } from './uiSlice/uiSlice'
import { chatReducer } from './chatSlice/chatSlice'

const store = configureStore({
    reducer: { user: userReducer, cart: cartReducer, ui: uiReducer, chat: chatReducer },
})

export default store
