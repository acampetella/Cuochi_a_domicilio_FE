import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false
};

const cookDescriptionModalSlice = createSlice({
    name: 'cookDescriptionModalSlice',
    initialState,
    reducers: {
        setCookDescriptionModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        }
    }
});

export const cookDescriptionModalShow = (state) => state.cookDescriptionModalState.showModal;
export const {setCookDescriptionModalShow} = cookDescriptionModalSlice.actions;
export default cookDescriptionModalSlice.reducer;