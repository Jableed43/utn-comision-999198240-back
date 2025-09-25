import React from 'react';
import { statusMap } from './ProductForm';

const ProductsList = ({ products, onEdit, onDelete, loading, error }) => {
    // Loading state
    if (loading) {
        return (
            <div className="loading-state">
                <p>Cargando productos...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-state">
                <p>Error al cargar productos: {error.message}</p>
            </div>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <p>No hay registros</p>
            </div>
        );
    }

    // Lista de productos
    return (
        <div className="products-grid">
            {products.map((product) => (
                <div key={product._id || product.id} className="product-card">
                    <div className="card-header">
                        <h3>{product.name}</h3>
                        {product.price && (
                            <span className="product-price">${product.price}</span>
                        )}
                    </div>
                    <div className="card-body">
                        {product.description && (
                            <p><strong>Descripción:</strong> {product.description}</p>
                        )}
                        <p><strong>Categoría:</strong> {
                            product.category 
                                ? (product.category.name || product.category)
                                : 'Sin categoría'
                        }</p>
                        {product.stock !== undefined && (
                            <p><strong>Stock:</strong> {product.stock} unidades</p>
                        )}
                        {product.status && (
                            <p><strong>Estado:</strong> {statusMap[product.status]}</p>
                        )}
                    </div>
                    <div className="card-actions">
                        <button 
                            onClick={() => onEdit(product)}
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => onDelete(product._id || product.id)}
                            className="btn btn-danger btn-sm"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
