// import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createStore } from "redux";
// import { incrementByAmount } from "./features/counterSlice";
// import { useDispatch } from "react-redux";
import './counter.css';

const initialState = {
    value: 0,
    status: "iddle",
    error: null,
    names: [],
    preparedData: ""
};
export const counterReducer = (state = initialState, action) => {
    switch (action.type){
        case "increment": return { ...state, value: state.value + 1};
        case "decrement": return { ...state, value: state.value -1};
        case "incrementByAmount": return { ...state, value: state.value + action.payload};

        case "fetchStart": return { ...state, status: "loading"};
        case "fetchSucces": const usersNames = action.payload.map(user => user.name);
            return { ...state, names: usersNames, status: "compleete"};
        case "failed": return { ...state, status: "fail", error: action.payload};
        case "save": return { ...state, preparedData: action.payload};

        default: return state;
    }
}

const fetchData = () => async dispatch => {
    dispatch(fetchStart());
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log("resp: ", resp);
        if (!resp.ok) return dispatch(fetchFailed(resp.status + resp.statusText));
        const json = await resp.json();
        console.log("json: ", json);
        return dispatch(fetchSucces(json));
    } catch (err) {
        return dispatch(fetchFailed(err))
    }
    
}

const increment = () => ({type: "increment"});
const decrement = () => ({type: "decrement"});
const incrementByAmount = amount => ({type: "incrementByAmount", payload: amount});
const incrementAsync = amount => dispatch => {
    setTimeout(() => dispatch(incrementByAmount(amount)), 1500)
}
const fetchSucces = data => ({type: "fetchSucces", payload: data});
const fetchStart = () => ({type: "fetchStart"});
const fetchFailed = error => ({type: "failed", payload: error});
const savePreparedData = data => ({type: "save", payload: data});

export function CounterTry(){
   
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    useEffect(() => {
        
        console.log("start");
        if (state.status === "iddle") {
            dispatch(fetchData());
            console.log("after");
            if (state.status === "complete") refFocus.current.focus();
        }
        
    }, [dispatch, state.status]);
    const [name, setName] = useState("");
    if (state.status === "fail") return <h1>Error: {state.error}</h1>

    // const handleClick = ev => {
    //     // console.log(ev.target.innerText);
    //     switch (ev.target.innerText){
    //         case "+": dispatch(increment()); break;
    //         case "-": dispatch(decrement()); break;
    //         case "add 3": dispatch(incrementByAmount(3)); break;
    //         case "add async 5": dispatch(incrementAsync(5)); break;
    //         default: return null;
    //     }
    // }
    // const temp = ["Leanne Graham", "Ervin Howell", "Clementine Bauch", "Patricia Lebsack", "Chelsey Dietrich", "Mrs. Dennis Schulist", "Kurtis Weissnat", "Nicholas Runolfsdottir V", "Glenna Reichert", "Clementina DuBuque"];

    console.log(state);
    const selectFields = [];
    
    const handleChange = ev => {
        setName(ev.target.value);
    }
    const handleClick = ev => {
        console.log("click: ", ev.target.innerText);
        setName(ev.target.innerText);
        // selectFields = null;
    }
    let focusCount = -1;
    const handleKeyDown = ev => {
        const arr = refActive.current.getElementsByTagName("DIV");
        function setActive (){
            for (let i = 0; i < arr.length; i++) arr[i].className = "item";
            if (arr[focusCount]) arr[focusCount].className = "item-active";

        }
        
        console.log("keyCode: ", ev.keyCode, selectFields, arr[focusCount]);

        console.log("arr: ", arr);
        if (ev.keyCode === 40) {
            // focusCount++;
            console.log(focusCount, selectFields[focusCount]);
            // selectFields[focusCount].addEventListener("click", handleClick);
            if (++focusCount >= arr.length) focusCount = 0;
            console.log(arr);
            setActive();
        } else if (ev.keyCode === 13){
            ev.preventDefault();
            console.log("keyCode: ", ev.keyCode, selectFields, arr[focusCount]);
            if (arr[focusCount]) arr[focusCount].click();
        } else if (ev.keyCode === 38){
            if (--focusCount < 0) focusCount = arr.length - 1;
            setActive();

        }


    }
    const refActive = createRef();
    const refFocus = createRef();
    console.log("ref: ", refActive);
    state.names.forEach(elem => {
        let index;
        if ((index = elem.toLowerCase().indexOf(name.toLowerCase())) !== -1 && name && elem !== name) {
            console.log(index);
            selectFields.push(
                <div key = {elem} className = "item" onClick = {handleClick}>
                    {elem.substring(0, index)}<strong>{elem.substr(index, name.length)}</strong>{elem.substr(index + name.length)}
                </div>
            );
        } 
    });
    console.log(selectFields);
    // refFocus.current.focus();
    return (
        <>
            <p>Select a name:</p>
            <form autoComplete = "off" spellCheck = "false" onSubmit = {() => dispatch(savePreparedData(name))}> 
                <div className = "main-container" onClick = {handleClick}>
                    <input placeholder = "Name" name = "name" value = {name} ref = {refFocus} 
                      onChange = {handleChange} onKeyDown = {handleKeyDown}/>
                    <div ref = {refActive} className = "fields-container">
                        {selectFields}
                    </div>
                    
                </div>
                <input type = "submit"/>
                
            </form>

            {/* <h1>Counter: {state.value}</h1>
            <button onClick = {handleClick}> + </button>
            <button onClick = {handleClick}> - </button>
            <button onClick = {handleClick}>add 3</button>
            <button onClick = {handleClick}>add async 5</button> */}

        </>
    );
}

// export default Counter;
// export const Counter.counterReducer;
// export default Counter;