import React from 'react';
import { ProductsManager } from '../components/index.jsx';

/**
 * Página de gestión de productos
 * Wrapper para el componente ProductsManager
 */
const ProductsPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Productos</h1>
                <p>Administra el inventario de productos</p>
            </div>
            <ProductsManager />
        </div>
    );
};

export default ProductsPage;

