import { useEffect, useState } from "react";
import { getMyWinnings } from "../../services/drawService";

function Results()
{
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() =>
  {
    fetchData();
  }, []);

  const fetchData = async () =>
  {
    const res = await getMyWinnings(token);
    setData(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">My Winnings</h1>

      {data.length === 0 && (
        <p className="text-gray-400">No winnings yet</p>
      )}

      {data.map((w) => (
        <div
          key={w.id}
          className="bg-gray-900 p-4 rounded-xl mb-4"
        >
          <p>Matches: {w.match_count}</p>
          <p className="text-green-400">
            Prize: ₹{w.prize_amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Results;