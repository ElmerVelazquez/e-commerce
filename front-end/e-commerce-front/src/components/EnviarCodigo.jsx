import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

function EnviarCodigo() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí deberías agregar la lógica para enviar el código al correo
        MySwal.fire({
            title: 'Éxito',
            text: 'Se ha enviado un código a tu correo',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redirige al usuario a la página de restablecer contraseña después de enviar el código
            navigate('/olvidar-contraseña');
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

            {/* Sección principal de la página de enviar código */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-2 text-center">Ayuda con la contraseña</h2>
                    <p className="mb-6 text-center text-gray-600">
                        Por favor, introduce tu correo electrónico para recibir un código de verificación y restablecer tu contraseña.
                    </p>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de entrada para el correo electrónico */}
                        <div className="mb-4 flex items-center">
                            <label htmlFor="email" className="block text-gray-700">
                                <AiOutlineMail className="text-gray-600 text-xl" />
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
                        {/* Botón de envío del formulario */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
                            >
                                Enviar correo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EnviarCodigo;
