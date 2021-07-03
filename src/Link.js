import React from 'react';

export default class Link extends React.Component{
    constructor(props){
        super(props);
        this.state = {class: 'normal'};
    }
    _onMouseEnter(){
        this.setState({class: 'hovered'});
    }
    _onMouseOver(){
        this.setState({class: normal});
    }
    render(){
        return(
            <a className = {this.state.class}
               href = {this.props.page || '#'}
               onMouseEnter = {() => this._onMouseEnter()}
               onMouseOver = {() => this._onMouseOver()}
            >
                {this.props.children}
            </a>
        )
    }
}