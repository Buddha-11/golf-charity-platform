import { Routes, Route } from "react-router-dom";

// Public
import Landing from "../pages/public/Landing";
import Charities from "../pages/public/Charities";
import Subscribe from "../pages/public/Subscribe";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Dashboard
import UserDashboard from "../pages/dashboard/UserDashboard";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import Scores from "../pages/dashboard/Scores";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
<Route path="/scores" element={<Scores />} />
function AppRoutes()
{
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/charities" element={<Charities />} />
      <Route path="/subscribe" element={<Subscribe />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <UserDashboard />
            </ProtectedRoute>
        }
        />

        <Route
        path="/scores"
        element={
            <ProtectedRoute>
            <Scores />
            </ProtectedRoute>
        }
        />

        <Route
        path="/admin"
        element={
            <AdminRoute>
            <AdminDashboard />
            </AdminRoute>
        }
        />
    </Routes>
  );
}

export default AppRoutes;