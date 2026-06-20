import { createContext, useState } from "react"
import { createRoot } from "react-dom/client"

export const ThemeDataContext = createContext()

const ThemeContext = ({children}) => {
const [theme,setTheme]=useState('dark')
    return (
        <div>
            <ThemeDataContext.Provider value={{theme,setTheme}}>
            {children}
            </ThemeDataContext.Provider>
        </div>
    )
}

export default ThemeContext
