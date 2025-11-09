import React, { useState } from "react";
import "./Register.css";

function Register({ onRegister, onBackToLogin }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Obtener usuarios existentes de localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el email ya existe
    if (existingUsers.find((u) => u.email === formData.email)) {
      setError("Este email ya está registrado");
      return;
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      completedSurvey: false, // Para saber si completó la encuesta
    };

    // Guardar en localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Registrar exitosamente
    onRegister(newUser);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Crear Cuenta</h1>
        <p className="subtitle">Únete a la plataforma de aprendizaje</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button">
            Crear Cuenta
          </button>
        </form>

        <div className="back-to-login">
          <button onClick={onBackToLogin} className="link-button">
            ← Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
