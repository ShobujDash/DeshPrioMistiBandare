import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContex";

const AdminProtectedRoutes = () => {
  const { user } = useAuthContext();
  const idAdmin = user?.isAdmin;
  
;
  return <div>{idAdmin ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default AdminProtectedRoutes;
