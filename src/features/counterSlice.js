import { createSlice } from "@reduxjs/toolkit";

const initial = {value : 0};
const counterSlice = createSlice({
    name : 'counter',
    initialState : initial,
    reducers : {
        increment : state => {state.value += 1},
        decrement : state => {state.value -= 1},
        incrementByAmount : (state, action) => {state.value += action.payload},
        reset : () => initial
    }
})
// console.log(counterSlice.actions);
export const {increment, decrement, incrementByAmount, reset} = counterSlice.actions;
export const incrementAsync = amount => dispatch => {
    setTimeout(() => dispatch(incrementByAmount(amount)), 1500)
}
// export const currentValue = state => state.counter.value;
export default counterSlice.reducer;

// function incr(amount){
//     return function disp(dispatch){
//         setTimeout(() => dispatch(incrementByAmount(amount)), 1000)
//     }
// }
