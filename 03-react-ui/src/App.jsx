import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import About from './Components/About'
import Courses from './Components/Courses'
import Feedback from './Components/Feedback'
import Buttons from './Components/Buttons'
import HomeNew from './Components/HomeNew'
const App = () => {
  return (
    <div>
      <Buttons />
      <NavBar/>
      <Routes >
        <Route path='/' element={<HomeNew />} />
        <Route path='/About' element={<About />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/About' element={<About />} />
        <Route path='/Feedback' element={<Feedback />} />
        <Route path='/Btn' element={<Buttons />} />
      </Routes>
    </div>
  )
}

export default App
