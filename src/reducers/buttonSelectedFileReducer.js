import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFileURL: ""
};

const buttonSelectedFileSlice = createSlice({
    name: 'setSelectedFileURL',
    initialState,
    reducers: {
        setSelectedFileURL: {
            reducer: (state, action) => {
                state.selectedFileURL = action.payload
            },
            prepare: (url) => {
                return {payload: url}
            }
        }
    }
});

export const selectedFileURL = (state) => state.buttonSelectedFileState.selectedFileURL;
export const {setSelectedFileURL} = buttonSelectedFileSlice.actions;
export default buttonSelectedFileSlice.reducer;