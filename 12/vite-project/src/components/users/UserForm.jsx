import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        age: '',
        password: ''
    });

    // Cargar datos del usuario si estamos editando
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                email: user.email || '',
                age: user.age || '',
                password: '' // No pre-cargar contraseña por seguridad
            });
        }
    }, [user]);

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
                <h2>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="simple-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Edad:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>{user ? 'Nueva Contraseña (opcional):' : 'Contraseña:'}</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!user}
                        disabled={loading}
                        minLength="6"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={loading} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;

