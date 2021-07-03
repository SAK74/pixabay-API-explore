import React from 'react';
import './K-K.css';

function OneElem (props){
    return(
        <td className = "square"
         
        onClick={props.onClick}>
            {props.value}</td>
    )
}
class Border extends React.Component{
    constructor(props){
        super(props);
    }
    handleSquareClick(i) {
        const squares = this.props.squares.slice();
        if (squares[i] || calculateWinner(squares)) return;
        squares[i] = this.props.isPlayerX ? 'X' : 'O';
        this.props.handleChange(squares);
        //console.log('AfterChange, squares: ' + squares + ' i=' + i + ' squares[i]=' + squares[i]);
    };
    renderSquares(i){
        let value = this.props.squares[i];
        if (this.props.isWinn){
            const[a,b,c] = this.props.isWinn;
            if  (i==a || i==b || i==c) value = <span style={{color:'red', fontSize:'30px'}}>{this.props.squares[i]}</span>;
        } 
        return <OneElem 
        onClick={()=>this.handleSquareClick(i)} 
        value={value}/>;
    }
    renderTable(){
        const tab = [];
        for (let i = 0; i<3; i++){
            const row = [];
            for (let j = 0; j<3; j++){
                row.push(this.renderSquares(i*3+j));
                console.log('row[i]: ' + row[j]);
            }
            console.log('row: ' + row);
            tab.push(<tr>{row}</tr>)
            console.log(tab);
        }
        return tab;
    }
  render(){
      const nextPlayer=this.props.isPlayerX ? "X" : "O";
      const winner = calculateWinner(this.props.squares);
      console.log(winner);
      let message = winner? 
      <span style={{fontSize:'25px', color:'red'}}>{winner.mess}</span> : 
      `Next player: ${nextPlayer}`;
       //const tab = this.renderTable();
       //console.log('tab: ' + tab);
      return(
          <table className = 'BorderGame'>
              <caption>{message}</caption>
              <tbody>
                  {this.renderTable()}
              </tbody>
          </table>
      )
  }
}
class MyElem extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {history:[
            Array(9).fill(null)
        ], isPlayerX:true, isWinn:false}
    }
    handleChange(squares){
        if (calculateWinner(squares)){
            const line = calculateWinner(squares).line;
            //console.log('line: ' + line);
            this.setState({isWinn:line});
            //console.log('state: ' + this.state.isWinn);

            //squares[i] = this.props.isPlayerX ? <span style={{color:'red'}}>X</span> : <span style = {{color:'red'}}>O</span>;
        }
        const temp = this.state.history.slice();
        //console.log('temp: ' + temp);
        temp.push(squares);
        //console.log('squares: ' + squares + 'temp.push: ' + temp);
        //console.log('MainBefore: ' + this.state.history);
        this.setState(prev => (
            {history:temp, isPlayerX:!prev.isPlayerX}
        ));
        //console.log('Main after: ' + this.state.history);
    }
    handleReturn(){
        this.state.history.pop();
        const temp  = this.state.history;
        this.setState(prev => (
            {history:temp, isPlayerX:!prev.isPlayerX, isWinn:false}
        )
        )
    }
    goTo(step){
        const temp = this.state.history.slice(0,step+1);
        const isX = step % 2 ? false : true; 
        //console.log('temp: ' + temp + 'isX: ' + isX);
        this.setState(
            {history:temp, isPlayerX:isX, isWinn:false}
        );
    }
    render(){
        const history = this.state.history;
        const li = history.map((val, index) => {
            const tekst = index ? 'Go to mov ' + index : 'Go to START';
            return(
                <li key = {index}>
                    <button onClick = {()=> this.goTo(index)}>{tekst}</button>
                </li>
            )
        });
        //console.log('Main(history): ' + this.state.history + ' Main(isX): ' + this.state.isPlayerX +' step: ' + this.state.step);
        return(
            <div className = 'Game'>
              <Border squares = {history[history.length-1]}
              isPlayerX = {this.state.isPlayerX}
              handleChange = {this.handleChange}
              isWinn = {this.state.isWinn}
              />
              <button className = 'return' onClick = {()=>this.handleReturn()}>Return</button>
              <ul>{li}</ul>
            <h3>Smacznego, Vika</h3>  
            </div>
        );
    }
} 
function calculateWinner(squares){
    const LINES = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i=0; i<LINES.length; i++){
        const[a,b,c] = LINES[i];
        if (squares[a] && squares[a]==squares[b] && squares[a]==squares[c]){
            const wynik = {mess:("Winner: "+ squares[a]), line:[a,b,c]};
            //alert(wynik.line);
            return wynik;
        }
    }
    return null;
}

export default MyElem;