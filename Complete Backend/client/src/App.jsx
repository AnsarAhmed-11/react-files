
import Form from "./Components/Form";
import { Route, Routes } from "react-router-dom";
import Data from "./Components/Data";
import Delete from "./Components/Delete";
import Update from "./Components/Update";
const App = () => {

  return (
    <div> 
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="/data" element={<Data/>}/>
      <Route path="/Update" element={<Update/>}/>
      <Route path="/Delete" element={<Delete/>}/>
    </Routes>
    </div>
  );
};

export default App;