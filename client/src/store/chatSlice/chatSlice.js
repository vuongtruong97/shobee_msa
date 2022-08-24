import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentChat: null,
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChat(state, action) {
            state.currentChat = action.payload
        },
    },
})

const chatActions = chatSlice.actions
const chatReducer = chatSlice.reducer

export { chatActions, chatReducer }
