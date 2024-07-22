import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import './index.css';
import Laptos from './components/Laptos';
import Telefono from './components/Telefono';
import Accesorios from './components/Accesorios';
import Desktop from './components/Desktop';
import CartPage from './components/CartPage';
import AdminPage from './components/AdminPage';
import { CardContextProvider } from './components/CardContext';
import { AuthProvider } from './contexts/AuthContext'; // Importa el proveedor de AuthContext
import OlvidarContrasena from './components/OlvidarContrasena';
import EnviarCodigo from './components/EnviarCodigo';
import ConfirmarCodigo from './components/ConfirmarCodigo';

function App() {
    return (
        <div className='App'>
            <Router>
                <AuthProvider> {/* Proveedor de contexto de autenticación */}
                    <CardContextProvider> {/* Proveedor de contexto de carrito */}
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/registro' element={<Registro />} />
                            <Route path='/laptos' element={<Laptos />} />
                            <Route path='/telefono' element={<Telefono />} />
                            <Route path='/accesorios' element={<Accesorios />} />
                            <Route path='/desktop' element={<Desktop />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/adminpage' element={<AdminPage />} />
                            <Route path='/olvidarcontrasena' element={< OlvidarContrasena />} />
                            <Route path='/enviarcodigo' element={<EnviarCodigo />} />
                            <Route path='confirmarCodigo' element={<ConfirmarCodigo />} />
                        </Routes>
                    </CardContextProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
