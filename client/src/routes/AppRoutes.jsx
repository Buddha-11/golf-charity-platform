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
import Scores from "../pages/dashboard/Scores";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";

// Routes
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Results from "../pages/dashboard/Results";

import Draw from "../pages/dashboard/Draw";
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

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
    <Route
    path="/draw"
    element={
        <ProtectedRoute>
        <Draw />
        </ProtectedRoute>
    }
    />
    <Route
    path="/results"
    element={
        <ProtectedRoute>
        <Results />
        </ProtectedRoute>
    }
    />
    </Routes>
        
  );
}

export default AppRoutes;