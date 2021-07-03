import {MyContent, content} from './Theme-context';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {Lista, Gudzik} from './lists';
import './context.css';

const ContChange = React.createContext({change : () => {}});
export default class MyElem extends React.Component{
    constructor(props){
        super(props);
        this.state = {theme: content.red, click:null, 
            provide: {
                styl: content.blue, change: this.handleClick
            }}
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
    }
    //static contextType = ContChange;
    handleClick = ev => {
        this.myRef.current.focus();
       //console.log(ev.target.innerHTML);
       this.setState(prev => (
               { theme: (prev.theme === content.blue) ? content.red : content.blue, 
                click: <div>Kliknięto przycisk: {ev.target.innerHTML}</div> }
       ));
    }
    static contextType = MyContent;
    componentDidMount(){
        this.myRef1.current.focus();
    }
    render(){
    
    //const ContChange = React.createContext(MyContent.change);
    const my = this.context;
    console.log(my);
    const myNew = my.styl;
    console.log(myNew);
    const theme = this.state.theme;
    const x = {a:null, b:null};
    console.log(this.state);
    //console.log(this.context);
    const {y, z} = x;
    //console.log(y, z);
    const td = () => (
        <>
            <td>1</td>
            <td>2</td>
        </>
    );
    const El = props => {
        return (
            <div style = {{color: props.color}}>Piszę tu coś w inny sposób..!!
              <p {... props}>Łącznie zz paragrafem</p>
            </div>
        )
    }
    //const myRef = React.createRef();
    //this.myRef.current.focus();
    return(
        <div>
            <h3 style = {{color: theme.font, backgroundColor: theme.border}}>Coś tam</h3>
            <ContChange.Provider value = {this.handleClick}>
                <MyContent.Provider value = {this.state.provide}>
                  <One/>
                </MyContent.Provider>
            </ContChange.Provider>
            <El color = 'red' tlo = 'black' onClick = {(e) => alert(e.target.innerHTML)}/>
            <table>
                <tbody>
                   <tr>
                       {td()}
                   </tr>
                </tbody>
            </table>
            {this.state.click}
            <Lista title = "Lista jakaś tam...">
                <li>Pierwszy</li>
                <li>drugi</li>
                <li>trzeci</li>
                <li>czwarty</li>
                <li>...</li>
                <Gudzik ref = {this.myRef} name = 'Facebook'/>
                <Gudzik name = 'Allegro'/>
            </Lista>
            <input ref = {this.myRef1}  type = 'submit'/>
        </div>
    )
    }
}
//MyElem.contextType = MyContent;
function  Button () {
    const locale = useContext(ContChange);
    console.log(locale);
    const [klik, setKlik] = useState(0);
    const mySet = (e) => {
        setKlik(prev => prev + 1);
        locale(e);
    }
    useEffect(() =>
        {document.getElementById('myButton').addEventListener('click', mySet);}, []
    )
    useEffect(() => {
        document.title = klik;
        //console.log([klik]);
        }, [klik]
    );
    return (
        <MyContent.Consumer>
            {obj => (
                    <button  id = 'myButton' 
                    //onClick={() => setKlik(prev => prev + 1)}
                    //onClick={(ev) => mySet(ev)} 
                    style={{ color: obj.styl.font, backgroundColor: obj.styl.border }}>{klik}
                    </button>
                    )
            }
        </MyContent.Consumer>
    )
}
function Two () {
    return <Button />
}
function One () {
    return <Two />
}
//export default MyElem;