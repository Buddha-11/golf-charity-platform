import { useEffect, useState } from "react";
import { getCharities, selectCharity } from "../../services/charityService";

function Charities()
{
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState("");
  const [percentage, setPercentage] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() =>
  {
    fetchData();
  }, []);

  const fetchData = async () =>
  {
    const res = await getCharities();
    setCharities(res.data);
  };

  const handleSelect = async () =>
  {
    try
    {
      await selectCharity(
        { charity_id: selected, percentage },
        token
      );
      alert("Charity updated!");
    }
    catch (err)
    {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Choose a Charity</h1>

      {charities.map((c) => (
        <div key={c.id} style={{ marginBottom: "20px" }}>
          <h3>{c.name}</h3>
          <p>{c.description}</p>

          <button onClick={() => setSelected(c.id)}>
            Select
          </button>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <h3>Contribution %</h3>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <br /><br />
        <button onClick={handleSelect}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

export default Charities;