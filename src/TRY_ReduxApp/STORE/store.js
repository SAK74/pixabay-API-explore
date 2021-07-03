import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/POSTS/postSlice';
import userReducer from '../features/USERS/usersSlice';

export default configureStore({reducer: {
    posts: postReducer,
    users: userReducer
}});