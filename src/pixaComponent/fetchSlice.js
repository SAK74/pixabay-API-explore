import { createSlice } from "@reduxjs/toolkit";

const params = {
    page : 1,
    search: '',
    orientation : 'all',
    category : 'all',
    imageType : 'all',
    colors: "",
};
const fetchSlice = createSlice({
    name : 'fetch',
    initialState: {
        params,
        lang: 'en'
    },
    reducers : {
        reset : state => {state.params = params},       
        changeSearch : (state, action) => {state.params.search = action.payload; state.params.page = 1},
        changeOrientation : (state, action) => {state.params.orientation = action.payload; state.params.page = 1},
        changePerpage : (state, action) => {state.params.orientation = action.payload; state.params.page = 1},
        changeCategory : (state, action) => {state.params.category = action.payload; state.params.page = 1},
        changeImagetype : (state, action) => {state.params.imageType = action.payload; state.params.page = 1},
        changePage : (state, action) => {state.params.page = action.payload},
        resetPage : (state) => {state.params.page = 1},
        changeColor: (state, action) => {state.params.colors = action.payload; state.params.page = 1},
        changeLanguage: (state, action) => {state.lang = action.payload; state.page = 1}
    }
});

export const {changeSearch, changeOrientation, changePerpage, changeCategory, changeImagetype,
    reset, resetPage, changePage, changeColor, changeLanguage} = fetchSlice.actions;
export default fetchSlice.reducer;