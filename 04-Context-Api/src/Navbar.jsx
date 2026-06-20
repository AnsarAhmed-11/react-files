import { SunMoon } from "lucide-react"
import { useState ,useContext} from "react"
import { Link } from "react-router-dom"
import { ThemeDataContext } from "./ThemeContext"

const Navbar = () => {
   
    const {theme,setTheme}=useContext(ThemeDataContext)
    function changeTheme(){
        setTheme(theme=='dark'?'light':'dark')
    }
  return (
    <div>
      <nav className={theme}>
        <h1>Home</h1>   
        <h1>About</h1>
        <h1>Course</h1>
        <h1>{theme}</h1>
        <h1 onClick={changeTheme}><SunMoon /></h1>
      </nav>
    </div>
  )
}

export default Navbar
