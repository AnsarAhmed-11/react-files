import { SunMoon } from "lucide-react"
import { useState ,useContext} from "react"
import { Link } from "react-router-dom"
import { ThemeDataContext } from "./ThemeContext"

const Nav2 = () => {
     const {theme,setTheme}=useContext(ThemeDataContext)
        function changeTheme(){
            setTheme(theme=='dark'?'light':'dark')
        }
  return (
    <div className={theme}>
      <h1>this is Nav 2</h1>
      <h1 onClick={changeTheme}><SunMoon/></h1>
    </div>
  )
}
export default Nav2 
