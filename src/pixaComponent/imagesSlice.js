import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const sendFetch = createAsyncThunk('sendFetch', async (perPage, { getState }) => {
    const KEY = process.env.REACT_APP_API_KEY;
    const { search, imageType, orientation, category, page, colors } = getState().fetch.params;
    const lang = getState().fetch.lang;
    const resp = await fetch(`https://pixabay.com/api/?key=${KEY}&page=${page}${search ? '&q=' + search : ''}&per_page=${perPage}&image_type=${imageType}&orientation=${orientation}&category=${category}&colors=${colors}&lang=${lang}`);
    // console.log(resp);
    if (!resp.ok) throw new Error("Error... " + resp.status + resp.statusText);
    return resp.json();
});

const imagesAdapter = createEntityAdapter();
const initialState = imagesAdapter.getInitialState({
    total: 0,
    status: "iddle",
    error: null
});

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        resetStatus: state => { state.status = "iddle" }
    },
    extraReducers: {
        [sendFetch.pending]: state => { state.status = "loading" },
        [sendFetch.fulfilled]: (state, action) => {
            state.status = "iddle";
            state.total = action.payload.totalHits;
            imagesAdapter.setAll(state, action.payload.hits);
            console.log("STATE: ", action.payload.hits, state.status);
        },
        [sendFetch.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            console.log(state.error);
        }
    }
});

export const {
    selectAll: selectAllImages,
    selectById: selectImageById
} = imagesAdapter.getSelectors(state => state.images);
// export const {resetStatus} = imagesSlice.actions;

export default imagesSlice.reducer;
