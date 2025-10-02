import React, { useState, useEffect } from 'react';
import { useFetchUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../../hooks/users/index.jsx';
import UsersList from './UsersList.jsx';
import UserForm from './UserForm.jsx';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Hooks
    const { fetchUsers, loading: fetchLoading, error: fetchError } = useFetchUsers();
    const { createUser, loading: createLoading, error: createError } = useCreateUser();
    const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser();
    const { deleteUser, loading: deleteLoading, error: deleteError } = useDeleteUser();

    // Cargar usuarios al montar el componente
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await fetchUsers();
        if (result) {
            setUsers(result);
        }
    };

    const handleNewUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        let success = false;

        if (editingUser) {
            // Actualizar usuario existente
            const result = await updateUser(editingUser._id || editingUser.id, formData);
            success = !!result;
        } else {
            // Crear nuevo usuario
            const result = await createUser(formData);
            success = !!result;
        }

        if (success) {
            setShowForm(false);
            setEditingUser(null);
            loadUsers(); // Recargar lista
        }
    };

    const handleDeleteUser = async (userId) => {
        const result = await deleteUser(userId);
        if (result) {
            loadUsers(); // Recargar lista
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const isFormLoading = createLoading || updateLoading;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Usuarios</h1>
                {!showForm && (
                    <button onClick={handleNewUser} className="btn btn-primary">
                        Nuevo Usuario
                    </button>
                )}
            </div>

            {/* Mensajes de error */}
            {createError && (
                <div className="error-message">
                    Error al crear usuario: {createError}
                </div>
            )}
            {updateError && (
                <div className="error-message">
                    Error al actualizar usuario: {updateError}
                </div>
            )}
            {deleteError && (
                <div className="error-message">
                    Error al eliminar usuario: {deleteError}
                </div>
            )}

            <div className="page-content">
                {showForm ? (
                    <UserForm
                        user={editingUser}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        loading={isFormLoading}
                    />
                ) : (
                    <UsersList
                        users={users}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                        loading={fetchLoading}
                        error={fetchError}
                    />
                )}
            </div>
        </div>
    );
};

export default UsersPage;

