import { useState } from "react";
import { signup } from "../../services/authService";

function Signup()
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () =>
  {
    await signup({ name, email, password });
    alert("Signup done");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 p-8 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Signup</h2>

        <input className="w-full p-2 mb-3 bg-gray-800 rounded" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input className="w-full p-2 mb-3 bg-gray-800 rounded" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 mb-3 bg-gray-800 rounded" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full bg-blue-500 py-2 rounded" onClick={handleSubmit}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;