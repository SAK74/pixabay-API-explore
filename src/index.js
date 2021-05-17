import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Main from './Pixabay';
// import {SendFetch} from './Pixabay';
import { Provider } from 'react-redux';
import store from '../src/STORES/pixabayStore';
// import { Counter } from './features/Counter';

//import Toggle from './toggle';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store = {store}>
    <Main/>
    {/* <SendFetch/> */}
  </Provider>
    ,
  document.getElementById('myDiv')
);

//console.log("Cześć");
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
