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

      {/* User */}
      <Route path="/dashboard" element={<UserDashboard />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;