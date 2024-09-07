import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  // If the user is not authenticated, redirect to login
  return auth ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
