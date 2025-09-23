import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Sistema de Gestión</h1>
                <p>Administra usuarios, categorías y productos de manera eficiente</p>
            </div>

            <div className="page-content">
                <div className="users-grid">
                    <Link to="/users" className="user-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-header">
                            <h3>👥 Usuarios</h3>
                        </div>
                        <div className="card-body">
                            <p>Gestionar usuarios del sistema</p>
                            <p><strong>Funciones:</strong> Crear, editar, eliminar usuarios</p>
                        </div>
                    </Link>

                    <Link to="/categories" className="category-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-header">
                            <h3>📁 Categorías</h3>
                        </div>
                        <div className="card-body">
                            <p>Organizar productos por categorías</p>
                            <p><strong>Funciones:</strong> Crear, eliminar categorías</p>
                        </div>
                    </Link>

                    <Link to="/products" className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card-header">
                            <h3>📦 Productos</h3>
                        </div>
                        <div className="card-body">
                            <p>Administrar inventario de productos</p>
                            <p><strong>Funciones:</strong> CRUD completo de productos</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
