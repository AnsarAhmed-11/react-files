import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = true; // Replace with your actual authentication logic
    // Outlet is placeholder where child route rendered ,like  /Profile from update page
    //Navigate send to again "/" route is false condition

    /**replace works like this 
     * login->profile  to browser login ko remove kr dega jisse back press krne pr login pr nhi jaiga
    /*replace se login pr hi rahega 
     */
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace/>;
};

export default ProtectedRoute;