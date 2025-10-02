import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Cargar datos de la categoría si estamos editando
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || ''
            });
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="simple-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        placeholder="Nombre de la categoría"
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Descripción de la categoría (opcional)"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Guardando...' : (category ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={loading} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;

