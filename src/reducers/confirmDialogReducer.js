import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    buttonPressed: null
};

const confirmDialogSlice = createSlice({
    name: 'confirmDialogSlice',
    initialState,
    reducers: {
        setConfirmDialogShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        },
        setConfirmDialogButtonPressed: {
            reducer: (state, action) => {
                state.buttonPressed = action.payload
            },
            prepare: (btn) => {
                return {payload: btn}
            }
        }
    }
});

export const confirmDialogShow = (state) => state.confirmDialogState.showModal;
export const confirmDialogButtonPressed = (state) => state.confirmDialogState.buttonPressed;
export const {setConfirmDialogShow, setConfirmDialogButtonPressed} = confirmDialogSlice.actions;
export default confirmDialogSlice.reducer;