import React from 'react';
import './Vika1.css';
//import ReactDOM from 'react-dom';

class MyElem extends React.Component {
    constructor(props){
        super(props);
        this.ref1 = React.createRef();
        this.ref2 = React.createRef();
        this.ref3 = React.createRef();
    }
    componentDidMount(){
        const a = document.getElementsByTagName('a');
        for (let i = 0; i <a.length; i++){
            if (a[i].parentElement.tagName == 'DIV') {
               a[i].addEventListener('mouseover', (ev) => this.handleOver(ev));
               a[i].addEventListener('mouseout', () => this.handleOut());
            }
        }
    }
    handleOver = (ev) => {
        let ref = null;
        switch (ev.target.className){
            case 'zaklecia' : 
              ref = this.ref1.current;
              //ref.focus(); 
              ref.style = 'color:yellow'; 
              ref.className = 'hover';
              break;
            case 'miotly' : 
              ref = this.ref2.current;
              //ref.focus(); 
              ref.style = 'color:purple'; ref.className = 'hover';
              break;
            case 'mikstury' : 
              ref = this.ref3.current;
              //ref.focus(); 
              ref.style = 'color:blue'; ref.className = 'hover';
              break;
        }
    }
    handleOut = () => {
        const a = document.getElementsByClassName('hover')[0];
        a.className = 'basic';
        //this.ref1.current.blur(); this.ref1.current.style = 'color:inherit';
        //this.ref2.current.blur(); this.ref2.current.style = 'color:inherit';
        //this.ref3.current.blur(); this.ref3.current.style = 'color:inherit';
    }
    render(){
      return(
            <div className = 'main'>
                <img className = 'gwiazdki' src = '/Vika/gwiazdki.png' alt = 'gwiazdki'></img>
                <nav>
                    <a ref = {this.ref1} href = '\Vika\zaklecia.html' alt = 'zaklecia'>Zaklęcia</a>
                    <a ref = {this.ref2} href = '\Vika\miotly.html' alt = 'Miotly'>Miotły</a>
                    <a ref = {this.ref3} href = '\Vika\mikstury.html' alt = 'Mikstury'>Mikstury</a>
                </nav>
                <div className = 'container'>
                    <div>
                        <a href = '\Vika\zaklecia.html'>
                          <img className = 'zaklecia' src = '\Vika\zaklecia.png'/>
                        </a>
                    </div>
                    <div>
                        <a href = '\Vika\miotly.html'>
                           <img className = 'miotly' src = '\Vika\miotly.png'/>
                        </a>
                    </div>
                    <div>
                        <a href = '\Vika\mikstury.html'>
                           <img className = 'mikstury' src = '\Vika\mikstury.png'/>
                        </a>
                    </div>
                </div>
            </div>
        )       
    }
}

export default MyElem;