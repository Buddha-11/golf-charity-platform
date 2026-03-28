import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async () =>
  {
    try
    {
      const res = await login({ email, password });
      loginUser(res.data);
      alert("Login successful");
    }
    catch (err)
    {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br /><br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /><br /><br />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;