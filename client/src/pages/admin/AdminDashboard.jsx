import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard()
{
  const [charities, setCharities] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const fetchCharities = async () =>
  {
    const res = await API.get("/charities");
    setCharities(res.data);
  };

  useEffect(() =>
  {
    fetchCharities();
  }, []);

  const createCharity = async () =>
  {
    await API.post(
      "/charities",
      { name },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setName("");
    fetchCharities();
  };

  const deleteCharity = async (id) =>
  {
    await API.delete(`/charities/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchCharities();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <h3>Create Charity</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Charity name"
      />
      <button onClick={createCharity}>Add</button>

      <h3>All Charities</h3>
      {charities.map((c) => (
        <div key={c.id}>
          {c.name}
          <button onClick={() => deleteCharity(c.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;