import React, { useContext, useState } from "react";
import './proba.css';

const myCont = React.createContext({my : '?'});
class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {my : 0}
    }
    handleSubmit = (ev) => {
        ev.preventDefault();
    }
    handleChange = (ev) => {
        //console.log(ev.target.value);
        this.setState({my : ev.target.value});
    }
    funcChange = e =>  {
        const fnc = e.target.innerHTML;
        //console.log(typeof(this.state.my));
        this.setState(prev => (
            {my :
            fnc == '+'  ?  Number(prev.my) + 1 : prev.my - 1
            })
        );   
    }
    render(){
        return(
            <>
            <form onSubmit = {ev => this.handleSubmit(ev)} name = 'myForm'>
                <label htmlFor = 'inputNumber'>Wprowadż: </label>
                <input onChange = {ev => this.handleChange(ev)} id = 'inputNumber' 
                placeholder = 'liczba' type = 'number' value = {this.state.my}></input>
                <input type = 'submit'/>
            </form>
            <myCont.Provider value = {this.state}>
              <NewFunc change = {this.funcChange}/>
            </myCont.Provider>
            </>
       )
    }
}
function  NewFunc (props) {
    const [myState, mySet] = useState(useContext(myCont).my);
    //console.log(props.change);
    console.log('NewFunc state: ' + myState);
    function my (e) {
        props.change(e);
        mySet(e.target.innerHTML);
    } 
    const myChanger = e => {
        //for (let z in e.target) console.log(z + ': ' + e.target[z]);
        mySet(e.target.innerHTML);
    }
    return(
        <>
        <button onClick = {myChanger}>Próba</button>
        <Display onClick = {my} 
        //change = {myChanger}
        />
        </>
    )
}
function  Display (props) {
    //console.log(props.change);
    const val = useContext(myCont);
    //console.log(val);
    return(
        <>
        <strong>
            {val.my}
        </strong>
        <button {... props}>+</button>
        <button {... props}>-</button>
        </>
    )
}
export default Main;