import React from 'react';
import { UsersManager } from '../components/index.jsx';

/**
 * Página de gestión de usuarios
 * Wrapper para el componente UsersManager
 */
const UsersPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Usuarios</h1>
                <p>Administra los usuarios del sistema</p>
            </div>
            <UsersManager />
        </div>
    );
};

export default UsersPage;

