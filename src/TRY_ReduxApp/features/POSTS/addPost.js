import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Authors } from "../USERS/authors";
import { selectAllUsers } from "../USERS/usersSlice";
import { postAdded } from "./postSlice";

export function AddPostForm(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user, setUser] = useState("");
    const [requestStatus, setRequestStatus] = useState("iddle");

    const canSave = [title, content, user].every(Boolean) && requestStatus === "iddle";
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    // console.log("usersSelect: ", users);
    const options = users.map(val => (
        <option key = {Math.random()} value = {val}>{val}</option>
    ));

    const handleClick = () => {
        if (canSave) {
           setRequestStatus("pending"); 
           dispatch(postAdded({title, content, author: user, date: new Date().toISOString}));

        }
    }

    return(
        <>
            <section>
                <h2>Dodaj nowy post</h2>
                <form onSubmit = {ev => ev.preventDefault()}>
                    <label htmlFor = "user">Author</label>
                    <select id = "user" value = {user} onChange = {ev => setUser(ev.target.value)}>
                        <option></option>
                        {options}
                    </select><br/>
                    <label htmlFor = "title">Tytuł: </label>
                    <input id = "ttittle" value = {title} onChange = {ev => setTitle(ev.target.value)}/>
                    <br/>
                    <label htmlFor = "content">Zawartość</label>
                    <textarea id = "content" rows = "4" value = {content} 
                      onChange = {ev => setContent(ev.target.value)}/>
                    <br/>
                    <button disabled = {!canSave} onClick = {handleClick}>Zapisz post</button>
                </form>
            </section>
        </>
    );
}