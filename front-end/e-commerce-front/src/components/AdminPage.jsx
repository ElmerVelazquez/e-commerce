import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function AdminPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        if (!user || user.rol != 'admin') {
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
        // Fetch 
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL);
                const data = await response.json();
                setProducts(data.value);
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
                },
                body: JSON.stringify(newProduct),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Error agregando producto');
            }
    
            const responseData = await response.json();
            const addedProduct = responseData.value[0]; // Assuming you only add one product at a time
    
            setProducts([...products, addedProduct]);
            setNewProduct({ name: '', price: '', description: '' });
    
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

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
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
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Agregar productos
                </button>
            </form>
            <h2 className="text-xl font-bold mb-2">Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} className="mb-2 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-gray-700">${product.price}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPage;
