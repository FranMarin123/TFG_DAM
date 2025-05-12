import React, { useState, type JSX } from 'react';
import { Link } from 'react-router-dom';

// Definimos una interfaz para los valores del formulario
interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = (): JSX.Element => {
  // Usamos una interfaz para tipar el estado del formulario
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  // Manejamos los cambios de los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Manejamos el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
