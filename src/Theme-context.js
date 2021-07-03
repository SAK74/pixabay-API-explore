import { createContext } from "react";

export const content = {
    blue: {font: 'blue', border: 'yellow'},
    red: {font: 'red', border: 'black'}
}
export const MyContent = createContext({styl: content.blue, change: () => {}});

