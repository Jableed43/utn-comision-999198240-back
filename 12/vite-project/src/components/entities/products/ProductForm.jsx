import React, { useState, useEffect } from 'react';
import { useFetchCategories } from '../../../hooks/categories/index.jsx';
import { useGetProductStatus } from '../../../hooks/products/index.jsx';

export const statusMap = {
        "AVAILABLE": "Disponible",
        "NOT AVAILABLE": "No disponible",
        "DISCONTINUED": "Descontinuado"
    };

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        status: 'AVAILABLE'
    });

    const [categories, setCategories] = useState([]);
    const [statusList, setStatusList] = useState([]);
    
    // Hooks para obtener datos
    const { fetchCategories } = useFetchCategories();
    const { getProductStatus } = useGetProductStatus();

    // Cargar categorías y estados al montar el componente
    useEffect(() => {
        const loadData = async () => {
            const [categoriesData, statusData] = await Promise.all([
                fetchCategories(),
                getProductStatus()
            ]);
            
            if (categoriesData) setCategories(categoriesData);
            if (statusData) setStatusList(statusData);
        };
        
        loadData();
    }, []);

    // Cargar datos del producto si estamos editando
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                category: product.category?._id || product.category || '',
                stock: product.stock || '',
                status: product.status || 'AVAILABLE'
            });
        }
    }, [product]);

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
                <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
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
                        placeholder="Nombre del producto"
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Descripción del producto"
                        rows="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Precio:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            disabled={loading}
                            placeholder="0.00"
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            disabled={loading}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Categoría:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={loading || categories.length === 0}
                    >
                        <option value="">
                            {categories.length === 0 ? 'No hay categorías disponibles' : 'Selecciona una categoría (opcional)'}
                        </option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {categories.length === 0 && (
                        <small style={{ color: '#6c757d', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                            Crea categorías primero para poder asignarlas a productos
                        </small>
                    )}
                </div>

                <div className="form-group">
                    <label>Estado:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        {statusList.map((status) => (
                            <option key={status} value={status}>
                                {statusMap[status]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={loading} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
