import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Choice, SendFetch } from './Pixabay';
import { Author } from "./author";
import { PageIMG } from "./pageIMG";
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
                <Route path = "/author">
                    <Author/>
                </Route>
                <Route path = '/image/:id' component = {PageIMG}>
                    {/* <PageIMG/> */}
                </Route>
            </Switch>
        </Router>
    )
}

export default Main;