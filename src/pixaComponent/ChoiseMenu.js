import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeImagetype, changeOrientation, changeSearch, reset, changeColor, changeLanguage } from "./fetchSlice";
import { ColorLabel, GoButton, Span } from "./styledComp";
import { setLang } from "./LANGUAGES/language";
import { FormControlLabel, Checkbox, Input, Fab } from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';
import { withStyles } from "@mui/styles";

export const ChoiceMenu = forwardRef((_, refForm) => {
    const { search, imageType, orientation, category, colors } = useSelector(state => state.fetch.params);
    const { lang } = useSelector(state => state.fetch);
    const [input, setInput] = useState(search);
    const dispatch = useDispatch();
    const [colorSelect, setColorSelect] = useState(colors.split(","));
    const colorDisable = colorSelect.some(val => val === "grayscale");

    const handleChange = ({ target: { id, value } }) => {
        switch (id) {
            case 'imageType': dispatch(changeImagetype(value)); break;
            case 'orientation': dispatch(changeOrientation(value)); break;
            case 'category': dispatch(changeCategory(value)); break;
            case 'input': setInput(value); break;
            case 'selLanguage': dispatch(changeLanguage(value)); break;
            default: throw new Error("NIeznany błąd...");
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
        } else colorSet = colorSelect.join(",");
        refForm.current.classList.remove("visible");
        dispatch(changeColor(colorSet));
    }

    const handleChecked = ({ target: { checked, value } }) => {
        if (checked) {
            setColorSelect(prev => {
                const temp = new Set(prev).add(value);
                return [...temp];
            });
        } else {
            setColorSelect(prev => {
                const temp = new Set(prev);
                temp.delete(value);
                return [...temp];
            });
        }
    }

    const colorMenu = [];
    const color = ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown'];
    for (let i = 0; i < color.length; i++) {
        const isSelected = colorSelect.some(val => val === color[i]);
        colorMenu[i] = <ColorLabel key={color[i]} value={color[i]} disabled={colorDisable}
            checked={isSelected} onChange={handleChecked} />;
    }

    const spanColor = colors.split(",").map(elem => !elem ? null : <Span key={elem} color={elem}></Span>);
    const contentColor = (!colors) ? setLang(lang, 'Color') : <span className="span-container">{spanColor}</span>;

    const handleReset = () => {
        setColorSelect([]);
        setInput("");
        dispatch(reset());
    }

    const categoriesList = ['backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health',
        'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 'sports', 'transportation',
        'travel', 'buildings', 'business', 'music'];
    const categoriesOptions = [];
    for (let i = 0; i < categoriesList.length; i++) categoriesOptions.push(
        <option key={i} value={categoriesList[i]}>{setLang(lang, categoriesList[i])}</option>
    );

    const disabledFilters = Boolean([search, imageType, orientation, category, colors].join(',') === ",all,all,all,");

    return (
        <div className="header">
            <div className="header_1stLine">
                <form onSubmit={handleSubmit}>
                    <div>
                        <img onClick={handleSubmit} src="\PNG\search.png" alt="search" />
                        <Input onInput={handleChange} id="input" color='secondary'
                            placeholder={setLang(lang, "looking words")} value={input}
                            autoComplete='off' inputProps={{ size: '15', spellCheck: false }}
                        />
                        {/* <input placeholder = {setLang(lang, "looking words")} onInput = {handleChange} id = "input" 
                            value = {input} size = "12" autoComplete = 'off'/>  */}
                    </div>
                    <span>
                        <TranslateIcon />
                        <select id="selLanguage" onChange={handleChange} value={lang}>
                            <option value="en">English</option>
                            <option value="pl">Polski</option>
                        </select>
                    </span>
                </form>

            </div>
            <div className="options">
                <select onChange={handleChange} id="imageType"
                    value={imageType}>
                    <option value='all'>{setLang(lang, 'Image type (all)')}</option>
                    <option value='photo'>{setLang(lang, 'photto')}</option>
                    <option value='illustration'>{setLang(lang, 'illustration')}</option>
                    <option value='vector'>{setLang(lang, 'vector')}</option>
                </select>
                <select onChange={handleChange} id="orientation" value={orientation}>
                    <option value='all'>{setLang(lang, 'Orientation (all)')}</option>
                    <option value='horizontal'>{setLang(lang, 'horizontal')}</option>
                    <option value='vertical'>{setLang(lang, 'vertical')}</option>
                </select>
                <select onChange={handleChange} id="category" value={category}>
                    <option value='all'>{setLang(lang, 'Category (all)')}</option>
                    {categoriesOptions}
                </select>
                <span className="color-container">
                    <span onClick={(ev) => { ev.stopPropagation(); refForm.current.classList.toggle("visible") }}>
                        {contentColor} &#9660;
                    </span>
                    <form className="formColor" onSubmit={handleColorSubmit} ref={refForm}>
                        {/* <label>
                                    <input type = "checkbox" value = "transparent" onChange = {handleChecked}
                                      checked = {colorSelect.some(val => val === "transparent")}/>
                                    &nbsp;{setLang(lang, 'Transparent')}
                                </label> */}
                        <FormControlLabel
                            control={<WhiteLabel value='transparent' onChange={handleChecked}
                                checked={colorSelect.some(val => val === "transparent")}
                                size='small'
                            />}
                            label={setLang(lang, 'Transparent')}
                        />
                        {/* <label>
                                    <input type = "checkbox" value = "grayscale" onChange = {ev => {
                                         handleChecked(ev);
                                         if(ev.target.checked) ev.target.parentNode.nextSibling.classList.add("hidden")
                                         else ev.target.parentNode.nextSibling.classList.remove("hidden");
                                        }} checked = {colorDisable}
                                     />
                                    &nbsp;{setLang(lang, 'Black & white')}
                                </label> */}
                        <FormControlLabel control={<WhiteLabel value="grayscale" onChange={ev => {
                            handleChecked(ev);
                            if (ev.target.checked) ev.target.parentNode.nextSibling.classList.add("hidden")
                            else ev.target.parentNode.nextSibling.classList.remove("hidden");
                        }}
                            checked={colorDisable}
                            size='small'
                        />}
                            label={setLang(lang, 'Black & white')}
                        />
                        <div className="color-select">
                            {colorMenu}
                        </div>
                        <GoButton>GO</GoButton>
                    </form>
                </span>
                <Fab variant='extended' color='default' onClick={handleReset} size='small'
                    disabled={disabledFilters}>
                    {setLang(lang, 'Reset all filters')}
                </Fab>
            </div>
        </div>
    );
});

const WhiteLabel = withStyles({
    root: {
        color: 'aliceblue',
        '&$checked': {
            color: 'aliceblue'
        }
    },
    checked: {}
})(props => <Checkbox {...props} />);