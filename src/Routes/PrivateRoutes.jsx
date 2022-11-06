import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  // authorized so return child components
  return !token && <Navigate to="/" />;
};

export default PrivateRoutes;
