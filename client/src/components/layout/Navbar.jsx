import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar()
{
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    logout();
    navigate("/"); // optional redirect
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800">
      <h1 className="text-xl font-bold text-blue-400">
        Golf Charity
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/charities">Charities</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;