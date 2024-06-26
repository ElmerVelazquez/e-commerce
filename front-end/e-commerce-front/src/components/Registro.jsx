import React, { useState } from 'react';

function Registro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            });

            if (response.ok) {
                console.log('Usuario registrado con éxito');
        
            } else {
                const data = await response.json();
                setError(data.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error al registrarse', error);
            setError('Error al registrarse');
        }
    };

    return (
        <>
            {/* Sección de la parte superior o NavBar */}
            <div className="flex bg-red-600 p-4 justify-between">
                <h1 className="text-white text-2xl font-bold">
                    <a href="/">LincolnTech</a>
                </h1>
                <h2 className="text-white font-bold mt-6">
                    <a href="/login">Iniciar Sesión</a>
                </h2>
            </div>

            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Sección del nombre */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Escribe tu nombre"
                                className="w-full px-3 py-2 border rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        {/* Sección del correo */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Correo</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Escribe tu correo"
                                className="w-full px-3 py-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {/* Sección del número */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">Número</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Escribe tu número"
                                className="w-full px-3 py-2 border rounded"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        {/* Sección de la contraseña */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                className="w-full px-3 py-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* Sección de repetir contraseña */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Repetir Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repite tu contraseña"
                                className="w-full px-3 py-2 border rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <div className="mb-4 text-red-500 text-center">
                                {error}
                            </div>
                        )}
                        {/* Sección del botón */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </>
    );
}

export default Registro;
