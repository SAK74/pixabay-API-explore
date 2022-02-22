import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { incValue } from "./progressSlice";

export const sendFetch = createAsyncThunk(
  "sendFetch",
  (perPage, { getState, dispatch }) => {
    dispatch(incValue(0));
    const {
      search,
      imageType,
      orientation,
      category,
      page,
      colors
    } = getState().fetch.params;
    const lang = getState().fetch.lang;
    return axios({
      url: `https://enylbkqka6yz1qs.m.pipedream.net`,
      params: {
        page,
        q: search,
        per_page: perPage,
        image_type: imageType,
        orientation,
        category,
        colors,
        lang
      },
      onDownloadProgress: ({ loaded, total }) => {
        const current = loaded / total * 100;
        const delta = 10;
        let prev = 0;
        if (current >= prev + delta) {
          dispatch(incValue(current));
          prev = current;
        }
      }
    })
      .then((resp) => resp.data)
      .catch((err) => {
        console.log(err);
        throw Error(err.message);
      });
  }
);

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
    [sendFetch.pending]: (state) => {
      state.status = "loading";
    },
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
} = imagesAdapter.getSelectors((state) => state.images);
// export const {resetStatus} = imagesSlice.actions;

export default imagesSlice.reducer;
