import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {}
    },
    reducers: {
        setUserDetails: (state, action) => {
            const newState = { ...state };
            newState.userDetails = { ...action.payload };
            return newState;
        },
        updateUserDetails: (state, action) => {
            const newState = { ...state };
            newState.userDetails = { ...newState.userDetails, ...action.payload };
            return newState;
        }
    }
});

const { reducer: userReducer, actions } = userProfileSlice;
const { setUserDetails, updateUserDetails } = actions;

export { setUserDetails, updateUserDetails };
export default userReducer;