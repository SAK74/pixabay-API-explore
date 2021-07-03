import React, {useEffect, useState} from 'react';

function Cat(props) {
    const mouse = props.mouse;
    return(
        <h1 style = {{position:'absolute', left : mouse.x, top : mouse.y}}>CAT</h1>
    );
}
function Mouse (props){
    const [pos, setPos] = useState({x : 0, y : 0});
    useEffect(() => document.title = pos.x + ' ' + pos.y, [pos]);
    const mouseMov = ev => setPos({ x: ev.clientX, y: ev.clientY });

        return(
            <div onMouseMove = {e => mouseMov(e)} style = {{width : '100%', height : '250px'}}>
                {props.func(pos)}
            </div>
        )
}
function MyElem(){
    return(
        <div>
            <h3>Porusz myszką</h3>
            <Mouse func = { mouse => <Cat mouse = {mouse}/> }
            />
        </div>
    );
}
export default MyElem;
    