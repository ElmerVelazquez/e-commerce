import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock, AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar contraseña
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Usa el hook useAuth para obtener la función login

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(email, password); // Llama a la función login del contexto de autenticación
        } catch (err) {
            setError('Error al realizar la solicitud');
            MySwal.fire({
                title: 'Error',
                text: 'Error al realizar la solicitud',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Cambia el estado para mostrar u ocultar contraseña
    };

    return (
        <>
            {/* Sección del navbar */}
            <div className="flex bg-red-600 py-4 px-6 justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    <a href="/">LincolnTech</a>
                </h1>
                <h2 className="text-white font-bold">
                    <a href="/registro">Registrarse</a>
                </h2>
            </div>

            {/* Sección principal de la página de inicio de sesión */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="mb-4 flex items-center">
                            <label htmlFor="email" className="block text-gray-700">
                                <AiOutlineUser className="text-gray-600 text-xl" />
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Escribe tu correo"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Correo Electrónico"
                            />
                        </div>
                        {/* Campo de entrada para la contraseña */}
                        <div className="mb-6 relative flex items-center">
                            <label htmlFor="password" className="block text-gray-700">
                                <AiOutlineLock className="text-gray-600 text-xl" />
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'} // Mostrar contraseña si showPassword es true
                                id="password"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Contraseña"
                            />
                            {/* Botón para mostrar u ocultar contraseña */}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <AiOutlineEyeInvisible className="text-gray-600 text-xl" /> : <AiFillEye className="text-gray-600 text-xl" />}
                            </button>
                        </div>
                        {/* Sección para mostrar mensajes de error */}
                        {error && (
                            <div className="mb-4 text-red-500 text-center">
                                {error}
                            </div>
                        )}
                        {/* Botón de envío del formulario */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    {/* Enlace para recuperar contraseña */}
                    <div className="text-center">
                        <a href="#" className="text-black">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
