import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cook: null,
    initialCook: null,
    cookChange: false
};

const cookSlice = createSlice({
    name: 'cookSlice',
    initialState,
    reducers: {
        setCook: {
            reducer: (state, action) => {
                state.cook = action.payload
            },
            prepare: (obj) => {
                return {payload: obj}
            }
        },
        setInitialCook: {
            reducer: (state, action) => {
                state.initialCook = action.payload
            },
            prepare: (obj) => {
                return {payload: obj}
            }
        },
        setCookChange: {
            reducer: (state, action) => {
                state.cookChange = action.payload
            },
            prepare: (value) => {
                return {payload: value}
            }
        }
    }
});

export const cook = (state) => state.cookState.cook;
export const initialCook = (state) => state.cookState.initialCook;
export const cookChange = (state) => state.cookState.cookChange;
export const {setCook, setInitialCook, setCookChange} = cookSlice.actions;
export default cookSlice.reducer;