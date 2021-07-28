import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeImagetype, changeOrientation, changePage, changeSearch, 
    reset, resetPage, changeColor } from "./fetchSlice";
import { selectAllImages, sendFetch } from "./imagesSlice";
import { Link } from "react-router-dom";
import { ColorLabel, GoButton, Span } from "./styledComp";


export function Choice(){

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

    const refForm = useRef();

    return (
        <div onClick = {(ev) => {
            if(!refForm.current.contains(ev.target)) refForm.current.classList.remove("visible")
        }}>
            <div className = "header">
                <form onSubmit = {handleSubmit}>
                    <img onClick = {handleSubmit} src = "\PNG\search.png" alt = "search"/>
                    <input placeholder = "szukane słowa" onInput = {handleChange} id = "input" 
                      value = {input} size = "12" autoComplete = 'off'/> 
                    <input onClick = {handleReset} type = 'reset' value = 'Reset all'/>
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
}

export function SendFetch(){

    const [perPage, setPerpage] = useState(20);
    const dispatch = useDispatch();
    const {total, status, error} = useSelector(state => state.images);
    const hits = useSelector(selectAllImages);

    console.log(hits, status, error);
    
    const newSearch = useSelector(state => state.fetch);
    const {page} = useSelector(state => state.fetch);

    useEffect(() => {
        if (status === "iddle") dispatch(sendFetch(perPage));
        // eslint-disable-next-line
    }, [perPage, newSearch]);

    if (status === "loading") return <div>Loading...</div>
    else if (status === "failed") return <h2>{error}</h2>;
    
    // dispatch(resetStatus());

    const handleMouseOver = ev => ev.target.parentNode.nextSibling.style.opacity = '.5';
    
    const handleMouseOut = ev => ev.target.parentNode.nextSibling.style.opacity = '0';
  
    if (!total) return(
        <>
            <div>Brak wyników spełniających kryteria wyszukiwania!</div>
            <div>Spróbój inaczej...</div>
        </>
    )
    const renderedImages = hits.map((value, index) => (
        <div className = 'imgField' key = {index}>
            <Link to = {`/image/${value.id}`}>
                <img onMouseEnter = {handleMouseOver} onMouseLeave = {handleMouseOut} 
                  className = 'img' src = {value.previewURL} alt = {value.type}/>
            </Link>  
            <div className = 'infoLine' style = {{width: value.previewWidth-4,
              top: (value.previewWidth<126 || value.views.toString().length + value.likes.toString().length > 9) ? -48 : -28}}>
                <img src = '\PNG\like.png' alt = "likes"/>
                    {value.likes}
                <span>
                    <img src = '\PNG\view.png' alt = "views"/>                   
                    <span>{value.views}</span>
                </span>               
            </div>
        </div>
    ));
    const pages = (total%perPage) ? Math.floor(total/perPage)+1 : total/perPage;
    const styledSpan = id => id === perPage ? {color:'red', fontWeight: "bold", fontSize: '1.2em'} : null;
    const changePerPage = ev => setPerpage(Number(ev.target.innerText));
    const handePagePlus = () => {
        if (pages !== 1 && page !== pages) dispatch(changePage(page + 1));
    }
    return (
        <>
            <div className = 'container'>
                {renderedImages}
            </div>
            <div className = "downLine">
                <div>Mamy <span style = {{fontWeight:'bold'}}>{total}</span> wyników</div>
                &nbsp;Ilość wyników na stronie: 
                <span className = 'pages' onClick = {changePerPage}>
                    <span style = {styledSpan(20)}> 20 </span>
                    <span style = {styledSpan(40)}> 40 </span>
                    <span style = {styledSpan(60)}> 60 </span>
                </span>
                <span className = 'navPages'>
                    <button onClick = {()=> dispatch(resetPage())}>{'<<'}</button>
                    <button onClick = {()=> dispatch(changePage(page===1 ? 1 : page-1))}>{'<'}</button>
                    <span> page {page} / {pages}</span>
                    <button onClick = {handePagePlus}>{'>'}</button>
                    <button onClick = {()=> dispatch(changePage(pages))}>{'>>'}</button>
                </span>  
            </div>
                      
        </>
    );
}