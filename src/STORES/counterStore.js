import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {counterReducer} from '../CounterTry';

export default createStore(counterReducer, applyMiddleware(thunk));

