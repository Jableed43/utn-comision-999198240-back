import React, { useState, useEffect } from 'react';
import { useFetchCategories, useCreateCategory, useDeleteCategory } from '../../../hooks/categories/index.jsx';
import CategoriesList from './CategoriesList.jsx';
import CategoryForm from './CategoryForm.jsx';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Hooks
    const { fetchCategories, loading: fetchLoading, error: fetchError } = useFetchCategories();
    const { createCategory, loading: createLoading, error: createError } = useCreateCategory();
    const { deleteCategory, loading: deleteLoading, error: deleteError } = useDeleteCategory();

    // Cargar categorías al montar el componente
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await fetchCategories();
        if (result) {
            setCategories(result);
        }
    };

    const handleNewCategory = () => {
        setEditingCategory(null);
        setShowForm(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        let success = false;

        if (editingCategory) {
            // Para categorías solo tenemos create y delete, no update
            // Si necesitas update, agrégalo al backend y hook
            console.log('Update no implementado para categorías');
        } else {
            // Crear nueva categoría
            const result = await createCategory(formData);
            success = !!result;
        }

        if (success) {
            setShowForm(false);
            setEditingCategory(null);
            loadCategories(); // Recargar lista
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        const result = await deleteCategory(categoryId);
        if (result) {
            loadCategories(); // Recargar lista
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingCategory(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Gestión de Categorías</h1>
                {!showForm && (
                    <button onClick={handleNewCategory} className="btn btn-primary">
                        Nueva Categoría
                    </button>
                )}
            </div>

            {/* Mensajes de error */}
            {createError && (
                <div className="error-message">
                    Error al crear categoría: {createError}
                </div>
            )}
            {deleteError && (
                <div className="error-message">
                    Error al eliminar categoría: {deleteError}
                </div>
            )}

            <div className="page-content">
                {showForm ? (
                    <CategoryForm
                        category={editingCategory}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        loading={createLoading}
                    />
                ) : (
                    <CategoriesList
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        loading={fetchLoading}
                        error={fetchError}
                    />
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;

