import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page : 1,
    search: '',
    orientation : 'all',
    category : 'all',
    imageType : 'all'
};
const fetchSlice = createSlice({
    name : 'fetch',
    initialState,
    reducers : {
        reset : () => initialState,       
        changeSearch : (state, action) => {state.search = action.payload},
        changeOrientation : (state, action) => {state.orientation = action.payload},
        changePerpage : (state, action) => {state.orientation = action.payload},
        changeCategory : (state, action) => {state.category = action.payload},
        changeImagetype : (state, action) => {state.imageType = action.payload},
        changePage : (state, action) => {state.page = action.payload},
        resetPage : (state) => {state.page = 1},
    }
});

export const {changeSearch, changeOrientation, changePerpage, changeCategory, changeImagetype,
    reset, resetPage, changePage} = fetchSlice.actions;
export default fetchSlice.reducer;