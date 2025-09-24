import { useState } from "react";
import useRegisterUser from "../../hooks/users/useRegisterUser";

export const Register = () => {
  // El estado de form tiene los mismos campos pero vacios
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
  });
  const { done, error, registerUser } = useRegisterUser();

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
        
        // Validación básica
        if (!formData.name || !formData.lastName || !formData.email || !formData.password) {
            return;
        }

        try {
            const response = await registerUser(formData);
            console.log('Usuario registrado:', response);
            
            if (done) {
                navigate('/auth/login');
            }
        } catch (error) {
            console.error('Error en registro:', error);
        }
    };

    // Limpiar formulario
    const handleReset = () => {
        setFormData({
            name: "",
            lastName: "",
            email: "",
            age: "",
            password: "",
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                placeholder="Ingresa tu nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Apellido:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                placeholder="Ingresa tu apellido"
                            />
                        </div>
                    </div>

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
                        <label htmlFor="age">Edad:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="1"
                            max="120"
                            disabled={loading}
                            placeholder="Ingresa tu edad"
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
                            placeholder="Crea una contraseña"
                            minLength="6"
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
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
                        ¡Usuario creado exitosamente! Redirigiendo al login...
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        Error: {error.message || error}
                    </div>
                )}

                {/* Enlace a login */}
                <div className="auth-links">
                    <p>¿Ya tienes cuenta?</p>
                    <Link to="/auth/login" className="auth-link">
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};