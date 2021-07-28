import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ChoiceMenu } from './ChoiseMenu';
import { PageIMG } from "./pageIMG";
import '../CSS/pixa.css';
import { ImagesShow } from "./imagesShow";
import { createRef } from "react";

const Main = () => {
    const refToDropDown = createRef();
    return(
        <Router>
            <Switch>
                <Route exact path = "/" render = {() => 
                    <div onClick = {(ev) => {
                      if(!refToDropDown.current.contains(ev.target)) refToDropDown.current.classList.remove("visible")
                    }}>
                        <ChoiceMenu ref = {refToDropDown}/>
                        <ImagesShow/>
                    </div>
                    }/>
                <Route path = '/image/:id' component = {PageIMG}>
                </Route>
            </Switch>
        </Router>
    )
}

export default Main;