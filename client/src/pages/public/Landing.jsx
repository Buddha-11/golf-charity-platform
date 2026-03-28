import { Link } from "react-router-dom";

function Landing()
{
  return (
    <div style={{ padding: "40px" }}>
      <h1>Golf Charity Platform</h1>
      <p>Play. Win. Give Back.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/subscribe">Subscribe</Link> |{" "}
        <Link to="/charities">Charities</Link> |{" "}
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Landing;