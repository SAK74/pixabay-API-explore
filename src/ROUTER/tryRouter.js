// import { Router } from "react-router";
import {BrowserRouter as Router, Link, NavLink, Route, Switch, useParams} from 'react-router-dom';
import './router.css';

export default function Main(){
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to = '/'>Home</Link>
                    </li>
                    <li>
                        <NavLink to = '/user/ ' activeClassName = 'activeClass'>User </NavLink>
                    </li>
                    <ul>
                        <li>
                            <Link to = '/user/id'> User id</Link>
                        </li>
                        <li>
                            <Link to = '/user/ip'> User ip</Link>
                        </li>
                    </ul>                   
                    <li>
                        <Link to = '/memo'>Memo</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path = '/'>
                    <Home/>
                </Route>
                <Route exact path = '/user'>
                    <h3>User</h3>
                </Route>
                <Route  path = '/user/:id'>
                    <User/>
                </Route>
                <Route path = '/memo'>
                    <Memo/>
                </Route>
            </Switch>
        </Router>
    );
}

function Home(){
    return <h1>Home</h1>
}

function User(){
    const {id} = useParams();
    // console.log(id);
    return <h2>{id.toUpperCase()}</h2>
}

function Memo(){
    return <h3>Memorized</h3>
}