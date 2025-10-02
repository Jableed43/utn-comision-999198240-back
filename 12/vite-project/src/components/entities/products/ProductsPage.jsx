import React, { useState, useEffect } from 'react';
import { useFetchProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../../hooks/products/index.jsx';
import ProductsList from './ProductsList.jsx';
import ProductForm from './ProductForm.jsx';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Hooks
    const { fetchProducts, loading: fetchLoading, error: fetchError } = useFetchProducts();
    const { createProduct, loading: createLoading, error: createError } = useCreateProduct();
    const { updateProduct, loading: updateLoading, error: updateError } = useUpdateProduct();
    const { deleteProduct, loading: deleteLoading, error: deleteError } = useDeleteProduct();

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await fetchProducts();
        if (result) {
            setProducts(result);
        }
    };

    const handleNewProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        let success = false;

        if (editingProduct) {
            // Actualizar producto existente
            const result = await updateProduct(editingProduct._id || editingProduct.id, formData);
            success = !!result;
        } else {
            // Crear nuevo producto
            const result = await createProduct(formData);
            success = !!result;
        }

        if (success) {
            setShowForm(false);
            setEditingProduct(null);
            loadProducts(); // Recargar lista
        }
    };

    const handleDeleteProduct = async (productId) => {
        const result = await deleteProduct(productId);
        if (result) {
            loadProducts(); // Recargar lista
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const isFormLoading = createLoading || updateLoading;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Productos</h1>
                {!showForm && (
                    <button onClick={handleNewProduct} className="btn btn-primary">
                        Nuevo Producto
                    </button>
                )}
            </div>

            {/* Mensajes de error */}
            {createError && (
                <div className="error-message">
                    Error al crear producto: {createError}
                </div>
            )}
            {updateError && (
                <div className="error-message">
                    Error al actualizar producto: {updateError}
                </div>
            )}
            {deleteError && (
                <div className="error-message">
                    Error al eliminar producto: {deleteError}
                </div>
            )}

            <div className="page-content">
                {showForm ? (
                    <ProductForm
                        product={editingProduct}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        loading={isFormLoading}
                    />
                ) : (
                    <ProductsList
                        products={products}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                        loading={fetchLoading}
                        error={fetchError}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsPage;

