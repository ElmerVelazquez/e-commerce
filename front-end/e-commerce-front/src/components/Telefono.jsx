import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Buscador from './Buscador';
import ProductDetail from './ProductDetail';

// Crear el contexto para el carrito de compras
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(product => product.id !== productId));
    };

    const totalPrice = cart.reduce((total, product) => total + parseFloat(product.price.replace('RD$', '').replace(',', '')), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// Componente de la barra de navegación
const Navbar = ({ onSearch }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex bg-red-600 p-8 justify-between items-center">
            <h1 className="text-white text-2xl font-bold">
                <a href="/">LincolnTech</a>
            </h1>
            <Buscador onSearch={onSearch} />
            <div className="flex items-center space-x-10 relative">
                <FaShoppingCart className="text-white text-2xl" />
                <FaUser className="text-white text-2xl cursor-pointer" onClick={toggleUserMenu} />
                {isUserMenuOpen && (
                    <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Iniciar Sesión</a>
                        <a href="/registro" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Registrarse</a>
                    </div>
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

// Componente para representar una tarjeta de teléfono
const TelefonoCard = ({ telefono }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <Link to={`/product/${telefono.id}`} className="relative border rounded-lg p-4 shadow-md block hover:shadow-lg transition-shadow duration-200">
            <div className="w-full h-32 mb-4 flex items-center justify-center">
                <img src={telefono.urlImg} alt={telefono.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-semibold">{telefono.name}</h3>
            <p className="text-sm">{telefono.description}</p>
            <p className="text-md font-bold mt-2">RD$ {telefono.price.toLocaleString('en-US')}</p>
            <FaShoppingCart 
                className="absolute bottom-4 right-4 text-black text-3xl cursor-pointer" 
                onClick={(e) => { 
                    e.preventDefault(); 
                    addToCart(telefono); 
                }} 
            />
        </Link>
    );
};

TelefonoCard.propTypes = {
    telefono: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        urlImg: PropTypes.string.isRequired,
    }).isRequired,
};

// Componente principal que maneja el estado y renderiza los teléfonos con el menú lateral
function Telefono() {
    const [searchResults, setSearchResults] = useState([]);
    const [initialProducts, setInitialProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9; // Máximo 9 productos por página

    useEffect(() => {
        fetch(import.meta.env.VITE_API_PRODUCT_URL) // Cambia la URL por la de tu API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.isSuccess) {
                    // Verificar que los productos existan y estén definidos
                    const allProducts = data.value || [];
                    const phoneProducts = allProducts.filter(product => product.categoryId === 2);                    
                    setInitialProducts(phoneProducts);
                    setSearchResults(phoneProducts);
                } else {
                    throw new Error(data.errorMessage);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        const results = initialProducts.filter(telefono =>
            telefono.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            telefono.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setCurrentPage(1); // Resetear a la primera página en cada búsqueda
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Obtener los productos actuales
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Mostrar el mensaje de error
    }

    return (
        <CartProvider>
            <Navbar onSearch={handleSearch} />
            <div className="flex">
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-4">Teléfonos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {currentProducts.map(telefono => (
                            <TelefonoCard key={telefono.id} telefono={telefono} />
                        ))}
                    </div>
                    {searchResults.length > productsPerPage && (
                        <div className="flex justify-center mt-8">
                            <nav>
                                <ul className="pagination flex">
                                    {Array.from({ length: Math.ceil(searchResults.length / productsPerPage) }, (_, i) => (
                                        <li key={i} className="page-item mx-1">
                                            <button
                                                onClick={() => paginate(i + 1)}
                                                className={`px-4 py-2 border rounded ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </CartProvider>
    );
}

export default Telefono;
