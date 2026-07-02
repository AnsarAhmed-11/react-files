import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Components/Form";
import { Route, Routes } from "react-router-dom";
import Data from "./Components/Data";
const App = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/users");
//         setUsers(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);
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