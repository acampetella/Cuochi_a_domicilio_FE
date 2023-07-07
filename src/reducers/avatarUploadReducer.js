import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    avatarImage: null
};

const avatarUploadSlice = createSlice({
    name: 'avatarUploadSlice',
    initialState,
    reducers: {
        setAvatarImage: {
            reducer: (state, action) => {
                state.avatarImage = action.payload
            },
            prepare: (image) => {
                return {payload: image}
            }
        }
    }
});

export const avatarImage = (state) => state.avatarUploadState.avatarImage;
export const {setAvatarImage} = avatarUploadSlice.actions;
export default avatarUploadSlice.reducer;