import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedAvatarURL: ""
};

const buttonSelectedAvatarSlice = createSlice({
    name: 'setSelectedAvatarURL',
    initialState,
    reducers: {
        setSelectedAvatarURL: {
            reducer: (state, action) => {
                state.selectedAvatarURL = action.payload
            },
            prepare: (url) => {
                return {payload: url}
            }
        }
    }
});

export const selectedAvatarURL = (state) => state.buttonSelectedAvatarState.selectedAvatarURL;
export const {setSelectedAvatarURL} = buttonSelectedAvatarSlice.actions;
export default buttonSelectedAvatarSlice.reducer;