import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { PostList } from "./features/POSTS/postList";
import {AddPostForm} from "./features/POSTS/addPost";
import "./CSS/main.css";
import { SinglePost } from "./features/POSTS/singlePost";
import { PostEdit } from "./features/POSTS/postEdit";

export function Main(){
    // const users = useSelector(selectAllUsers);
    // const dispatch = useDispatch();
    // dispatch(fetchUsers());
    // console.log(users);
    return(
        <Router>
            <h1>Witamy na naszej stronie!</h1>
            <div className = "nav-bar">
                <h3>
                    Tu można zobaczyć najróżniesze posty
                </h3>
                <nav>
                    <Link to = "/">Lista postów</Link>
                </nav>
            </div>
            <Switch>
                <Route exact path = '/'>
                    <AddPostForm/>
                    <PostList/>
                </Route>
                <Route path = "/post/:id">
                    <SinglePost/>
                </Route>
                <Route path = "/editpost/:id">
                    <PostEdit/>
                </Route>
            </Switch>
        </Router>
    )
}