import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeImagetype, changeOrientation, changeSearch, reset, changeColor } from "./fetchSlice";
import { ColorLabel, GoButton, Span } from "./styledComp";

export const ChoiceMenu = forwardRef((_, refForm) =>
    {

    const {search, imageType, orientation, category, colors} = useSelector(state => state.fetch);
    const [input, setInput] = useState(search);
    const dispatch = useDispatch();

    const [colorSelect, setColorSelect] = useState(colors.split(","));
    const colorDisable = colorSelect.some(val => val === "grayscale");

    const handleChange = ev => {
        switch (ev.target.id){
            case 'imageType' : dispatch(changeImagetype(ev.target.value)); break;
            case 'orientation' : dispatch(changeOrientation(ev.target.value)); break;
            case 'category' : dispatch(changeCategory(ev.target.value)); break;
            case 'input' : setInput(ev.target.value); break;
            default : throw new Error("NIeznany błąd...");
        }
    }
    const handleSubmit = ev => {
        ev.preventDefault();
        dispatch(changeSearch(input));
    }
    
    const handleColorSubmit = ev => {
        ev.preventDefault();
        let colorSet = "";
        if (colorSelect.some(val => val === "grayscale")) {
            colorSet = "grayscale";
            if (colorSelect.some(val => val === "transparent")) colorSet += ",transparent";
        }else colorSet = colorSelect.join(",");
        console.log(colorSet);
        refForm.current.classList.remove("visible");
        dispatch(changeColor(colorSet));
    }

    const handleChecked = (ev) => {
        if(ev.target.checked){
            setColorSelect(prev => {
                const temp = new Set(prev).add(ev.target.value);
                return [...temp];
            });
        } else {
            setColorSelect(prev => {
                const temp = new Set(prev);
                temp.delete(ev.target.value);
                return [...temp];
            });
        }
    }
    // console.log(colorSelect);
    const colorMenu = [];

    const color = ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown'];
    for (let i = 0; i < color.length; i++){
        const isSelected = colorSelect.some(val => val === color[i]);
        colorMenu[i] = <ColorLabel key = {color[i]} value = {color[i]} disabled = {colorDisable}
         checked = {isSelected} onChange = {handleChecked}/>;
    }

    const spanColor = colors.split(",").map(elem => !elem ? null : <Span key = {elem} color = {elem}></Span>);
    const contentColor = (!colors) ? `Color` : <span className = "span-container">{spanColor}</span>;

    const handleReset = () => {
        setColorSelect([]);
        setInput("");
        dispatch(reset());
    }

    return (
        <div onClick = {(ev) => {
            if(!refForm.current.contains(ev.target)) refForm.current.classList.remove("visible")
          }}>
            <div className = "header">
                <form onSubmit = {handleSubmit}>
                    <div>
                        <img onClick = {handleSubmit} src = "\PNG\search.png" alt = "search"/>
                        <input placeholder = "szukane słowa" onInput = {handleChange} id = "input" 
                        value = {input} size = "12" autoComplete = 'off'/> 
                    </div>
                    <input onClick = {handleReset} type = 'reset' value = 'Reset all filters'/>
                </form>
                <div className = "options">
                    <select onChange = {handleChange} value = {imageType}  id = "imageType">
                        <option value = 'all'>Image type (all)</option>
                        <option value = 'photo'>photto</option>
                        <option value = 'illustration'>illustration</option>
                        <option value = 'vector'>vector</option>
                    </select>
                    
                    <select onChange = {handleChange} id = "orientation" value = {orientation}>
                        <option value = 'all'>Orientation (all)</option>
                        <option value = 'horizontal'>horizontal</option>
                        <option value = 'vertical'>vertical</option>
                    </select>

                    <select onChange = {handleChange} id = "category" value = {category}>
                    <option value = 'all'>Category (all)</option>
                        <option value = 'backgrounds'>backgrounds</option>
                        <option value = 'fashion'>fashion</option>
                        <option value = 'nature'>nature</option>
                        <option value = 'science'>science</option>
                        <option value = 'education'>education</option>
                        <option value = 'feelings'>feelings</option>
                        <option value = 'health'>health</option>
                        <option value = 'people'>people</option>
                        <option value = 'religion'>religion</option>
                        <option value = 'places'>places</option>
                        <option value = 'animals'>animals</option>
                        <option value = 'industry'>industry</option>
                        <option value = 'computer'>computer</option>
                        <option value = 'food'>food</option>
                        <option value = 'sports'>sports</option>
                        <option value = 'transportation'>transportation</option>
                        <option value = 'travel'>travel</option>
                        <option value = 'buildings'>buildings</option>
                        <option value = 'business'>business</option>
                        <option value = 'music'>music</option>
                    </select>

                    <span className = "color-container">
                        <span onClick = {(ev) => {ev.stopPropagation(); refForm.current.classList.toggle("visible")}}>
                            {contentColor} &#9660;
                        </span>
                        <form className = "formColor" onSubmit = {handleColorSubmit} ref = {refForm}>
                                <label>
                                    <input type = "checkbox" value = "transparent" onChange = {handleChecked}
                                      checked = {colorSelect.some(val => val === "transparent")}/>
                                    &nbsp;Transparent
                                </label>
                                <label>
                                    <input type = "checkbox" value = "grayscale" onChange = {ev => {
                                        const isChecked = ev.target.checked;
                                         handleChecked(ev);
                                         if(isChecked) ev.target.parentNode.nextSibling.classList.add("hidden")
                                         else ev.target.parentNode.nextSibling.classList.remove("hidden");
                                        }} checked = {colorDisable}
                                     />
                                    &nbsp;Black & white
                                </label>
                                <div className = "color-select">
                                    {colorMenu}
                                </div>
                                <GoButton>GO</GoButton>
                        </form>
                    </span>
                </div>
            </div>
        </div>
    );
});