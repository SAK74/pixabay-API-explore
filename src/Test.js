import React from 'react';

function MyButton(props) {
    return(
        <div> 
            <button {... props}>{props.text}</button>
        </div>
    )
}
class  MyElem extends React.Component {
    handleClick(ev) {
        alert(ev.target.innerHTML)
    }    
    render(){
       return(
        <MyButton text = 'jakis tam tekst' style = {{color:'red'}} 
        onClick = {this.handleClick}
        />
    ) 
    }    
}

export default MyElem;