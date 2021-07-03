import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../fetch";
import { fetchUsers, selectAllUsers } from "./usersSlice";

export function Authors({postId}){
    const authors = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchUsers()), []);
    console.log(authors);
    const options = authors.map(val => (
        <option key = {val} value = {val}></option>
    ));


    return {options};
       
}