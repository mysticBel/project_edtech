import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Survey from "./components/Survey";
import Home from "./components/Home";
import LearningMap from "./components/LearningMap";
import Activity from "./components/Activity";

function App() {
  const [view, setView] = useState("login"); // 'login', 'register', 'survey', 'home', 'learning', 'activity'
  const [user, setUser] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    // Si el usuario no ha completado la encuesta, mostrarla
    if (!userData.completedSurvey) {
      setView("survey");
    } else {
      setView("home");
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    // Después del registro, siempre mostrar la encuesta
    setView("survey");
  };

  const handleSurveyComplete = (updatedUser) => {
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
