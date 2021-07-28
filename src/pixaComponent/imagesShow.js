import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllImages } from "./imagesSlice";
import { sendFetch } from "./imagesSlice";
import { changePage, resetPage } from "./fetchSlice";

export function ImagesShow(){

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