import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeImagetype, changeOrientation, changePage, changeSearch, reset, resetPage } from "./STORES/pixabayStore";
import './pixa.css';

export default function Main(){

    const {search, imageType, orientation, category} = useSelector(state => state);
    const [input, setInput] = useState(search);
    const dispatch = useDispatch();

    const handleChange = ev => {
        switch (ev.target.id){
            case 'imageType' : dispatch(changeImagetype(ev.target.value)); dispatch(resetPage()); break;
            case 'orientation' : dispatch(changeOrientation(ev.target.value)); dispatch(resetPage()); break;
            case 'category' : dispatch(changeCategory(ev.target.value)); dispatch(resetPage()); break;
            case 'input' : setInput(ev.target.value); break;
        }
    }
    const handleSubmit = ev => {
        ev.preventDefault();
        dispatch(changeSearch(input));
    }
    return (
        <>
            <div className = "header">
                <form onSubmit = {handleSubmit}>
                    <img onClick = {handleSubmit} src = "/PNG/search1.png" alt = "search"/>
                    <input placeholder = "szukane słowa" onInput = {handleChange} id = "input" 
                      value = {input} size = "12" autoComplete = 'off'/>
                                     
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
                    <input onClick = {()=> {dispatch(reset()); setInput("")}} type = 'reset' value = 'Reset all'/>
                </form>
            </div>
            
            <SendFetch/>
        </>
    );
}

export function SendFetch(){
    const KEY = '21461423-8db030276af347c25b0159b67';
    const [state, setState] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [isError, setError] = useState(false);
    const [perPage, setPerpage] = useState(20);

    const dispatch = useDispatch();
 
    const {search, imageType, orientation, category, page} = useSelector(state => state);

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${KEY}&page=${page}${search?'&q='+search:''}&per_page=${perPage}&image_type=${imageType}&orientation=${orientation}&category=${category}`)
            // .then(resp => console.log(resp.url))
            .then(resp => resp.json())
            .then(json => {
                setState(json);
                setIsloading(false); setError(false);
            })
            .catch(err => {
                setError(err.message);
                setIsloading(false);
            })
    }, [search, imageType, orientation, category, page, perPage]);
    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>{isError}</div>;
    
    const hits = state.hits;
    // console.log(hits);

    const handleMouseOver = ev => ev.target.nextSibling.style.opacity = '.5';
    const handleMouseOut = ev => ev.target.nextSibling.style.opacity = '0';

    if (!state.total) return(
        <>
            <div>Brak wyników spełniających kryteria wyszukiwania!</div>
            <div>Spróbój ponownie...</div>
        </>
    )
    const images = hits.map((value, index) => (
        <div className = 'imgField' key = {index}>
            <img onMouseEnter = {handleMouseOver} onMouseLeave = {handleMouseOut} 
              className = 'img' src = {value.previewURL} alt = {value.type}/>
            <div className = 'infoLine' 
             style = {{width: value.previewWidth-4,
             top: (value.previewWidth<126 || value.views.toString().length + value.likes.toString().length > 9) ? -48 : -28}}>
                <img src = '\PNG\like.png' alt = "likes"/>
                {value.likes}
                <span>
                    <img src = '\PNG\eyes-icon.png' alt = "views"/>                   
                    <span>{value.views}</span>
                </span>               
            </div>
        </div>
    ));
    const pages = (state.totalHits%perPage) ? Math.floor(state.totalHits/perPage)+1 : state.totalHits/perPage;
    const styledSpan = id => id === perPage ? {color:'red', fontWeight: "bold", fontSize: '1.2em'} : null;
    const changePerPage = ev => setPerpage(Number(ev.target.innerText));
    const handePagePlus = () => {
        if (pages !== 1 && page !== pages) dispatch(changePage(page + 1));
    }
    return (
        <>
            <div className = 'container'>
                {images}
            </div>
            <div>Mamy <span style = {{fontWeight:'bold'}}>{state.totalHits}</span> wyników</div>
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
        </>
    );
}