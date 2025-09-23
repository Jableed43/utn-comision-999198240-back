import React, { useState, useEffect } from 'react';

/**
 * Componente Form para crear y editar categorías
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.category - Datos de la categoría a editar (null para crear nueva)
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {Function} props.onCancel - Función que se ejecuta al cancelar
 * @param {boolean} props.isLoading - Estado de carga del formulario
 */
const CategoryForm = ({ category, onSubmit, onCancel, isLoading = false }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Cargar datos existentes si estamos editando
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || ''
            });
        }
    }, [category]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h2>{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Ingresa el nombre de la categoría"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ingresa una descripción (opcional)"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : (category ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={isLoading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;

