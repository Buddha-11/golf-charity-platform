import { useState } from "react";
import { signup } from "../../services/authService";

function Signup()
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () =>
  {
    try
    {
      await signup({ name, email, password });
      alert("Signup successful");
    }
    catch (err)
    {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /><br /><br />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br /><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br /><br />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

export default Signup;