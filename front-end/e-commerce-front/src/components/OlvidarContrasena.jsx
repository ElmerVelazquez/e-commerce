import React, { useState } from 'react';
import {AiOutlineLock, AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function OlvidarContrasena() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            MySwal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        // Aquí deberías agregar la lógica para enviar los datos al servidor
        MySwal.fire({
            title: 'Éxito',
            text: 'Contraseña restablecida con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <>
            {/* Sección del navbar */}
            <div className="flex bg-red-600 py-4 px-6 justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    <a href="/">LincolnTech</a>
                </h1>
                <h2 className="text-white font-bold">
                    <a href="/login">Iniciar Sesión</a>
                </h2>
            </div>

            {/* Sección principal de la página de restablecimiento de contraseña */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de entrada para la nueva contraseña */}
                        <div className="mb-4 relative flex items-center">
                            <label htmlFor="newPassword" className="block text-gray-700">
                                <AiOutlineLock className="text-gray-600 text-xl" />
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                placeholder="Nueva contraseña"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                aria-label="Nueva Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <AiOutlineEyeInvisible className="text-gray-600 text-xl" /> : <AiFillEye className="text-gray-600 text-xl" />}
                            </button>
                        </div>
                        {/* Campo de entrada para confirmar la nueva contraseña */}
                        <div className="mb-6 relative flex items-center">
                            <label htmlFor="confirmPassword" className="block text-gray-700">
                                <AiOutlineLock className="text-gray-600 text-xl" />
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repetir contraseña"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                aria-label="Confirmar Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <AiOutlineEyeInvisible className="text-gray-600 text-xl" /> : <AiFillEye className="text-gray-600 text-xl" />}
                            </button>
                        </div>
                        {/* Botón de envío del formulario */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
                            >
                                Restablecer Contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OlvidarContrasena;
