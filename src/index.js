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


