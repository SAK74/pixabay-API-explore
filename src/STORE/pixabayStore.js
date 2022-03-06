import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from '../pixaComponent/fetchSlice';
import imagesReducer from '../pixaComponent/imagesSlice';
import progressReducer from '../pixaComponent/progressSlice';

export default configureStore({
    reducer: {
        fetch: fetchReducer,
        images: imagesReducer,
        progress: progressReducer
    }
});