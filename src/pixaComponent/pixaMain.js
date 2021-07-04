import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Choice, SendFetch } from './Pixabay';
import { PageIMG } from "./pageIMG";
import '../CSS/pixa.css';

const Main = () => {
    return(
        <Router>
            <Switch>
                <Route exact path = "/" render = {() => 
                    <>
                        <Choice/>
                        <SendFetch/>
                    </>
                    }/>
                <Route path = '/image/:id' component = {PageIMG}>
                </Route>
            </Switch>
        </Router>
    )
}

export default Main;