import { configureStore} from "@reduxjs/toolkit";
// import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   spliter: null,
//   any: undefined
// });
// console.log(counterReducer({value:6}, reset()));
export default configureStore({
  reducer: {
    counter : counterReducer,
    spliter : null,
    any : null
  }
});
