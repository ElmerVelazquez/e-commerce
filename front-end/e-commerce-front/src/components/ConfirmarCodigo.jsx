import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MySwal = withReactContent(Swal);

function ConfirmarCodigo() {
    const [codigo, setCodigo] = useState(''); 
    const navigate = useNavigate();
    const {email, setEmail} = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(JSON.stringify({ email: email, code: codigo }))
            const response = await fetch(import.meta.env.VITE_API_CHECKCODE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, code: codigo }),
            });
            
            const data = await response.json();
            if (response.ok) {
                MySwal.fire({
                    title: 'Éxito',
                    text: data.errorMessage || 'codigo verificado con exito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirige al usuario a la página de restablecer contraseña después de enviar el código
                    navigate('/OlvidarContrasena');
                });
            } 
            if (!response.ok) {
                MySwal.fire({
                    title: 'Error',
                    text: data.errorMessage || 'Error al confirmar el codigo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }                       

        } catch (error) {            
            MySwal.fire({
                title: 'Error',
                text: 'Error al confirmar el codigo',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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

            {/* Sección principal de la página de confirmar código */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-2 text-center">Confirmar Código</h2>
                    <p className="mb-6 text-center text-gray-600">
                        Por favor, introduce el código que hemos enviado a tu correo electrónico.
                    </p>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de entrada para el código */}
                        <div className="mb-4 flex items-center">
                            <label htmlFor="codigo" className="block text-gray-700">
                            </label>
                            <input
                                type="number"
                                id="codigo"
                                name="codigo"
                                placeholder="Escribe el código"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                                aria-label="Código de Verificación"
                            />
                        </div>
                        {/* Botón de envío del formulario */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
                            >
                                Confirmar Código
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ConfirmarCodigo;
