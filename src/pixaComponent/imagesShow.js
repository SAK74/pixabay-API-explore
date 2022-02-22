import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllImages } from "./imagesSlice";
import { sendFetch } from "./imagesSlice";
import { changePage, resetPage } from "./fetchSlice";
import { setLang } from "./LANGUAGES/language";
import { ArrowUpward, FirstPage, LastPage, NavigateBefore, NavigateNext } from '@material-ui/icons';
import { ScrollUp, SpanPerPage } from "./styledComp";
import { Button, LinearProgress, withStyles } from "@material-ui/core";

import '../CSS/loader.css';

export function ImagesShow() {

    const [perPage, setPerpage] = useState(20);
    const dispatch = useDispatch();
    const { total, status, error } = useSelector(state => state.images);
    const hits = useSelector(selectAllImages);
    const progress = useSelector(state => state.progress);
    // console.log(hits, status, error);

    const newSearch = useSelector(state => state.fetch.params);
    const { lang } = useSelector(state => state.fetch);
    const { page } = newSearch;

    useEffect(() => {
        if (status === "iddle") dispatch(sendFetch(perPage));
        // eslint-disable-next-line
    }, [perPage, newSearch]);

    const [visibleUp, setVisibleUp] = useState();

    if (status === "loading") {
        return <div>
            <LinearProgress variant="determinate" value={progress} />
            <div className='loader'>Loading...</div>
        </div>
    }
    else if (status === "failed") { return <h2>{error}</h2> };

    const handleMouseEnter = ev => ev.target.parentNode.nextSibling.style.opacity = '.7';
    const handleMouseLeave = ev => ev.target.parentNode.nextSibling.style.opacity = '0';

    if (!total) return (
        <section className="no_results">
            <p>{setLang(lang, 'No matched results for this parameters...')}</p>
            <p>{setLang(lang, 'please change parameters and try again')}</p>
        </section>
    )
    const renderedImages = hits.map((value, index) => (
        <div className='imgField' key={index}>
            <Link to={`/image/${value.id}`}>
                <img src={value.previewURL} alt={value.type} loading='lazy'
                    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                />
            </Link>
            <div className='infoLine'>
                <img src='\PNG\thumb-up-outline.png' alt="likes" />
                &nbsp;{value.likes}&nbsp;&nbsp;
                <span>
                    <img src='\PNG\eye-outline.png' alt="views" />
                    <span>&nbsp;{value.views}</span>
                </span>
            </div>
        </div>
    ));

    const pages = Math.ceil(total / perPage);
    const changePerPage = ev => setPerpage(Number(ev.target.innerText));
    const handePagePlus = () => {
        if (pages !== 1 && page !== pages) dispatch(changePage(page + 1));
    }

    window.onscroll = () => {
        if (document.documentElement.scrollTop > 300) { setVisibleUp("true") }
        else setVisibleUp(undefined);
    }

    return (
        <>
            <div className='container'>
                {renderedImages}
            </div>
            <div>&nbsp;&nbsp;{setLang(lang, "Matching")} <span style={{ fontWeight: 'bold' }}>{total}</span> {setLang(lang, 'result(s)')}</div>

            <ScrollUp size='small' isvisible={visibleUp} color='primary'
                onClick={() => document.documentElement.scrollTop = 0}>
                <ArrowUpward />
            </ScrollUp>

            {total > 20 && <div className="downLine">
                <span>
                    &nbsp;{setLang(lang, 'Results in the page:')}
                    <span className='pages' onClick={changePerPage}>
                        <NaviButton component={SpanPerPage} active={perPage === 20}>20</NaviButton>
                        <NaviButton component={SpanPerPage} active={perPage === 40}>40</NaviButton>
                        <NaviButton component={SpanPerPage} active={perPage === 60}>60</NaviButton>
                    </span>
                </span>

                <span className='navPages'>
                    <NaviButton disabled={page === 1} onClick={() => dispatch(resetPage())}><FirstPage /></NaviButton>
                    <NaviButton disabled={page === 1} onClick={() => dispatch(changePage(page === 1 ? 1 : page - 1))}><NavigateBefore /></NaviButton>
                    <span> {setLang(lang, 'page')} {page} / {pages}</span>
                    <NaviButton disabled={page === pages} onClick={handePagePlus}><NavigateNext /></NaviButton>
                    <NaviButton disabled={page === pages} onClick={() => dispatch(changePage(pages))}><LastPage /></NaviButton>
                </span>
            </div>}
        </>
    );
}

const NaviButton = withStyles({
    root: {
        minWidth: '0',
        maxWidth: '30px',
        maxHeight: '50px'
    }
})(props => <Button {...props} />);