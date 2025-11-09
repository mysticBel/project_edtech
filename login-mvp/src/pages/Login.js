import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = onLogin(email, password);

    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>
        <p className="subtitle">Sistema de Reforzamiento Adaptativo</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>

        <div className="demo-users">
          <p>
            <strong>Usuarios de prueba:</strong>
          </p>
          <p>admin@test.com / admin123</p>
          <p>profesor@test.com / profe123</p>
          <p>alumno@test.com / alumno123</p>
        </div>

        <div className="register-link">
          <p>¿No tienes cuenta?</p>
          <button onClick={onGoToRegister} className="link-button">
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
