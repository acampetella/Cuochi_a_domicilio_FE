import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    initialUser: {}
};

const initialUserSlice = createSlice({
    name: 'setInitialUser',
    initialState,
    reducers: {
        setInitialUser: {
            reducer: (state, action) => {
                state.initialUser = action.payload
            },
            prepare: (obj) => {
                return {payload: obj}
            }
        }
    }
});

export const initialUser = (state) => state.initialUserState.initialUser;
export const {setInitialUser} = initialUserSlice.actions;
export default initialUserSlice.reducer;