import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFile: ""
};

const buttonSelectedFileSlice = createSlice({
    name: 'setSelectedFile',
    initialState,
    reducers: {
        setSelectedFile: {
            reducer: (state, action) => {
                state.selectedFile = action.payload
            },
            prepare: (file) => {
                return {payload: file}
            }
        }
    }
});

export const selectedFile = (state) => state.buttonSelectedFileState.selectedFile;
export const {setSelectedFile} = buttonSelectedFileSlice.actions;
export default buttonSelectedFileSlice.reducer;