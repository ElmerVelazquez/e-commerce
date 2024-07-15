import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const categories = {
    1: 'Laptops',
    2: 'Teléfonos',
    3: 'Desktops',
    4: 'Accesorios'
};

function AdminPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', stock: 0, urlImg: '', categoryId: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (!user || user.rol !== 'admin') {
            MySwal.fire({
                title: 'Acceso Denegado',
                text: 'No tienes permiso para acceder a esta página',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login');
            });
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL);
                const data = await response.json();
                setProducts(data.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL, {
                method: 'POST',
                headers: {       
                    'Content-Type': 'application/json',             
                    'Authorization': 'bearer ' + user.token,
                },
                body: JSON.stringify(newProduct),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Error agregando producto');
            }
    
            const responseData = await response.json();
            const addedProduct = responseData.value;
    
            setProducts([addedProduct, ...products]);
            setNewProduct({ name: '', description: '', price: 0, stock: 0, urlImg: '', categoryId: '' });
            
            MySwal.fire({
                title: 'Éxito',
                text: 'Producto añadido con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error agregando productos:', error);
            MySwal.fire({
                title: 'Error',
                text: 'No se pudo añadir el producto',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_PRODUCT_URL}/${productId}`, {
                method: 'DELETE',
                headers: {       
                    'Content-Type': 'application/json',             
                    'Authorization': 'bearer ' + user.token,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar producto');
            }

            setProducts(products.filter(product => product.id !== productId));

            MySwal.fire({
                title: 'Éxito',
                text: 'Producto eliminado con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            MySwal.fire({
                title: 'Error',
                text: 'No se pudo eliminar el producto',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = selectedCategory
        ? products.filter(product => product.categoryId === Number(selectedCategory))
        : products;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex">
            <div className="w-1/5 bg-gray-200 p-4">
                <h2 className="text-lg font-bold mb-2">Categorías</h2>
                <ul>
                    {Object.entries(categories).map(([id, name]) => (
                        <li key={id} className="mb-2">
                            <button
                                onClick={() => {
                                    setSelectedCategory(id);
                                    setCurrentPage(1);
                                }}
                                className={`w-full text-left px-2 py-1 ${selectedCategory === id ? 'bg-red-500 text-white' : 'hover:bg-gray-300'}`}
                            >
                                {name}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => {
                                setSelectedCategory('');
                                setCurrentPage(1);
                            }}
                            className={`w-full text-left px-2 py-1 ${selectedCategory === '' ? 'bg-red-500 text-white' : 'hover:bg-gray-300'}`}
                        >
                            Todos
                        </button>
                    </li>
                </ul>
            </div>
            <div className="w-4/5 p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Página del administrador</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Ir a productos
                    </button>
                </div>
                <form onSubmit={handleAddProduct} className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Agregar nuevos productos</h2>
                    <div className="mb-2">
                        <label className="block text-gray-700">Nombre del producto</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Precio</label>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">URL de la imagen</label>
                        <input
                            type="text"
                            value={newProduct.urlImg}
                            onChange={(e) => setNewProduct({ ...newProduct, urlImg: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Categoría</label>
                        <select
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {Object.entries(categories).map(([id, name]) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Agregar Producto
                    </button>
                </form>
                <div>
                    <h2 className="text-xl font-bold mb-2">Productos</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {currentProducts.map((product) => (
                            <li key={product.id} className="border p-4 rounded flex flex-col">
                                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                <img src={product.urlImg} alt={product.name} className="w-full h-48 object-contain mb-2" />
                                <p className="flex-grow mb-2">{product.description}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span><strong>Precio:</strong> ${product.price}</span>
                                    <span><strong>Stock:</strong> {product.stock}</span>
                                </div>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-auto"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center mt-4">
                        <nav>
                            <ul className="inline-flex items-center">
                                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => paginate(i + 1)}
                                            className={`px-3 py-1 border ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:bg-red-300'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
