import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false
};

const cookTownModalSlice = createSlice({
    name: 'cookTownModalSlice',
    initialState,
    reducers: {
        setCookTownModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        }
    }
});

export const cookTownModalShow = (state) => state.cookTownModalState.showModal;
export const {setCookTownModalShow} = cookTownModalSlice.actions;
export default cookTownModalSlice.reducer;