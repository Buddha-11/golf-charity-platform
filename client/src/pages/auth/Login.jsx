import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  if (user)
  {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async () =>
  {
    try
    {
      const res = await login({ email, password });
      loginUser(res.data);

      navigate("/dashboard"); // ✅ redirect after login
    }
    catch (err)
    {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 p-8 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;