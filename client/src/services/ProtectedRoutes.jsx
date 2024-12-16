import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContex';

const ProtectedRoutes = () => {
  const { user } = useAuthContext();
  return (
    <div>
        {
            user ? <Outlet /> : <Navigate to={"/"} />
        }
    </div>
  )
}

export default ProtectedRoutes