import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from '../pixaComponent/fetchSlice';
import imagesReducer from '../pixaComponent/imagesSlice';

export default configureStore({reducer: {
    fetch: fetchReducer,
    images: imagesReducer
}});