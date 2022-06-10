import { createContext } from "react"

export interface ITheme {
    textColor: string,
    backgroundColor: string
}

export const themes = {
    light: {
        textColor: '#121212',
        backgroundColor: '#f8f9fa'
    },
    dark: {
        textColor: '#f8f9fa',
        backgroundColor: '#212529'
    }
}

export const ThemeContext = createContext<ITheme>(themes.light)