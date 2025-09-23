import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página de inicio de la aplicación
 * Muestra información general y enlaces a las secciones principales
 */
const HomePage = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Bienvenido al Sistema de Gestión</h1>
                <p>Gestiona usuarios, categorías y productos de manera eficiente</p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <h3>👥 Gestión de Usuarios</h3>
                    <p>Administra usuarios del sistema, crea, edita y elimina registros</p>
                    <Link to="/users" className="feature-link">
                        Ir a Usuarios
                    </Link>
                </div>

                <div className="feature-card">
                    <h3>📁 Gestión de Categorías</h3>
                    <p>Organiza productos en categorías para mejor clasificación</p>
                    <Link to="/categories" className="feature-link">
                        Ir a Categorías
                    </Link>
                </div>

                <div className="feature-card">
                    <h3>📦 Gestión de Productos</h3>
                    <p>Administra el inventario de productos con información detallada</p>
                    <Link to="/products" className="feature-link">
                        Ir a Productos
                    </Link>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Acciones Rápidas</h2>
                <div className="action-buttons">
                    <Link to="/auth/login" className="action-button primary">
                        Iniciar Sesión
                    </Link>
                    <Link to="/auth/register" className="action-button secondary">
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
