import React, { useState, useEffect, useContext, useRef } from 'react'; // Importar useRef
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaShoppingCart, FaUser, FaTrash } from 'react-icons/fa';
import { CardContext } from './CardContext'; // Importa el contexto del carrito

const MySwal = withReactContent(Swal);

// Componente de la barra de navegación
const Navbar = ({ onSearch }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const userMenuRef = useRef(null);
    const cartRef = useRef(null);
    const { cart, removeFromCart, totalPrice } = useContext(CardContext);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
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
            <input
                type="text"
                placeholder="Buscar laptops..."
                onChange={(e) => onSearch(e.target.value)}
                className="p-2 rounded-md"
            />
            <div className="flex items-center space-x-10 relative">
                <div className="relative">
                    <FaShoppingCart className="text-white text-2xl cursor-pointer" onClick={toggleCart} />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>
                    )}
                    {isCartOpen && (
                        <div ref={cartRef} className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-10">
                            <h2 className="text-lg font-bold mb-2">Carrito de Compras</h2>
                            {cart.length === 0 ? (
                                <p className="text-gray-700">Tu carrito está vacío</p>
                            ) : (
                                <div>
                                    {cart.map(product => (
                                        <div key={product.id} className="flex justify-between items-center mb-2">
                                            <img src={product.urlImg} alt={product.name} className="w-16 h-16 object-cover" />
                                            <div className="flex-1 ml-2">
                                                <h3 className="text-sm font-semibold">{product.name}</h3>
                                                <p className="text-sm">{product.price}</p>
                                            </div>
                                            <FaTrash className="text-red-600 cursor-pointer" onClick={() => removeFromCart(product.id)} />
                                        </div>
                                    ))}
                                    <div className="text-right mt-2 font-bold">
                                        Total: RD$ {totalPrice.toFixed(2)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
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

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const { addToCart } = useContext(CardContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_PRODUCT_URL}/${id}`);
                const data = await response.json();
                setProduct(data.value);

                // Fetch similar products based on category
                const similarResponse = await fetch(`${import.meta.env.VITE_API_PRODUCT_URL}?categoryId=${data.value.categoryId}`);
                const similarData = await similarResponse.json();
                setSimilarProducts(similarData.value.filter(item => item.id !== data.value.id).slice(0, 5)); // Limitar a 5 productos
            } catch (error) {
                console.error('Error fetching product details:', error);
                MySwal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los detalles del producto',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Navbar onSearch={() => {}} /> {/* Puedes ajustar la función de búsqueda según sea necesario */}
            <div className="container mx-auto p-4">
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <img src={product.urlImg} alt={product.name} className="w-full h-auto object-contain" />
                        <div className="flex space-x-4 mt-4">
                            {/* Aquí podrías agregar más imágenes del producto */}
                            <img src={product.urlImg} alt={product.name} className="w-1/4 h-auto object-contain" />
                            <img src={product.urlImg} alt={product.name} className="w-1/4 h-auto object-contain" />
                            <img src={product.urlImg} alt={product.name} className="w-1/4 h-auto object-contain" />
                        </div>
                    </div>
                    <div className="w-1/2 p-4">
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <p className="mb-4">{product.description}</p>
                        <p className="text-2xl font-bold mb-4">RD${product.price}</p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => addToCart(product)} // Agrega al carrito
                            >
                                Agregar al carrito
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                                Ir a comprar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Artículos similares</h2>
                    <div className="flex space-x-4">
                        {similarProducts.map(similarProduct => (
                            <div key={similarProduct.id} className="border p-4 rounded flex flex-col">
                                <h3 className="text-lg font-bold mb-2">{similarProduct.name}</h3>
                                <img src={similarProduct.urlImg} alt={similarProduct.name} className="w-full h-32 object-contain mb-2" />
                                <p className="mb-2">RD${similarProduct.price}</p>
                                <Link to={`/product/${similarProduct.id}`} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-auto text-center">
                                    Ver detalles
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
