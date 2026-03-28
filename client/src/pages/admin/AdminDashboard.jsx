import { runDraw } from "../../services/drawService";

function AdminDashboard()
{
  const token = localStorage.getItem("token");

  const handleRunDraw = async () =>
  {
    try
    {
      await runDraw(token);
      alert("Draw executed!");
    }
    catch (err)
    {
      alert("Error running draw");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-red-400 mb-6">
        Admin Panel
      </h1>

      <button
        onClick={handleRunDraw}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Run Draw
      </button>
    </div>
  );
}

export default AdminDashboard;