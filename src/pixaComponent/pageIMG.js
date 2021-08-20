import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSearch } from "./fetchSlice";
import { selectImageById } from "./imagesSlice";
import { Link } from "react-router-dom";
import { DivIMGPage } from "./styledComp";
import { setLang } from "./LANGUAGES/language";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    margin: {
        marginLeft: theme.spacing(2)
    }
}));

export const  PageIMG = ({match}) => {
    const {id} = match.params;
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => selectImageById(state, id));
    const {colors} = useSelector(state => state.fetch.params);
    const lang = useSelector(state => state.fetch.lang);
    const ref = useRef();
    const classes = useStyles();

    const isTransparent = colors.split(",").some(val => val === "transparent");
    const handleSearchClick = ev => {
        history.push("/");
        dispatch(changeSearch(ev.target.innerText));
    }
    const handleMouseEnter = () => ref.current.style.opacity = '0.8';
    const handleMOuseLeave = () => ref.current.style.opacity = "0";

    let tags;
    if (!image) {
        history.push('/');
        return null;
    }
    else {
        tags = image.tags.split(",").map(item => 
      <span onClick = {handleSearchClick} key = {item} className = "tag">{item}&nbsp;</span>);
    }

    return(
        <>
            <nav>
                    <Button color = 'primary' variant = 'outlined' component = {Link} to = '/'
                      className = {classes.margin}> 
                        &#10094; &#10094; &#10094; {setLang(lang, 'Return to search')}
                    </Button>
            </nav>
            <div className = 'bigIMG_container'>
                <div className = "big-img" onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMOuseLeave}>
                    <img src = {image.webformatURL} alt = {image.type}/>
                    <DivIMGPage transparent = {isTransparent} ref = {ref} >
                        <span>
                            {tags}
                        </span>
                        <span className = 'right'>
                            <img src = '\PNG\eye-outline.png' alt = "eye"/>&nbsp;{image.views}&nbsp;&nbsp;
                            <img src = '\PNG\thumb-up-outline.png' alt = "like"/>&nbsp;{image.likes}
                        </span>
                    </DivIMGPage>
                </div>
                
                <div className = "author">
                    <p>Author:</p>
                    <a href = {`https://pixabay.com/users/${image.user}-${image.user_id}/`} target = "_blank" rel = "noreferrer">
                        <img src = {image.userImageURL} alt = 'user'/>
                        <span>{image.user}</span>
                    </a>
                </div>
            </div>
        </>
    )
}