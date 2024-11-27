import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const idAdmin = true;
  return <div>{idAdmin ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default AdminProtectedRoutes;
