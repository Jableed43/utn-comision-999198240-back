import React from 'react';
import { CategoriesManager } from '../components/index.jsx';

/**
 * Página de gestión de categorías
 * Wrapper para el componente CategoriesManager
 */
const CategoriesPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Categorías</h1>
                <p>Organiza productos en categorías</p>
            </div>
            <CategoriesManager />
        </div>
    );
};

export default CategoriesPage;


