import React, { useState, useEffect } from 'react';
import { useFetchCategories, useCreateCategory, useDeleteCategory } from '../../hooks/index.jsx';
import CategoryCard from '../cards/CategoryCard.jsx';
import CategoryForm from '../forms/CategoryForm.jsx';

/**
 * Componente padre para gestionar categorías
 * Maneja la lista, creación, edición y eliminación de categorías
 */
const CategoriesManager = () => {
    // Estados para controlar la UI
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    // Hooks para operaciones de categorías
    const { fetchCategories, loading: fetchLoading, error: fetchError } = useFetchCategories();
    const { createCategory, loading: createLoading, error: createError } = useCreateCategory();
    const { deleteCategory, loading: deleteLoading, error: deleteError } = useDeleteCategory();

    // Cargar categorías al montar el componente
    useEffect(() => {
        loadCategories();
    }, []);

    // Función para cargar categorías
    const loadCategories = async () => {
        const data = await fetchCategories();
        if (data) {
            setCategories(data);
        }
    };

    // Función para mostrar formulario de nueva categoría
    const handleNewCategory = () => {
        setEditingCategory(null);
        setShowForm(true);
    };

    // Función para editar categoría
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    // Función para eliminar categoría
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            const result = await deleteCategory(categoryId);
            if (result) {
                // Recargar la lista después de eliminar
                loadCategories();
            }
        }
    };

    // Función para manejar envío del formulario
    const handleFormSubmit = async (formData) => {
        let result;
        if (editingCategory) {
            // TODO: Implementar actualización cuando tengamos el hook
            console.log('Actualizar categoría:', editingCategory._id, formData);
            alert('Función de actualización pendiente de implementar');
        } else {
            result = await createCategory(formData);
        }

        if (result) {
            setShowForm(false);
            setEditingCategory(null);
            loadCategories(); // Recargar la lista
        }
    };

    // Función para cancelar formulario
    const handleCancelForm = () => {
        setShowForm(false);
        setEditingCategory(null);
    };

    return (
        <div className="categories-manager">
            <h1>Gestión de Categorías</h1>
            
            {/* Botón para nueva categoría */}
            <button onClick={handleNewCategory} disabled={showForm} className="btn-primary">
                Nueva Categoría
            </button>

            {/* Formulario de categoría */}
            {showForm && (
                <CategoryForm
                    category={editingCategory}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancelForm}
                    isLoading={createLoading}
                />
            )}

            {/* Lista de categorías */}
            <div className="categories-list">
                {fetchLoading && (
                    <div className="loading-state">
                        <p>Cargando categorías...</p>
                    </div>
                )}
                
                {fetchError && (
                    <div className="error-state">
                        <p>Error al cargar categorías: {fetchError.message}</p>
                    </div>
                )}

                {createError && (
                    <div className="error-message">
                        <p>Error al crear categoría: {createError}</p>
                    </div>
                )}

                {deleteError && (
                    <div className="error-message">
                        <p>Error al eliminar categoría: {deleteError}</p>
                    </div>
                )}

                {/* Empty State - cuando no hay categorías */}
                {categories.length === 0 && !fetchLoading && !fetchError && (
                    <div className="empty-state">
                        <div className="empty-state-content">
                            <div className="empty-state-icon">📁</div>
                            <h3>No hay categorías registradas</h3>
                            <p>Comienza creando tu primera categoría para organizar productos</p>
                            <button 
                                onClick={handleNewCategory} 
                                className="btn btn-primary"
                                disabled={showForm}
                            >
                                Crear Primera Categoría
                            </button>
                        </div>
                    </div>
                )}

                {/* Lista de categorías */}
                {categories.length > 0 && categories.map((category) => (
                    <CategoryCard
                        key={category._id || category.id}
                        category={category}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoriesManager;
