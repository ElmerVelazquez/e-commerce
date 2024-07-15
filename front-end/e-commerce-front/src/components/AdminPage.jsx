import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Mapeo de categoryId a nombres de categorías
const categories = {
    1: 'Laptops',
    2: 'Teléfonos',
    3: 'Desktops',
    4: 'Accesorios'
};

function AdminPage() {
    const { user } = useAuth(); // Obtener el usuario autenticado del contexto
    const navigate = useNavigate(); // Hook para la navegación
    const [products, setProducts] = useState([]); // Estado para los productos
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', stock: 0, urlImg: '', categoryId: '' }); // Estado para el nuevo producto
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual de paginación
    const productsPerPage = 9; // Número de productos por página

    // useEffect para redirigir si el usuario no es administrador
    useEffect(() => {
        if (!user || user.rol !== 'admin') {
            MySwal.fire({
                title: 'Acceso Denegado',
                text: 'No tienes permiso para acceder a esta página',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login'); // Redirigir a la página de login
            });
        }
    }, [user, navigate]);

    // useEffect para obtener los productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL);
                const data = await response.json();
                // Ordenar los productos por fecha de creación (más recientes primero)
                setProducts(data.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error('Error fetching products:', error); // Manejo de errores
            }
        };
        fetchProducts();
    }, []);

    // Manejo de la adición de nuevos productos
    const handleAddProduct = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL, {
                method: 'POST',
                headers: {       
                    'Content-Type': 'application/json',             
                    'Authorization': 'bearer ' + user.token,
                },
                body: JSON.stringify(newProduct), // Enviar el nuevo producto en el cuerpo de la solicitud
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Error agregando producto');
            }
    
            const responseData = await response.json();
            const addedProduct = responseData.value; // Asumiendo que solo se agrega un producto a la vez
    
            setProducts([addedProduct, ...products]); // Actualizar el estado con el nuevo producto
            setNewProduct({ name: '', description: '', price: 0, stock: 0, urlImg: '', categoryId: '' }); // Limpiar el formulario
            
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
    
    // Manejo de la eliminación de productos
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

            setProducts(products.filter(product => product.id !== productId)); // Actualizar el estado filtrando el producto eliminado

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

    // Paginación: determinar el índice de los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Página del administrador</h1>
            <form onSubmit={handleAddProduct} className="mb-4">
                <h2 className="text-xl font-bold mb-2">Agregar nuevos productos</h2>
                {/* Sección del nombre de producto */}
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
                {/* Sección de descripción */}
                <div className="mb-2">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {/* Sección de precio */}
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
                {/* Sección de stock */}
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
                {/* Sección de URL de imagen */}
                <div className="mb-2">
                    <label className="block text-gray-700">Url img</label>
                    <input
                        type="text"
                        value={newProduct.urlImg}
                        onChange={(e) => setNewProduct({ ...newProduct, urlImg: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {/* Sección de selección de categoría */}
                <div className="mb-2">
                    <label className="block text-gray-700">Categoría</label>
                    <select
                        value={newProduct.categoryId}
                        onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })} 
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="1">Laptops</option>
                        <option value="2">Teléfonos</option>
                        <option value="3">Desktops</option>
                        <option value="4">Accesorios</option>
                    </select>
                </div>
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                    Agregar productos
                </button>
            </form>
            <h2 className="text-xl font-bold mb-2">Productos</h2>
            {/* Grid de productos */}
            <div className="grid grid-cols-3 gap-4">
                {currentProducts.map(product => (
                    <div key={product.id} className="border p-4 rounded">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-gray-700">${product.price}</p>
                        <p className="text-gray-700">Categoría: {categories[product.categoryId]}</p>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
