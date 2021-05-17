import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Pixabay';
import { Provider } from 'react-redux';
import store from '../src/STORES/pixabayStore';

ReactDOM.render(
  <Provider store = {store}>
    <Main/>
  </Provider>
    ,
  document.getElementById('myDiv')
);
