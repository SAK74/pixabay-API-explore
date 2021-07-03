import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchPosts } from "../fetch";


const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const resp = await fetch('http://localhost:3000/posts');
    return await resp.json();
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => 
            state = action.payload.map(elem => elem.author)
        //   action.payload.forEach(element => state.push(element.author))
    }
});

export default usersSlice.reducer;

export const selectAllUsers = state => state.users;