import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    modalTitle: "",
    modalText: "",
    confirmFunction: null
};

const candidateModalSlice = createSlice({
    name: 'candidateModalSlice',
    initialState,
    reducers: {
        setCandidateModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        },
        setCandidateModalTitle: {
            reducer: (state, action) => {
                state.modalTitle = action.payload
            },
            prepare: (text) => {
                return {payload: text}
            }
        },
        setCandidateConfirmFunction: {
            reducer: (state, action) => {
                state.confirmFunction = action.payload
            },
            prepare: (func) => {
                return {payload: func}
            }
        },
        setCandidateModalText: {
            reducer: (state, action) => {
                state.modalText = action.payload
            },
            prepare: (text) => {
                return {payload: text}
            }
        },
    }
});

export const candidateModalShow = (state) => state.candidateModalState.showModal;
export const candidateModalTitle = (state) => state.candidateModalState.modalTitle;
export const candidateModalConfirmFunction = (state) => state.candidateModalState.confirmFunction;
export const candidateModalText = (state) => state.candidateModalState.modalText;
export const {setCandidateModalShow, setCandidateModalTitle, setCandidateConfirmFunction, 
    setCandidateModalText} = candidateModalSlice.actions;
export default candidateModalSlice.reducer;