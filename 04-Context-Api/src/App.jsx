import { Routes,Route } from 'react-router-dom'
import Navbar from './Navbar'
import Nav2 from './Nav2'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/nav2' element={<Nav2/>}/>
      </Routes>
    </div>
  )
}

export default App
