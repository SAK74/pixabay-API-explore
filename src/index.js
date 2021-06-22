import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

// import {SendFetch} from './Pixabay';
import Main from './Pixabay';
import store from './STORES/pixabayStore';

import { Provider } from 'react-redux';
// import store from './STORES/counterStore';

// import { CounterTry } from './CounterTry';

// import {Main} from './TryRedux';
// import store from './TRY_ReduxApp/STORE/store';
// import { fetchUsers } from './TRY_ReduxApp/features/USERS/usersSlice';

//import Toggle from './toggle';
// import reportWebVitals from './reportWebVitals';

// store.dispatch(fetchUsers());
// console.log("index: ", store.getState());

ReactDOM.render(
  <Provider store = {store}>
    <Main/>
  </Provider>
    ,
  document.getElementById('myDiv')
);

//console.log("Cześć");
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals(console.log);
