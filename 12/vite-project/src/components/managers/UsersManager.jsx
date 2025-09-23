import React, { useState, useEffect } from 'react';
import { useFetchUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/index.jsx';
import UserCard from '../cards/UserCard.jsx';
import UserForm from '../forms/UserForm.jsx';

/**
 * Componente padre para gestionar usuarios
 * Maneja la lista, creación, edición y eliminación de usuarios
 */
const UsersManager = () => {
    // Estados para controlar la UI
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);

    // Hooks para operaciones de usuarios
    const { fetchUsers, loading: fetchLoading, error: fetchError } = useFetchUsers();
    const { registerUser: createUser, loading: createLoading, error: createError } = useCreateUser();
    const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser();
    const { deleteUser, loading: deleteLoading, error: deleteError } = useDeleteUser();

    // Cargar usuarios al montar el componente
    useEffect(() => {
        loadUsers();
    }, []);

    // Función para cargar usuarios
    const loadUsers = async () => {
        const data = await fetchUsers();
        if (data) {
            setUsers(data);
        }
    };

    // Función para mostrar formulario de nuevo usuario
    const handleNewUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    // Función para editar usuario
    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    // Función para eliminar usuario
    const handleDeleteUser = async (userId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            const result = await deleteUser(userId);
            if (result) {
                // Recargar la lista después de eliminar
                loadUsers();
            }
        }
    };

    // Función para manejar envío del formulario
    const handleFormSubmit = async (formData) => {
        let result;
        if (editingUser) {
            result = await updateUser(editingUser._id || editingUser.id, formData);
        } else {
            result = await createUser(formData);
        }

        if (result) {
            setShowForm(false);
            setEditingUser(null);
            loadUsers(); // Recargar la lista
        }
    };

    // Función para cancelar formulario
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    // Estado de carga combinado
    const isFormLoading = createLoading || updateLoading;

    return (
        <div className="users-manager">
            <h1>Gestión de Usuarios</h1>
            
            {/* Botón para nuevo usuario */}
            <button onClick={handleNewUser} disabled={showForm} className="btn-primary">
                Nuevo Usuario
            </button>

            {/* Formulario de usuario */}
            {showForm && (
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancelForm}
                    isLoading={isFormLoading}
                />
            )}

            {/* Lista de usuarios */}
            <div className="users-list">
                {fetchLoading && (
                    <div className="loading-state">
                        <p>Cargando usuarios...</p>
                    </div>
                )}
                
                {fetchError && (
                    <div className="error-state">
                        <p>Error al cargar usuarios: {fetchError.message}</p>
                    </div>
                )}

                {createError && (
                    <div className="error-message">
                        <p>Error al crear usuario: {createError}</p>
                    </div>
                )}

                {updateError && (
                    <div className="error-message">
                        <p>Error al actualizar usuario: {updateError}</p>
                    </div>
                )}

                {deleteError && (
                    <div className="error-message">
                        <p>Error al eliminar usuario: {deleteError}</p>
                    </div>
                )}

                {/* Empty State - cuando no hay usuarios */}
                {users.length === 0 && !fetchLoading && !fetchError && (
                    <div className="empty-state">
                        <div className="empty-state-content">
                            <div className="empty-state-icon">👥</div>
                            <h3>No hay usuarios registrados</h3>
                            <p>Comienza creando tu primer usuario en el sistema</p>
                            <button 
                                onClick={handleNewUser} 
                                className="btn btn-primary"
                                disabled={showForm}
                            >
                                Crear Primer Usuario
                            </button>
                        </div>
                    </div>
                )}

                {/* Lista de usuarios */}
                {users.length > 0 && users.map((user) => (
                    <UserCard
                        key={user._id || user.id}
                        user={user}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                    />
                ))}
            </div>
        </div>
    );
};

export default UsersManager;
