import React, { useState, useEffect } from 'react';

/**
 * Componente Form para crear y editar usuarios
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario a editar (null para crear nuevo)
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {Function} props.onCancel - Función que se ejecuta al cancelar
 * @param {boolean} props.isLoading - Estado de carga del formulario
 */
const UserForm = ({ user, onSubmit, onCancel, isLoading = false }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        age: '',
        password: ''
    });

    // Cargar datos existentes si estamos editando
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                email: user.email || '',
                age: user.age || '',
                password: '' // No pre-cargamos la contraseña por seguridad
            });
        }
    }, [user]);

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
            <h2>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
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
                            placeholder="Ingresa el nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Apellido:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            placeholder="Ingresa el apellido"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Ingresa el email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Edad:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        disabled={isLoading}
                        placeholder="Ingresa la edad"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        {user ? 'Nueva Contraseña (opcional):' : 'Contraseña:'}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!user}
                        disabled={isLoading}
                        placeholder={user ? "Deja vacío para mantener la contraseña actual" : "Crea una contraseña"}
                        minLength="6"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" onClick={onCancel} disabled={isLoading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;

