import React from 'react';
import './view.css';

class MyElem extends React.Component{
    constructor(props){
        super(props);
        this.state = {licznik:0}
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({licznik: this.state.licznik + 1})
    }
    render(){
        return(
            <div>
              <button onClick = {this.handleClick}>{this.state.licznik}</button>
            </div>
        )
    }
}
export default MyElem;