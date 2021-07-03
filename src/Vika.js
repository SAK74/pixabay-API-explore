import React from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import './Vika.css';

class MyElem extends React.Component{
    constructor(props){
        super(props);
        this.state = {ubrania:null, wakacje:null, zajecia:null, ogrodnictwo:null, selected:null, okno:null}
        this.ref = React.createRef();
    }
    handleOver(ev) {
        const target = ev.target.parentNode.className;
        console.log(target);
        let menuValue = null;
        switch (target){
            case 'ubrania' : menuValue = (
               <select>
                <option value = 'spodnie'>SPODNIE</option>
                <option value = 'sukienkę'>SUKIENKI</option>
               </select> 
            ); 
            this.setState({ubrania:menuValue, wakacje:null, zajecia:null, ogrodnictwo:null});
            break;
            case 'wakacje' : menuValue = (
                <ul>
                    <li>
                        <a href = 'https://turystycznyninja.pl/tropiki-i-kraje-egzotyczne/'
                    rel = 'noreferrer'
                    target = '_blank'>TROPIKI</a>
                    </li>
                    <li>
                        <a href = 'https://pl.wikivoyage.org/wiki/Daleki_Wsch%C3%B3d'
                    rel = 'noreferrer'
                    target = '_blank'>DALEKI WSCHÓD</a>
                    </li>
                    <li>
                        <a href = 'https://turystycznyninja.pl/tropiki-i-kraje-egzotyczne/'
                    rel = 'noreferrer'
                    target = '_blank'>AFRYKA</a>
                    </li>
                    <li>
                        <a href = 'https://turystycznyninja.pl/tropiki-i-kraje-egzotyczne/'
                    rel = 'noreferrer'
                    target = '_blank'>AMERYKA</a>
                    </li>
                    <li> 
                        <a href = ''
                    rel = 'noreferrer'
                    target = '_blank'>AUSTRALIA</a>
                    </li>
                </ul>
             ); 
             this.setState({ubrania:null, wakacje:menuValue, zajecia:null, ogrodnictwo:null});
             break;
             case 'zajecia' : menuValue = (
                 <ul>
                     <li><a href = ''>DLA DZIECI</a></li>
                     <li><a href = ''>DLA NASTOLATKÓW</a></li>
                     <li><a href = ''>DLA DOROSŁYCH</a></li>
                 </ul>
             ); 
             this.setState({ubrania:null, wakacje:null, zajecia:menuValue, ogrodnictwo:null});
             break;
             case 'ogrodnictwo' : menuValue = (
                <select>
                 <option>ROŚLINY</option>
                 <option>NARZĘDZIA</option>
                 <option>NASIONA</option>
                </select> 
             ); 
             this.setState({ubrania:null, wakacje:null, zajecia:null, ogrodnictwo:menuValue});
             break;
        }
    }
    handleChange(ev){
        console.log(ev.target.value);
        const okno = (
            <div className = 'okno'>
                Idź do sklepu i kup se {ev.target.value}!!!
            </div>
        );
        this.setState({okno:okno});
    }
    handleClick(ev){
        if (ev.target.tagName != 'SELECT') {
            this.setState({ubrania:null, wakacje:null, zajecia:null, ogrodnictwo:null, okno:null});
            return;
        }
        const opt = document.getElementsByTagName('SELECT');
        console.log(opt);
        opt[0].addEventListener('click', (ev) => this.handleChange(ev));
    }
    componentDidMount(){
      const span = document.getElementsByTagName('SPAN');
      for (let i = 0; i < span.length; i++){
        span[i].addEventListener('mouseover', (ev) => this.handleOver(ev));
      }
      this.ref.current.focus();
    }
    endOf(){
        //unmountComponentAtNode(document.getElementById('myDiv'));
        ReactDOM.render(<h1>Asta la Vista BABY!</h1>, document.getElementById('myDiv'));
    }
    render(){
        const FancyButton = React.forwardRef((props, ref) => (
            <button {... props} ref = {ref} className = 'FancyBut'>{props.children}</button>
        )
        );
        return(
            <div onClick = {(ev) => this.handleClick(ev)} className = 'main'>
                <header>
                    <FancyButton onClick = {() => this.endOf()} ref = {this.ref}>Nie klikać !!!</FancyButton> 
                    <a href = 'https://turystycznyninja.pl/tropiki-i-kraje-egzotyczne/'>WSZYSTKO.PL</a>
                </header>
                <div className = 'ubrania'>
                    <span>UBRANIA</span>
                    {this.state.ubrania}
                </div>
                <div className = 'wakacje'>
                    <span>WAKACJE</span>
                    {this.state.wakacje}
                </div>
                <div className = 'zajecia'>
                    <span>ZAJĘCIA</span>
                    {this.state.zajecia}
                </div>
                <div className = 'ogrodnictwo'>
                    <span>OGRODNICTWO</span>
                    {this.state.ogrodnictwo}
                </div>
                {this.state.okno}
            </div>
        )
    }
}

export default MyElem;