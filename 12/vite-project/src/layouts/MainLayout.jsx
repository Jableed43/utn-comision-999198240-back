import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

/**
 * Layout principal de la aplicación
 * Incluye navegación y estructura base
 */
const MainLayout = () => {
    const location = useLocation();

    // Función para determinar si una ruta está activa
    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="main-layout">
            {/* Header con navegación */}
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">Sistema de Gestión</h1>
                    <nav className="main-navigation">
                        <Link 
                            to="/" 
                            className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
                        >
                            Inicio
                        </Link>
                        <Link 
                            to="/users" 
                            className={`nav-link ${isActiveRoute('/users') ? 'active' : ''}`}
                        >
                            Usuarios
                        </Link>
                        <Link 
                            to="/categories" 
                            className={`nav-link ${isActiveRoute('/categories') ? 'active' : ''}`}
                        >
                            Categorías
                        </Link>
                        <Link 
                            to="/products" 
                            className={`nav-link ${isActiveRoute('/products') ? 'active' : ''}`}
                        >
                            Productos
                        </Link>
                        <Link 
                            to="/auth/login" 
                            className={`nav-link ${isActiveRoute('/auth/login') ? 'active' : ''}`}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/auth/register" 
                            className={`nav-link ${isActiveRoute('/auth/register') ? 'active' : ''}`}
                        >
                            Registro
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="app-main">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <p>&copy; 2024 Sistema de Gestión. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default MainLayout;


