import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = searchParams.get('email');
    const code = searchParams.get('code');

    if (email && code) {
      axios.post(import.meta.env.VITE_API_CHECKCODE_URL, { email, code })
        .then(response => {
          if (response.status === 200) {
            setMessage('Verificación exitosa. ¡Gracias!');
          } else {
            setMessage('Código de verificación incorrecto.');
          }
        })
        .catch(() => {
          setMessage('Hubo un error al verificar el código.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessage('Faltan parámetros en la URL.');
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-gray-700 text-center">Cargando...</p>
        ) : (
          <p className={`text-center ${message.includes('exitosa') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;