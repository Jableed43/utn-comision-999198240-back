import React from 'react';

/**
 * Componente Card para mostrar información de un producto
 * @param {Object} product - Datos del producto
 * @param {Function} onEdit - Función que se ejecuta al hacer clic en editar
 * @param {Function} onDelete - Función que se ejecuta al hacer clic en eliminar
 */
const ProductCard = ({ product, onEdit, onDelete }) => {
    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Función para formatear precio
    const formatPrice = (price) => {
        if (!price) return null;
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Función para obtener clase de estado
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'status-active';
            case 'inactive': return 'status-inactive';
            case 'discontinued': return 'status-discontinued';
            default: return 'status-unknown';
        }
    };

    return (
        <div className="card product-card">
            <div className="card-header">
                <h3 className="card-title">{product.name || 'Sin nombre'}</h3>
                <span className="card-id">ID: {product._id || product.id}</span>
            </div>
            
            <div className="card-body">
                <div className="card-info">
                    {product.description && (
                        <div className="info-item">
                            <span className="info-label">Descripción:</span>
                            <span className="info-value">{product.description}</span>
                        </div>
                    )}
                    
                    {product.price && (
                        <div className="info-item">
                            <span className="info-label">Precio:</span>
                            <span className="info-value price">{formatPrice(product.price)}</span>
                        </div>
                    )}
                    
                    {product.stock !== undefined && (
                        <div className="info-item">
                            <span className="info-label">Stock:</span>
                            <span className="info-value stock">{product.stock} unidades</span>
                        </div>
                    )}
                    
                    {product.category && (
                        <div className="info-item">
                            <span className="info-label">Categoría:</span>
                            <span className="info-value category-badge">{product.category}</span>
                        </div>
                    )}
                    
                    {product.status && (
                        <div className="info-item">
                            <span className="info-label">Estado:</span>
                            <span className={`info-value status-badge ${getStatusClass(product.status)}`}>
                                {product.status}
                            </span>
                        </div>
                    )}
                    
                    {product.createdAt && (
                        <div className="info-item">
                            <span className="info-label">Creado:</span>
                            <span className="info-value">{formatDate(product.createdAt)}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="card-actions">
                <button 
                    onClick={() => onEdit(product)}
                    className="btn btn-primary btn-sm"
                    title="Editar producto"
                >
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => onDelete(product._id || product.id)}
                    className="btn btn-danger btn-sm"
                    title="Eliminar producto"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

