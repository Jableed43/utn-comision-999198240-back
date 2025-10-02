import React from 'react';

/**
 * Componente Card para mostrar información de una categoría
 * @param {Object} category - Datos de la categoría
 * @param {Function} onEdit - Función que se ejecuta al hacer clic en editar
 * @param {Function} onDelete - Función que se ejecuta al hacer clic en eliminar
 */
const CategoryCard = ({ category, onEdit, onDelete }) => {
    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="card category-card">
            <div className="card-header">
                <h3 className="card-title">{category.name || 'Sin nombre'}</h3>
                <span className="card-id">ID: {category._id || category.id}</span>
            </div>
            
            <div className="card-body">
                <div className="card-info">
                    {category.description && (
                        <div className="info-item">
                            <span className="info-label">Descripción:</span>
                            <span className="info-value">{category.description}</span>
                        </div>
                    )}
                    
                    {category.createdAt && (
                        <div className="info-item">
                            <span className="info-label">Creado:</span>
                            <span className="info-value">{formatDate(category.createdAt)}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="card-actions">
                <button 
                    onClick={() => onEdit(category)}
                    className="btn btn-primary btn-sm"
                    title="Editar categoría"
                >
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => onDelete(category._id || category.id)}
                    className="btn btn-danger btn-sm"
                    title="Eliminar categoría"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;

