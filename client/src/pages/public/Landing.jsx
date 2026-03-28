import { Link } from "react-router-dom";

function Landing()
{
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-blue-400">
        Play. Win. Give Back.
      </h1>

      <p className="mt-4 text-gray-400 max-w-xl">
        Track your golf performance, win prizes every month, and support charities.
      </p>

      <div className="mt-6 space-x-4">
        <Link
          to="/subscribe"
          className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Get Started
        </Link>

        <Link
          to="/charities"
          className="border border-gray-700 px-6 py-3 rounded-lg"
        >
          Explore Charities
        </Link>
      </div>
    </div>
  );
}

export default Landing;