
import Form from "./Components/Form";
import { Route, Routes } from "react-router-dom";
import Data from "./Components/Data";
import Update from "./Components/update";
const App = () => {

  return (
    <div> 
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="/data" element={<Data/>}/>
      <Route path="/update" element={<Update/>}/>
    </Routes>
    </div>
  );
};

export default App;