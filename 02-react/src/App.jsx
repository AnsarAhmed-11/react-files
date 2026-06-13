import Api from './Components/Api/Api'
import State from './Components/State'
import {Route,Routes} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Api/>}/>
        <Route path='/state' element={<State/>}/>
      </Routes>
    </div>
  )
};

export default App;