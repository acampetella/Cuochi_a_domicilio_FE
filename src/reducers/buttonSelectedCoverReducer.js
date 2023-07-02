import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCoverURL: ""
};

const buttonSelectedCoverSlice = createSlice({
    name: 'setSelectedCoverURL',
    initialState,
    reducers: {
        setSelectedCoverURL: {
            reducer: (state, action) => {
                state.selectedCoverURL = action.payload
            },
            prepare: (url) => {
                return {payload: url}
            }
        }
    }
});

export const selectedCoverURL = (state) => state.buttonSelectedCoverState.selectedCoverURL;
export const {setSelectedCoverURL} = buttonSelectedCoverSlice.actions;
export default buttonSelectedCoverSlice.reducer;