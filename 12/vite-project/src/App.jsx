import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import { UsersPage } from './components/users/index.jsx';
import { CategoriesPage } from './components/categories/index.jsx';
import { ProductsPage } from './components/products/index.jsx';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;