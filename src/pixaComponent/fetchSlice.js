import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page : 1,
    search: '',
    orientation : 'all',
    category : 'all',
    imageType : 'all',
    colors: ""
};
const fetchSlice = createSlice({
    name : 'fetch',
    initialState,
    reducers : {
        reset : () => initialState,       
        changeSearch : (state, action) => {state.search = action.payload; state.page = 1},
        changeOrientation : (state, action) => {state.orientation = action.payload; state.page = 1},
        changePerpage : (state, action) => {state.orientation = action.payload; state.page = 1},
        changeCategory : (state, action) => {state.category = action.payload; state.page = 1},
        changeImagetype : (state, action) => {state.imageType = action.payload; state.page = 1},
        changePage : (state, action) => {state.page = action.payload},
        resetPage : (state) => {state.page = 1},
        changeColor: (state, action) => {state.colors = action.payload; state.page = 1}
    }
});

export const {changeSearch, changeOrientation, changePerpage, changeCategory, changeImagetype,
    reset, resetPage, changePage, changeColor} = fetchSlice.actions;
export default fetchSlice.reducer;