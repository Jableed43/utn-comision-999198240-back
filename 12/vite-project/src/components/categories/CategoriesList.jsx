import React from 'react';

const CategoriesList = ({ categories, onEdit, onDelete, loading, error }) => {
    // Loading state
    if (loading) {
        return (
            <div className="loading-state">
                <p>Cargando categorías...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-state">
                <p>Error al cargar categorías: {error.message}</p>
            </div>
        );
    }

    // Empty state
    if (categories.length === 0) {
        return (
            <div className="empty-state">
                <p>No hay registros</p>
            </div>
        );
    }

    // Lista de categorías
    return (
        <div className="categories-grid">
            {categories.map((category) => (
                <div key={category._id || category.id} className="category-card">
                    <div className="card-header">
                        <h3>{category.name}</h3>
                    </div>
                    <div className="card-body">
                        {category.description && (
                            <p><strong>Descripción:</strong> {category.description}</p>
                        )}
                        {category.createdAt && (
                            <p><strong>Creada:</strong> {new Date(category.createdAt).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div className="card-actions">
                        <button 
                            onClick={() => onEdit(category)}
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => onDelete(category._id || category.id)}
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

export default CategoriesList;
