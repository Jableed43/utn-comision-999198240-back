import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLoginUser from "../../hooks/useLoginUser.jsx";

/**
 * Componente de Login
 * Permite a los usuarios autenticarse en el sistema
 */
export const Login = () => {
    const navigate = useNavigate();
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Hook para manejar el login
    const { done, error, loginUser, loading } = useLoginUser();

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            return;
        }

        try {
            await loginUser(formData);
            if (done) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    // Limpiar formulario
    const handleReset = () => {
        setFormData({
            email: "",
            password: "",
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            placeholder="Ingresa tu email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={handleReset}
                            disabled={loading}
                            className="btn-secondary"
                        >
                            Limpiar
                        </button>
                    </div>
                </form>

                {/* Mensajes de estado */}
                {done && (
                    <div className="success-message">
                        ¡Usuario autenticado correctamente!
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        Error: {error.message || error}
                    </div>
                )}

                {/* Enlace a registro */}
                <div className="auth-links">
                    <p>¿No tienes cuenta?</p>
                    <Link to="/auth/register" className="auth-link">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};