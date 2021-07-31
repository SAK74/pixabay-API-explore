import { polish } from "./polish";

export const setLang = (lang, sentence) => {
    switch(lang){
        case 'pl': return polish.get(sentence);
        default: return sentence;
    }
}