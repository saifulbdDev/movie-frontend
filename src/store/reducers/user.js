import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    authToken: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => ({
            ...state,
            isLoggedIn: true,
            authToken: action.payload,
        }),
        logOut: (state) => ({
            ...state,
            isLoggedIn: false,
            authToken: null,
        }),
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
