import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: []
};

const cookMenuSlice = createSlice({
    name: 'cookMenuSlice',
    initialState,
    reducers: {
        setCookMenuCourses: {
            reducer: (state, action) => {
                state.courses = action.payload
            },
            prepare: (arr) => {
                return {payload: arr}
            }
        }

    }
});

export const cookMenuCourses = (state) => state.cookMenuState.courses;
export const {setCookMenuCourses} = cookMenuSlice.actions;
export default cookMenuSlice.reducer;