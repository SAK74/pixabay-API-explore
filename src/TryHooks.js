import React, {useCallback, useMemo, useReducer, useState} from 'react';
import styles from './try.module.css';

export function Main(props){
    // const [a, setA] = useState(1);
    // const [b, setB] = useState(2);
    // console.log(a,b);

    // const example  = useMemo(a+b, [a,b]);
    // console.log(example);

    // const myFunc = useCallback((x,y) => x + y + 1, [props]);
    // const myExample = myFunc(a,b);
    // console.log(myExample);

    // console.log(styles);

    const initialState = [1,2,'asd'];

    const reducer = (state, action) => {
        switch(action.type){
            case 'add':
                return [...state, action.payload];
            case 'reset':
                return initialState;
            default : throw new Error('Błąd');
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);


    const handleRedcuer = () => {
        dispatch({type: 'add', payload: [1,5,10,12]});  
        console.log(state);
    }

    const handleReset = () => {
        dispatch({type: 'reset'})    
        console.log(state);
    }
    return(
        <>
        <button onClick={handleRedcuer}>KLik</button>
        <button className = {styles.button} onClick={handleReset}>Reset</button>
        </>
    )
}