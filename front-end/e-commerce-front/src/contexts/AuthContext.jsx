import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from "jwt-decode";

const MySwal = withReactContent(Swal);

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto para manejar la autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Revisar si hay un usuario en localStorage al montar el componente
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            const userData = JSON.parse(storedUser);
            const decodedToken = jwtDecode(userData.token);

            // Verificar si el token ha expirado
            if (decodedToken.exp * 1000 < Date.now()) {
                // Token expirado, intentar renovar el token
                refreshAccessToken(userData.refreshToken);
            } else {
                setUser(userData);
            }
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

            MySwal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
            // Redirigir según el rol del usuario
            if (data.rol === 'admin') {
                navigate('/adminpage'); // Redirige al admin a la página AdminPage
            } else {
                navigate('/'); // Redirige al usuario regular al home
            }

            

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
    const refreshAccessToken = async (refreshToken) => {
        const refreshUrl = import.meta.env.VITE_API_REFRESH_URL; // URL para renovar el token

        try {
            const response = await fetch(refreshUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            const newData = await response.json();

            if (!response.ok) {
                // Manejar errores de renovación de token
                localStorage.removeItem('user');
                setUser(null);
                navigate('/login');
                MySwal.fire({
                    title: 'Error',
                    text: 'Error al renovar el token',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Actualizar el token de acceso en localStorage y en el estado
            localStorage.setItem('user', JSON.stringify(newData));
            setUser(newData);

            // Redirigir según el rol del usuario
            if (newData.rol === 'admin') {
                navigate('/adminpage');
            } else {
                navigate('/');
            }

            MySwal.fire({
                title: 'Éxito',
                text: 'Token renovado exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error al renovar el token', error);
            localStorage.removeItem('user');
            setUser(null);
            navigate('/login');
            MySwal.fire({
                title: 'Error',
                text: 'Error al renovar el token',
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
export default AuthContext;