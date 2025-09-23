import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUser, useFetchUsers } from "../../hooks/index.jsx";

/**
 * Componente de Edición de Usuario
 * Permite editar la información de un usuario existente
 */
export const Edit = ({ userId }) => {
    const navigate = useNavigate();
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        age: "",
        password: "",
    });

    // Hooks para operaciones
    const { updateUser, loading: updateLoading, error: updateError, done: updateDone } = useUpdateUser();
    const { fetchUsers, data: users } = useFetchUsers();

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        if (userId && users) {
            const userToEdit = users.find(user => user._id === userId);
            if (userToEdit) {
                setFormData({
                    name: userToEdit.name || "",
                    lastName: userToEdit.lastName || "",
                    email: userToEdit.email || "",
                    age: userToEdit.age || "",
                    password: "", // No pre-cargamos la contraseña por seguridad
                });
            }
        }
    }, [userId, users]);

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            console.error('No se proporcionó ID de usuario');
            return;
        }

        try {
            const response = await updateUser(userId, formData);
            console.log('Usuario actualizado:', response);
            
            if (updateDone) {
                navigate('/users');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    // Limpiar formulario
    const handleReset = () => {
        setFormData({
            name: "",
            lastName: "",
            email: "",
            age: "",
            password: "",
        });
    };

    // Cancelar edición
    const handleCancel = () => {
        navigate('/users');
    };

    if (!userId) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>No se proporcionó ID de usuario para editar</p>
                <button onClick={() => navigate('/users')} className="btn-primary">
                    Volver a Usuarios
                </button>
            </div>
        );
    }

    return (
        <div className="edit-container">
            <div className="edit-form">
                <h2>Editar Usuario</h2>
                
                <form onSubmit={handleSubmit} className="user-edit-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={updateLoading}
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
                                onChange={handleInputChange}
                                required
                                disabled={updateLoading}
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
                            onChange={handleInputChange}
                            required
                            disabled={updateLoading}
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
                            onChange={handleInputChange}
                            min="1"
                            max="120"
                            disabled={updateLoading}
                            placeholder="Ingresa la edad"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Nueva Contraseña (opcional):</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={updateLoading}
                            placeholder="Deja vacío para mantener la contraseña actual"
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            disabled={updateLoading}
                            className="btn-primary"
                        >
                            {updateLoading ? 'Actualizando...' : 'Actualizar Usuario'}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={handleReset}
                            disabled={updateLoading}
                            className="btn-secondary"
                        >
                            Limpiar
                        </button>

                        <button 
                            type="button" 
                            onClick={handleCancel}
                            disabled={updateLoading}
                            className="btn-secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

                {/* Mensajes de estado */}
                {updateDone && (
                    <div className="success-message">
                        ¡Usuario actualizado exitosamente!
                    </div>
                )}

                {updateError && (
                    <div className="error-message">
                        Error: {updateError.message || updateError}
                    </div>
                )}
            </div>
        </div>
    );
};