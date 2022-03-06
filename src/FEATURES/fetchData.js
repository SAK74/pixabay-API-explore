import axios from "axios";
import { incValue } from "../pixaComponent/progressSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
   "fetchData",
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