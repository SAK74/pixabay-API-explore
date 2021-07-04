import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeSearch } from "./fetchSlice";
import { selectImageById } from "./imagesSlice";
import { Link } from "react-router-dom";

export const  PageIMG = ({match}) => {
    const {id} = match.params;
    const history = useHistory();
    const dispatch = useDispatch();
    const image = useSelector(state => selectImageById(state, id));
    console.log(image);
    const ref = useRef();

    const handleSearchClick = ev => {
        history.push("/");
        dispatch(changeSearch(ev.target.innerText));
    }
    const handleMouseEnter = () => ref.current.style.opacity = '0.8';

    const handleMOuseLeave = () => ref.current.style.opacity = "0";
    
    const tags = image.tags.split(",").map(item => 
      <span onClick = {handleSearchClick} key = {item} className = "tag">{item}&nbsp;</span>);
    
    
    return(
        <>
            <nav>
                <Link className = "navi-button" to = "/">&#9194; Return to search</Link>
            </nav>
            <div className = "big-img" onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMOuseLeave}>

                <img src = {image.webformatURL} alt = {image.type}/>
                <div className = "line" ref = {ref}>
                    <span className = "tags">
                        {tags}
                    </span>
                    <span className = 'right'>
                        <img src = '\PNG\view.png' alt = "eye"/>&nbsp;{image.views}&nbsp;&nbsp;
                        <img src = '/PNG/like.png' alt = "like"/>&nbsp;{image.likes}
                    </span>
                </div>
                
            </div>
            <div className = "author">
                <a href = {`https://pixabay.com/users/${image.user}-${image.user_id}/`} target = "_blank" rel = "noreferrer">
                    <img src = {image.userImageURL} alt = 'user'/>
                    <span>{image.user}</span>
                </a>
            </div>
        </>
    )
}