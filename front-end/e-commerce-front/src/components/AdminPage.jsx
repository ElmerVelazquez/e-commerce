import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function AdminPage() {
    const { user } = useAuth(); // Obtener el usuario autenticado del contexto
    const navigate = useNavigate(); // Hook para la navegación
    const [products, setProducts] = useState([]); // Estado para los productos
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', stock: 0, urlImg: '', category: '' }); // Estado para el nuevo producto

    useEffect(() => {

      // Redirigir si el usuario no es administrador
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

    useEffect(() => {
        // Fetch para obtener los productos
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_PRODUCT_URL);
                const data = await response.json();

                setProducts(data.value);

            } catch (error) {
                console.error('Error fetching products:', error); // Manejo de errores
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
                body: JSON.stringify(newProduct), // Enviar el nuevo producto en el cuerpo de la solicitud
                
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || 'Error agregando producto');
            }
    
            const responseData = await response.json();
            const addedProduct = responseData.value; // Asumiendo que solo se agrega un producto a la vez
    
            setProducts([...products, addedProduct]); // Actualizar el estado con el nuevo producto
            setNewProduct({ name: '', description: '', price: 0, stock: 0, urlImg: '', category: '' }); // Limpiar el formulario
            console.log(addedProduct) 
            console.log(products) 
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
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} // Actualizar el nombre del producto
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {/* Sección de descripción */}
                <div className="mb-2">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} // Actualizar la descripción del producto
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
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} // Actualizar el precio del producto
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
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} // Actualizar el stock del producto
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                {/* Sección de img */}
                <div className="mb-2">
                    <label className="block text-gray-700">Url img</label>
                    <input
                        type="text"
                        value={newProduct.urlImg}
                        onChange={(e) => setNewProduct({ ...newProduct, urlImg: e.target.value })} // Actualizar la URL de la imagen del producto
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                {/* Sección del select */}
                <div className="mb-2">
                    <label className="block text-gray-700">Categoría</label>
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} // Actualizar la categoría del producto
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Telefono">Teléfonos</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>

                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
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
                            onClick={() => handleDeleteProduct(product.id)} // Eliminar producto
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
