import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coverImage: null
};

const coverUploadSlice = createSlice({
    name: 'coverUploadSlice',
    initialState,
    reducers: {
        setCoverImage: {
            reducer: (state, action) => {
                state.coverImage = action.payload
            },
            prepare: (image) => {
                return {payload: image}
            }
        }
    }
});

export const coverImage = (state) => state.coverUploadState.coverImage;
export const {setCoverImage} = coverUploadSlice.actions;
export default coverUploadSlice.reducer;