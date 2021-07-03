import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {  selectAllPosts, selectError, selectStatus, fetchPosts } from "./postSlice";
// import {fetchPosts} from "../fetch";
import {Author} from "../USERS/authors";
import { Link } from "react-router-dom";

export function PostList(){
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('status: ', status);
        if (status === "iddle") dispatch(fetchPosts());
        
    }, [status, dispatch]);
    
    const posts = useSelector(selectAllPosts);
    // console.log(posts);
    const renderedPosts = posts.map(val => (
        <article key = {val.id}>
            <h4>"{val.title}"</h4>
            <h5>Napisany przez: {val.author}</h5>
            <p>{val.content}</p>
            <Link to = {`/post/${val.id}`}>Zobacz</Link>
            
        </article>
    ));
    
    if (status === "loading") return <h2>... loading</h2>
    else if (status === "error") return <h2>{error}</h2>;
    return(
        <>
            <h2>Posts:</h2>
            {renderedPosts}
        </>
    )
}