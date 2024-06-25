import React,{ useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

function Login() {
    // Definición de estados para almacenar el correo, la contraseña y los mensajes de error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Función que maneja el envío del formulario de inicio de sesión
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validar que los campos de correo y contraseña no estén vacíos
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        // Simulación de una petición de inicio de sesión
        console.log('Iniciar sesión con', { email, password });

        // Limpiar el mensaje de error si la validación es exitosa
        setError('');
    };

    return (
        <>

            {/* Seccion del navbar */}

            {/* Sección de la parte superior o NavBar */}

            <div className="flex bg-red-600 p-4 justify-between">
                <h1 className="text-white text-2xl font-bold">
                    <a href="/">LincolnTech</a>
                </h1>
                <h2 className="text-white font-bold mt-6">
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
                        <div className="mb-6 flex items-center">
                            <label htmlFor="password" className="block text-gray-700">
                                <AiOutlineLock className="text-gray-600 text-xl" />
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                className="w-full px-3 py-2 ml-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Contraseña"
                            />
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
