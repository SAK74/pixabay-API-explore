import { createStore } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// const composeEnhancers = composeWithDevTools();

export function Main(){
    const initialState = {value:1};
    const counterReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'increment' : return {...state, value : state.value + 1};
            case 'decrement' : return {...state, value : state.value - 1};
            case 'incrementWithAmount' : return {...state, value:state.value + action.payload}; 
            default : return state;
        }
    }

    const store = createStore(counterReducer);
    console.log(store.getState());
    const selectCounterValue = state => state.value;
    // const currentValue = selectCounterValue(store.getState());

    return (
        <>
            <button onClick = {()=>{
                store.dispatch({type:'increment'});
                console.log(store.getState());
            }}> + </button>
            <button onClick = {()=>{
                store.dispatch({type:'decrement'});
                console.log(store.getState());
            }}> - </button>
            <button onClick = {()=>{
                store.dispatch({type:'incrementWithAmount', payload: 2});
                console.log(store.getState());
            }}>Dodaj 2</button>
            <div style = {{margin:'25px'}}>{store.getState().value}</div>
        </>
    );
}
export default Main;