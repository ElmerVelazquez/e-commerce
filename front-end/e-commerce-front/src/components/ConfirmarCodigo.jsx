import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

function ConfirmarCodigo() {
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        MySwal.fire({
            title: 'Éxito',
            text: 'Código verificado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redirige al usuario a la página de restablecer contraseña después de verificar el código
            navigate('/olvidarcontrasena');
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

            {/* Sección principal de la página de confirmar código */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-2 text-center">Confirmar Código</h2>
                    <p className="mb-6 text-center text-gray-600">
                        Por favor, introduce el código que has recibido en tu correo electrónico.
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
