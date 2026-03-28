import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children })
{
  const { user, loading } = useContext(AuthContext);

  // ⛔ WAIT until auth is loaded
  if (loading)
  {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;