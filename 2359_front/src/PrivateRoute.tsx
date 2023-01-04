import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRouteProps } from 'types/interfaces';
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */

function PrivateRoute({ authentication }: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = localStorage.getItem('token');

  if (authentication) {
    return isAuthenticated === null || isAuthenticated === 'false' ? <Navigate to="/login" /> : <Outlet />;
  }
  return isAuthenticated === null || isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
