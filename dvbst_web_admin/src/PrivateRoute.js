import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  
  const {token} = useSelector((state) => state.authState)

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
