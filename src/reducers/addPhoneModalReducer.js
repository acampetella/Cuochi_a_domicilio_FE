import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false
};

const addPhoneModalSlice = createSlice({
    name: 'addPhoneModalSlice',
    initialState,
    reducers: {
        setPhoneModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        }
    }
});

export const phoneModalShow = (state) => state.addPhoneModalState.showModal;
export const {setPhoneModalShow} = addPhoneModalSlice.actions;
export default addPhoneModalSlice.reducer;