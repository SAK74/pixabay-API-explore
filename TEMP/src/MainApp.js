import React, {createRef, useState, useEffect} from 'react';
import {savePreparedData, fetchData} from './STORE/actions';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

export const MainApp = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const refFocus = createRef();
  const refActive = createRef();
  useEffect(() => {
    if (state.status === "iddle") dispatch(fetchData());
    if (state.status === "complete") refFocus.current.focus();
  }, [state.status, dispatch]);

  const handleChange = ev => setName(ev.target.value);
  const handleItemClick = ev => setName(ev.target.innerText);

  let focusCount = -1;
  const handleKeyDown = ev => {
    const arr = refActive.current.getElementsByTagName('DIV');
    function setActive(){
      for (let i = 0; i < arr.length; i++) arr[i].className = "all-items";
      arr[focusCount].className = "active-item";
    }
    if (ev.keyCode === 40){
      if (++focusCount >= arr.length) focusCount = 0;
      setActive();
    } else if (ev.keyCode === 38){
      if (--focusCount < 0) focusCount = arr.length - 1;
      setActive();
    } else if (ev.keyCode === 13){
      ev.preventDefault();
      if (arr[focusCount]) arr[focusCount].click();
    }
  }

  const handleSubmit = ev => {
    ev.preventDefault();
    dispatch(savePreparedData(name));
  }

  const selectFields = [];
  state.names.forEach(elem => {
    let index;
    if ((index = elem.toLowerCase().indexOf(name.toLowerCase())) !== -1 && name && elem !== name){
      selectFields.push(
        <div key = {elem} className = "all-items" onClick = {handleItemClick}>
          {elem.substring(0, index)}<strong>{elem.substr(index, name.length)}</strong>{elem.substr(index + name.length)}
        </div>
      )
    }
  });

  return (
   <>
    <p>Select a name:</p>
    <form autoComlete = "off" spellCheck = "false" onSubmit = {handleSubmit}>
      <div className = 'main-container'>
        <input name = "name" placeholder = "Name" value = {name} ref = {refFocus} onChange = {handleChange} onKeyDown = {handleKeyDown}/>
        <div className = "fields-container">
          {selectFields}
        </div>
      </div>
      <input type = "submit"/>
    </form>
   </>
  );
}