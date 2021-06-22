import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Main from './Pixabay';
import store from './STORES/pixabayStore';

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store = {store}>
    <Main/>
  </Provider>
    ,
  document.getElementById('myDiv')
);


