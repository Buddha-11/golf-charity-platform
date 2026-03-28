import { useState, useEffect } from "react";
import { addScore, getScores } from "../../services/scoreService";

function Scores()
{
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);

  const token = localStorage.getItem("token");

  const fetchScores = async () =>
  {
    const res = await getScores(token);
    setScores(res.data);
  };

  useEffect(() =>
  {
    fetchScores();
  }, []);

  const handleAdd = async () =>
  {
    await addScore({ score, date }, token);
    setScore("");
    setDate("");
    fetchScores();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Scores</h1>

      <input
        type="number"
        placeholder="Score (1–45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      /><br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br /><br />

      <button onClick={handleAdd}>Add Score</button>

      <h2 style={{ marginTop: "20px" }}>Latest Scores</h2>

      {scores.map((s) => (
        <div key={s.id}>
          {s.score} — {s.date}
        </div>
      ))}
    </div>
  );
}

export default Scores;