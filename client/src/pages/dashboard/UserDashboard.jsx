function UserDashboard()
{
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-3xl">Welcome, {user?.name}</h1>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-4 rounded-xl">Scores</div>
        <div className="bg-gray-900 p-4 rounded-xl">Subscription</div>
        <div className="bg-gray-900 p-4 rounded-xl">Winnings</div>
      </div>
    </div>
  );
}

export default UserDashboard;