import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import store from '../STORES/store';
import {increment, decrement, incrementByAmount, incrementAsync, reset} from './counterSlice';
export function Counter(){
    const selectCount = state => state.counter.value;
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    // console.log(store.getState());
    // console.log(typeof increment);
    const [amount, setAmount] = useState(4);
    const handleInput = (ev) => setAmount(Number(ev.target.value));
    return(
        <>
            <h2>Counter: {count}</h2>
            <button onClick = {() => dispatch(increment())}> + </button>
            <button onClick = {() => dispatch(decrement())}> - </button>
            <button onClick = {() => dispatch(incrementByAmount(amount || 0))}> add amount</button>
            <button onClick = {() => dispatch(incrementAsync(amount))}> add async </button>
            <button onClick = {() => dispatch(reset())}>reset</button>
            <h4> Amount: {amount}</h4>
            <br/>
            <input onChange = {handleInput} size = '6' placeholder = 'set amount'/>
        </>
    )
}