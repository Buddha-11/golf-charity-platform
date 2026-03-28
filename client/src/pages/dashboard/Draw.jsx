import { useEffect, useState } from "react";
import { getLatestDraw, getWinners } from "../../services/drawService";

function Draw()
{
  const [draw, setDraw] = useState(null);
  const [winners, setWinners] = useState([]);

  useEffect(() =>
  {
    fetchData();
  }, []);

  const fetchData = async () =>
  {
    const d = await getLatestDraw();
    const w = await getWinners();

    setDraw(d.data);
    setWinners(w.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Latest Draw</h1>

      {draw && (
        <div className="flex gap-3">
          {draw.numbers.map((n, i) => (
            <div key={i} className="bg-blue-500 px-4 py-2 rounded">
              {n}
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-6 text-xl">Winners</h2>

      {winners.map((w) => (
        <div key={w.id}>
          User: {w.user_id} → Matches: {w.match_count}
        </div>
      ))}
    </div>
  );
}

export default Draw;