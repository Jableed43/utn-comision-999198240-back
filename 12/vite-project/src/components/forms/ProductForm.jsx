import React, { useState, useEffect } from 'react';

/**
 * Componente Form para crear y editar productos
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.product - Datos del producto a editar (null para crear nuevo)
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {Function} props.onCancel - Función que se ejecuta al cancelar
 * @param {boolean} props.isLoading - Estado de carga del formulario
 */
const ProductForm = ({ product, onSubmit, onCancel, isLoading = false }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        status: 'active'
    });

    // Cargar datos existentes si estamos editando
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
                status: product.status || 'active'
            });
        }
    }, [product]);

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
        // Convertir price y stock a números
        const submitData = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0
        };
        onSubmit(submitData);
    };

    return (
        <div className="form-container">
            <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            
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
                        placeholder="Ingresa el nombre del producto"
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
                        placeholder="Ingresa una descripción del producto"
                        rows="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                            disabled={isLoading}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            required
                            disabled={isLoading}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={isLoading}
                        placeholder="Ingresa la categoría del producto"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="discontinued">Descontinuado</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={isLoading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
