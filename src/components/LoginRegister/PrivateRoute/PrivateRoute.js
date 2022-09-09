import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

function PrivateRoute({ children }) {
  const { user, isLoading } = UseAuth();
  let location = useLocation();
  //   useEffect(() => {
  //     fetch(`https://books-library-server.vercel.app/user?email=${user.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const accessToken = data.token;
  //         localStorage.setItem("accessToken", accessToken);
  //         // setToken(accessToken);
  //       });
  //   }, [user]);
  if (isLoading) {
    return (
      <div className="spinner text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (user.email === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
