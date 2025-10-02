import React from 'react';

const UsersList = ({ users, onEdit, onDelete, loading, error }) => {
    // Loading state
    if (loading) {
        return (
            <div className="loading-state">
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-state">
                <p>Error al cargar usuarios: {error.message}</p>
            </div>
        );
    }

    // Empty state
    if (users.length === 0) {
        return (
            <div className="empty-state">
                <p>No hay registros</p>
            </div>
        );
    }

    // Lista de usuarios
    return (
        <div className="users-grid">
            {users.map((user) => (
                <div key={user._id || user.id} className="user-card">
                    <div className="card-header">
                        <h3>{user.name} {user.lastName}</h3>
                    </div>
                    <div className="card-body">
                        <p><strong>Email:</strong> {user.email}</p>
                        {user.age && <p><strong>Edad:</strong> {user.age} años</p>}
                        {user.role && <p><strong>Rol:</strong> {user.role}</p>}
                    </div>
                    <div className="card-actions">
                        <button 
                            onClick={() => onEdit(user)}
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                        <button 
                            onClick={() => onDelete(user._id || user.id)}
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

export default UsersList;
