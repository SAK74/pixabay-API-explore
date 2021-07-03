import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {fetchPosts} from "../fetch";

const initialState = {
    status: 'iddle',
    error: null,
    posts: []
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const resp = await fetch('http://localhost:3000/posts');
    // console.log('resp: ', resp);
    return await resp.json();
});

export const postAdded = createAsyncThunk("posts/added", async addedPost => {
    const response = await fetch('http://localhost:3000/posts', {
        method: "POST",
        body: JSON.stringify(addedPost),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json();
})

const postSlice = createSlice({
    initialState,
    name: 'posts',
    reducers: {
        postUpdated: (state, action) => {
            const {id, title, content} = action.payload;
            const existingPost = state.posts.find(val => val.id === Number(id));
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: state => {state.status = 'loading'},
        [fetchPosts.fulfilled]: (state, action) => {
            console.log('action_ful: ', action);
            state.status = 'complette' ;
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log('action_rej: ', action);
            state.status = 'error';
            state.error = action.error.message;
        },
        [postAdded.fulfilled]: (state, action) => {
            console.log('action_ful: ', action);
            state.posts.push(action.payload);
        }
    }
});

export const selectAllPosts = state => state.posts.posts;
export const selectStatus  = state => state.posts.status;
export const selectError = state => state.posts.error;
export const selectPostById = (state, id) => state.posts.posts.find(elem => elem.id === Number(id));

export const {postUpdated} = postSlice.actions;
export default postSlice.reducer;