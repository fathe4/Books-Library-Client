import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { isLoading, isUserLoading } = UseAuth();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  if (isLoading || isUserLoading) {
    return (
      <div className="spinner text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (
    (userDetails.email && userDetails.role.includes("CREATOR")) ||
    (userDetails.email && userDetails.role.includes("VIEWER"))
  ) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
