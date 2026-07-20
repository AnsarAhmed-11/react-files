
import Form from "./Components/Form";
import { Route, Routes} from "react-router-dom";
import Data from "./Components/Data";
import Delete from "./Components/Delete";
import Update from "./Components/Update";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile";
import Login from "./Components/Login";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/data" element={<Data />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Profile" element={<Profile/>} />
        </Route>
        <Route path="*" element={<h1>ERROR 404 | Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;