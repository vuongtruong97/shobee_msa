import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
})

const cartActions = cartSlice.actions
const cartReducer = cartSlice.reducer

export { cartActions, cartReducer }
