import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de contexto para manejar la autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Revisar si hay un usuario en localStorage al montar el componente
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Función para realizar el login
    const login = async (email, password) => {
        const loginUrl = import.meta.env.VITE_API_LOGIN_URL;

        if (!loginUrl) {
            console.error('VITE_API_LOGIN_URL no está definida en el archivo .env');
            MySwal.fire({
                title: 'Error',
                text: 'URL de login no definida',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                MySwal.fire({
                    title: 'Error',
                    text: data.errorMessage || 'Error al iniciar sesión',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);

            // Redirigir según el rol del usuario
            if (data.rol === 'admin') {
                navigate('/admin'); // Redirige al admin a la página AdminPage
            } else {
                navigate('/'); // Redirige al usuario regular al home
            }

            MySwal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error en el login', error);
            MySwal.fire({
                title: 'Error',
                text: 'Error al realizar la solicitud',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Función para realizar el logout
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
        MySwal.fire({
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
