import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { postUpdated, selectPostById } from "./postSlice";

export function PostEdit(){
    const {id} = useParams();
    const post = useSelector(state => selectPostById(state,id));
    const dispatch = useDispatch();

    const [title, setTitle] = useState(post.title);
    const [content, setContent ] = useState(post.content);

    const canSave = title && content;
    const history = useHistory();
    const handleClick = () => {
        history.push(`/post/${post.id}`);
        dispatch(postUpdated({id, title, content}));
    }

    return (
        <section>
            <h2>Edytuj post</h2>
            <form onSubmit = {ev => ev.preventDefault()}>
            <label htmlFor = "title">Tytul: </label>
            <input id = "title" onChange = {ev => setTitle(ev.target.value)} value = {title}/>
            <br/>
            <label htmlFor = "content">Zawartość</label>
            <textarea id = "content" value = {content} onChange = {ev => setContent(ev.target.value)}/>
            <br/>
            <button disabled = {!canSave} onClick = {handleClick}>Zatwierdź</button>
        </form>
        </section>
        
    )
}