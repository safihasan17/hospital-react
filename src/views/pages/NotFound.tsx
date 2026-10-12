import { Link } from "react-router";

function NotFound() {
  return (
    <div className="min-vh-100 d-grid text-center p-4" style={{ placeItems: "center" }}>
      <div>
        <div className="display-1 fw-bold text-primary">404</div>
        <p className="lead">This page doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to dashboard</Link>
      </div>
    </div>
  );
}
export default NotFound;
