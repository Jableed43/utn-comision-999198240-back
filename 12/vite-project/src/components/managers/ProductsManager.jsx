import React, { useState, useEffect } from 'react';
import { useFetchProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/index.jsx';
import ProductCard from '../cards/ProductCard.jsx';
import ProductForm from '../forms/ProductForm.jsx';

/**
 * Componente padre para gestionar productos
 * Maneja la lista, creación, edición y eliminación de productos
 */
const ProductsManager = () => {
    // Estados para controlar la UI
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    // Hooks para operaciones de productos
    const { fetchProducts, loading: fetchLoading, error: fetchError } = useFetchProducts();
    const { createProduct, loading: createLoading, error: createError } = useCreateProduct();
    const { updateProduct, loading: updateLoading, error: updateError } = useUpdateProduct();
    const { deleteProduct, loading: deleteLoading, error: deleteError } = useDeleteProduct();

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    // Función para cargar productos
    const loadProducts = async () => {
        const data = await fetchProducts();
        if (data) {
            setProducts(data);
        }
    };

    // Función para mostrar formulario de nuevo producto
    const handleNewProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    // Función para editar producto
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    // Función para eliminar producto
    const handleDeleteProduct = async (productId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            const result = await deleteProduct(productId);
            if (result) {
                // Recargar la lista después de eliminar
                loadProducts();
            }
        }
    };

    // Función para manejar envío del formulario
    const handleFormSubmit = async (formData) => {
        let result;
        if (editingProduct) {
            result = await updateProduct(editingProduct._id || editingProduct.id, formData);
        } else {
            result = await createProduct(formData);
        }

        if (result) {
            setShowForm(false);
            setEditingProduct(null);
            loadProducts(); // Recargar la lista
        }
    };

    // Función para cancelar formulario
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    // Estado de carga combinado
    const isFormLoading = createLoading || updateLoading;

    return (
        <div className="products-manager">
            <h1>Gestión de Productos</h1>
            
            {/* Botón para nuevo producto */}
            <button onClick={handleNewProduct} disabled={showForm} className="btn-primary">
                Nuevo Producto
            </button>

            {/* Formulario de producto */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancelForm}
                    isLoading={isFormLoading}
                />
            )}

            {/* Lista de productos */}
            <div className="products-list">
                {fetchLoading && (
                    <div className="loading-state">
                        <p>Cargando productos...</p>
                    </div>
                )}
                
                {fetchError && (
                    <div className="error-state">
                        <p>Error al cargar productos: {fetchError.message}</p>
                    </div>
                )}

                {createError && (
                    <div className="error-message">
                        <p>Error al crear producto: {createError}</p>
                    </div>
                )}

                {updateError && (
                    <div className="error-message">
                        <p>Error al actualizar producto: {updateError}</p>
                    </div>
                )}

                {deleteError && (
                    <div className="error-message">
                        <p>Error al eliminar producto: {deleteError}</p>
                    </div>
                )}

                {/* Empty State - cuando no hay productos */}
                {products.length === 0 && !fetchLoading && !fetchError && (
                    <div className="empty-state">
                        <div className="empty-state-content">
                            <div className="empty-state-icon">📦</div>
                            <h3>No hay productos registrados</h3>
                            <p>Comienza creando tu primer producto en el inventario</p>
                            <button 
                                onClick={handleNewProduct} 
                                className="btn btn-primary"
                                disabled={showForm}
                            >
                                Crear Primer Producto
                            </button>
                        </div>
                    </div>
                )}

                {/* Lista de productos */}
                {products.length > 0 && products.map((product) => (
                    <ProductCard
                        key={product._id || product.id}
                        product={product}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsManager;
