import {
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { fetchData } from "../FEATURES/fetchData";

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
    resetStatus: (state) => {
      state.status = "iddle";
    }
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "iddle";
      state.total = action.payload.totalHits;
      imagesAdapter.setAll(state, action.payload.hits);
      // console.log("STATE: ", action.payload.hits, state.status);
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(state.error);
    }
  }
});

export const {
  selectAll: selectAllImages,
  selectById: selectImageById
} = imagesAdapter.getSelectors((state) => state.images);
// export const {resetStatus} = imagesSlice.actions;

export default imagesSlice.reducer;
