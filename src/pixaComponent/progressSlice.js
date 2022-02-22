import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
   name: "progress",
   initialState: 0,
   reducers: {
      incValue: (state, { payload }) => {
         state = payload;
         console.log('progress:', state);
      },
   }
});

export default progressSlice.reducer;
export const { incValue } = progressSlice.actions;