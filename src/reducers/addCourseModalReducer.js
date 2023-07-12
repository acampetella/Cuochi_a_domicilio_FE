import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false
};

const addCourseModalSlice = createSlice({
    name: 'addCourseModalSlice',
    initialState,
    reducers: {
        setCourseModalShow: {
            reducer: (state, action) => {
                state.showModal = action.payload
            },
            prepare: (show) => {
                return {payload: show}
            }
        }
    }
});

export const courseModalShow = (state) => state.addCourseModalState.showModal;
export const {setCourseModalShow} = addCourseModalSlice.actions;
export default addCourseModalSlice.reducer;