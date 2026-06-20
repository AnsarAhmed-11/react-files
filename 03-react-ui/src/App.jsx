import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './Components/NavBar'
import About from './Components/About'
import Courses from './Components/Courses'
import Feedback from './Components/Feedback'
import Buttons from './Components/Buttons' 
import HomeNew from './Components/HomeNew'

const App = () => {
  const location = useLocation();
  return (
    <>
    <Buttons />
      <NavBar />
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomeNew />} />
        <Route path='/About' element={<About />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/About' element={<About />} />
        <Route path='/Feedback' element={<Feedback />} />
        <Route path='/Btn' element={<Buttons />} />
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default App
