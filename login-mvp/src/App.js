import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Survey from "./pages/Survey";
import Home from "./pages/Home";
import LearningMap from "./pages/LearningMap";
import Activity from "./pages/Activity";
import AuthService from "./services/authService";

function App() {
  const [view, setView] = useState("login"); // 'login', 'register', 'survey', 'home', 'learning', 'activity'
  const [user, setUser] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleLogin = (email, password) => {
    try {
      const userData = AuthService.login(email, password);
      if (userData) {
        setUser(userData);
        // Si el usuario no ha completado la encuesta, mostrarla
        if (!userData.completedSurvey) {
          setView("survey");
        } else {
          setView("home");
        }
        return { success: true };
      } else {
        return { success: false, error: "Email o contraseña incorrectos" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleRegister = (userData) => {
    try {
      const newUser = AuthService.register(userData);
      setUser(newUser);
      // Después del registro, siempre mostrar la encuesta
      setView("survey");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSurveyComplete = (surveyData) => {
    const updatedUser = AuthService.completeSurvey(user.id, surveyData);
    setUser(updatedUser);
    setView("home");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  const handleGoToRegister = () => {
    setView("register");
  };

  const handleBackToLogin = () => {
    setView("login");
  };

  const handleStartLearning = () => {
    setView("learning");
  };

  const handleBackToHome = () => {
    setView("home");
  };

  const handleStartActivity = (subject, topic) => {
    setCurrentSubject(subject);
    setCurrentTopic(topic);
    setView("activity");
  };

  const handleBackToLearning = () => {
    setCurrentSubject(null);
    setCurrentTopic(null);
    setView("learning");
  };

  const handleActivityComplete = (stats) => {
    const totalActivities = currentTopic.activities.length;
    const score = Math.round((stats.correct / totalActivities) * 100);
    const completed = score >= 70;

    alert(
      `¡Actividad completada!\n\n` +
        `✅ Correctas: ${stats.correct}\n` +
        `❌ Incorrectas: ${stats.incorrect}\n` +
        `📊 Puntuación: ${score}%\n\n` +
        `${
          completed
            ? "🎉 ¡Has dominado este tema!"
            : "💪 Sigue practicando para mejorar"
        }`
    );

    setView("learning");
  };

  return (
    <div className="App">
      {view === "login" && (
        <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
      )}
      {view === "register" && (
        <Register
          onRegister={handleRegister}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {view === "survey" && user && (
        <Survey user={user} onSurveyComplete={handleSurveyComplete} />
      )}
      {view === "home" && user && (
        <Home
          user={user}
          onLogout={handleLogout}
          onStartLearning={handleStartLearning}
        />
      )}
      {view === "learning" && user && (
        <LearningMap
          user={user}
          onStartActivity={handleStartActivity}
          onBack={handleBackToHome}
        />
      )}
      {view === "activity" && user && currentSubject && currentTopic && (
        <Activity
          user={user}
          subject={currentSubject}
          topic={currentTopic}
          onComplete={handleActivityComplete}
          onBack={handleBackToLearning}
        />
      )}
    </div>
  );
}

export default App;
