// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // Estado local para almacenar el usuario actual
  const [currentUser, setCurrentUser] = useState(null);

  // Efecto para cargar el usuario actual al montar el componente
  useEffect(() => {
    // Simulamos la carga del usuario desde localStorage (puedes ajustar esta lógica según tu aplicación)
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Valor del contexto que proporcionará el estado de autenticación y funciones relacionadas
  const value = {
    currentUser,
    login,
    logout
  };

  // Renderizamos el proveedor del contexto de autenticación
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
