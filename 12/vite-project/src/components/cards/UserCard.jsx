import React from 'react';

/**
 * Componente Card para mostrar información de un usuario
 * @param {Object} user - Datos del usuario
 * @param {Function} onEdit - Función que se ejecuta al hacer clic en editar
 * @param {Function} onDelete - Función que se ejecuta al hacer clic en eliminar
 */
const UserCard = ({ user, onEdit, onDelete }) => {
    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="card user-card">
            <div className="card-header">
                <h3 className="card-title">
                    {user.name || 'Sin nombre'} {user.lastName || ''}
                </h3>
                <span className="card-id">ID: {user._id || user.id}</span>
            </div>
            
            <div className="card-body">
                <div className="card-info">
                    {user.email && (
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                    )}
                    
                    {user.age && (
                        <div className="info-item">
                            <span className="info-label">Edad:</span>
                            <span className="info-value">{user.age} años</span>
                        </div>
                    )}
                    
                    {user.phone && (
                        <div className="info-item">
                            <span className="info-label">Teléfono:</span>
                            <span className="info-value">{user.phone}</span>
                        </div>
                    )}
                    
                    {user.address && (
                        <div className="info-item">
                            <span className="info-label">Dirección:</span>
                            <span className="info-value">{user.address}</span>
                        </div>
                    )}
                    
                    {user.role && (
                        <div className="info-item">
                            <span className="info-label">Rol:</span>
                            <span className="info-value role-badge">{user.role}</span>
                        </div>
                    )}
                    
                    {user.createdAt && (
                        <div className="info-item">
                            <span className="info-label">Creado:</span>
                            <span className="info-value">{formatDate(user.createdAt)}</span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="card-actions">
                <button 
                    onClick={() => onEdit(user)}
                    className="btn btn-primary btn-sm"
                    title="Editar usuario"
                >
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => onDelete(user._id || user.id)}
                    className="btn btn-danger btn-sm"
                    title="Eliminar usuario"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
};

export default UserCard;

