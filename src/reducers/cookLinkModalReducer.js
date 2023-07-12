import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false
};

const cookLinkModalSlice = createSlice({
    name: 'cookLinkModalSlice',
    initialState,
    reducers: {
        setCookLinkModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        }
    }
});

export const cookLinkModalShow = (state) => state.cookLinkModalState.showModal;
export const {setCookLinkModalShow} = cookLinkModalSlice.actions;
export default cookLinkModalSlice.reducer;