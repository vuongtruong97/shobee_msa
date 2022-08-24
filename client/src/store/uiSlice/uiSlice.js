import { createSlice } from '@reduxjs/toolkit'
import { IS_DARK_MODE } from 'constants/browserStorage-constants'

const persistedIsDarkMode = localStorage.getItem(IS_DARK_MODE)

const initialState = {
    isDarkMode: persistedIsDarkMode === 'true' ? true : false,
    firstLoad: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsDarkMode(state, action) {
            state.isDarkMode = action.payload
        },
        setFirstLoad(state, action) {
            state.firstLoad = action.payload
        },
    },
})

const uiActions = uiSlice.actions
const uiReducer = uiSlice.reducer

export { uiActions, uiReducer }
