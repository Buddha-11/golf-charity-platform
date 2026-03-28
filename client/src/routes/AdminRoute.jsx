import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children })
{
  const { user, loading } = useContext(AuthContext);

  if (loading)
  {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin")
  {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;