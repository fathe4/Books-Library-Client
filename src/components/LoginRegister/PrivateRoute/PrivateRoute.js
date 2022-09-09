import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

function PrivateRoute({ children }) {
  const { user, isLoading, logout } = UseAuth();

  let location = useLocation();
  if (isLoading) {
    return (
      <div className="spinner text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  console.log(isLoading);
  if (user.email === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (localStorage.getItem("accessToken") === null) {
    logout();
  }
  return children;
}

export default PrivateRoute;
