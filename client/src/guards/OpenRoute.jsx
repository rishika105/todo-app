import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
    return <Navigate to="/my-todos" replace />;
  }

  return children;
}

export default OpenRoute;
