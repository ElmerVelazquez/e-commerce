import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Asegúrate de importar tu contexto de autenticación

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
