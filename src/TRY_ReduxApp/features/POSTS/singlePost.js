import { useSelector } from "react-redux";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { selectAllPosts, selectPostById } from "./postSlice";

export const SinglePost = () => {
    const {id} = useParams();
    const post = useSelector(state => selectPostById(state, id));
    // console.log("post ", post);

    return(
        <article>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Link to = {`/editpost/${post.id}`}>Edytuj</Link>
        </article>
    )
}