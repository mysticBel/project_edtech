import React from "react";
import "./Home.css";

function Home({ user, onLogout, onStartLearning }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="welcome-section">
          <h1>¡Bienvenido, {user.nombre}! 🎉</h1>
          <p className="user-email">{user.email}</p>
        </div>

        {user.surveyData && (
          <div className="profile-section">
            <h3>Tu Perfil de Aprendizaje</h3>
            <div className="profile-info">
              <p>
                <strong>Grado:</strong> {user.surveyData.grado}
              </p>
              <p>
                <strong>Materias Favoritas:</strong>{" "}
                {user.surveyData.materiasFavoritas.join(", ")}
              </p>
              <p>
                <strong>Estilo de Aprendizaje:</strong>{" "}
                {user.surveyData.estiloAprendizaje === "visual"
                  ? "📺 Visual"
                  : user.surveyData.estiloAprendizaje === "lectura"
                  ? "📚 Lectura"
                  : user.surveyData.estiloAprendizaje === "practica"
                  ? "✏️ Práctica"
                  : "🎮 Juegos"}
              </p>
              <p>
                <strong>Pasatiempos:</strong>{" "}
                {user.surveyData.pasatiempos.join(", ")}
              </p>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>¿Qué quieres hacer hoy?</h3>
          <button onClick={onStartLearning} className="learning-button">
            🗺️ Ir a Mis Rutas de Aprendizaje
          </button>
        </div>

        <button onClick={onLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Home;
