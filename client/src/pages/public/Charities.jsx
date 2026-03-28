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
    await selectCharity({ charity_id: selected, percentage }, token);
    alert("Updated!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Charities</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {charities.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800"
          >
            <h3 className="text-xl text-blue-400">{c.name}</h3>
            <p className="text-gray-400 mt-2">{c.description}</p>

            <button
              onClick={() => setSelected(c.id)}
              className="mt-4 bg-blue-500 px-4 py-2 rounded"
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
        <button
          onClick={handleSelect}
          className="ml-4 bg-green-500 px-4 py-2 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Charities;