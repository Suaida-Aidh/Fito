import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(Cookies.get('access_token')); // Checks if token is in cookies

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
