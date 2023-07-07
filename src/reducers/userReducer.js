import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    initialUser: null,
    userChange: false
};

const userSlice = createSlice({
    name: 'setUser',
    initialState,
    reducers: {
        setUser: {
            reducer: (state, action) => {
                state.user = action.payload
            },
            prepare: (obj) => {
                return {payload: obj}
            }
        },
        setInitialUser: {
            reducer: (state, action) => {
                state.initialUser = action.payload
            },
            prepare: (obj) => {
                return {payload: obj}
            }
        },
        setUserChange: {
            reducer: (state, action) => {
                state.userChange = action.payload
            },
            prepare: (value) => {
                return {payload: value}
            }
        }
    }
});

export const user = (state) => state.userState.user;
export const initialUser = (state) => state.userState.initialUser;
export const userChange = (state) => state.userState.userChange;
export const {setUser, setInitialUser, setUserChange} = userSlice.actions;
export default userSlice.reducer;