import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  
  const {token} = useSelector((state) => state.authState)

  return token ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;
