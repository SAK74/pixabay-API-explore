import { useSelector } from "react-redux";
import { selectImageById } from "./imagesSlice";

export const  PageIMG = ({match}) => {
    const {id} = match.params;
    console.log(id);
    const image = useSelector(state => selectImageById(state, id));
    console.log(image);
    
    return(
        <>
            <img src = {image.webformatURL} alt = {image.type}/>
            <img className = "authorImage" style = {{borderRadius: "40%"}} src = {image.userImageURL} alt = 'user' width = "100px" height = "100px"/>
        </>
    )
}