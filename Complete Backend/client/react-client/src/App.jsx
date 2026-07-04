
import Form from "./Components/Form";
import { Route, Routes } from "react-router-dom";
import Data from "./Components/Data";
const App = () => {

  return (
    <div> 
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="/data" element={<Data/>}/>
    </Routes>
    </div>
  );
};

export default App;