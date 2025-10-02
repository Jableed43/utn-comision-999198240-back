import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <Link to="/" className="nav-brand">
                    Sistema de Gestión
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={isActive('/')}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className={isActive('/users')}>
                            Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" className={isActive('/categories')}>
                            Categorías
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={isActive('/products')}>
                            Productos
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;


