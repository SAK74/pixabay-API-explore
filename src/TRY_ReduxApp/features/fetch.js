import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
    const resp = await fetch('http://localhost:3000/posts');
    // console.log('resp: ', resp);
    return await resp.json();
});