import React, { useState } from "react";
import "./Activity.css";

function Activity({ user, subject, topic, onComplete, onBack }) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0, // racha de respuestas correctas
  });
  const [adaptiveMessage, setAdaptiveMessage] = useState("");

  const activities = topic.activities;
  const currentActivity = activities[currentActivityIndex];

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return; // No permitir cambiar respuesta si ya mostró feedback
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentActivity.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Actualizar estadísticas
    const newStats = {
      correct: correct ? stats.correct + 1 : stats.correct,
      incorrect: correct ? stats.incorrect : stats.incorrect + 1,
      streak: correct ? stats.streak + 1 : 0,
    };
    setStats(newStats);

    // Lógica adaptativa simulada
    if (correct && newStats.streak === 3) {
      setAdaptiveMessage(
        "¡Vas muy bien! 🎉 Vamos a intentar algo más desafiante"
      );
    } else if (!correct && newStats.incorrect >= 2 && newStats.streak === 0) {
      setAdaptiveMessage(
        "Vamos a practicar un poco más con ejercicios más sencillos 💪"
      );
    }
  };

  const handleNext = () => {
    if (currentActivityIndex < activities.length - 1) {
      // Siguiente actividad
      setCurrentActivityIndex(currentActivityIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setAdaptiveMessage("");
    } else {
      // Completó todas las actividades
      saveProgress();
      onComplete(stats);
    }
  };

  const saveProgress = () => {
    // Calcular puntuación
    const totalActivities = activities.length;
    const score = Math.round((stats.correct / totalActivities) * 100);

    // Determinar si completó el tema (70% o más)
    const completed = score >= 70;

    // Cargar progreso existente
    const progressKey = `progress_${user.id}`;
    const currentProgress = JSON.parse(
      localStorage.getItem(progressKey) || "{}"
    );

    // Actualizar progreso del tema
    const topicKey = `${subject.id}_${topic.id}`;
    const existingTopicProgress = currentProgress[topicKey] || {
      completed: false,
      score: 0,
      attempts: 0,
    };

    currentProgress[topicKey] = {
      completed: completed || existingTopicProgress.completed,
      score: Math.max(score, existingTopicProgress.score),
      attempts: existingTopicProgress.attempts + 1,
      lastAttempt: new Date().toISOString(),
    };

    // Guardar en localStorage
    localStorage.setItem(progressKey, JSON.stringify(currentProgress));
  };

  return (
    <div className="activity-container">
      <div className="activity-card">
        <div className="activity-header">
          <button onClick={onBack} className="back-button">
            ← Volver al Mapa
          </button>
          <h2>
            {subject.icon} {topic.name}
          </h2>
          <div className="activity-progress">
            <p>
              Actividad {currentActivityIndex + 1} de {activities.length}
            </p>
            <div className="stats">
              <span className="stat-correct">✅ {stats.correct}</span>
              <span className="stat-incorrect">❌ {stats.incorrect}</span>
            </div>
          </div>
        </div>

        {adaptiveMessage && (
          <div className="adaptive-message">{adaptiveMessage}</div>
        )}

        <div className="activity-content">
          <div className="question-section">
            <h3>Pregunta:</h3>
            <p className="question-text">{currentActivity.question}</p>
          </div>

          <div className="options-section">
            {currentActivity.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === option ? "selected" : ""
                } ${
                  showFeedback && option === currentActivity.correctAnswer
                    ? "correct"
                    : ""
                } ${
                  showFeedback && selectedAnswer === option && !isCorrect
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`feedback ${
                isCorrect ? "correct-feedback" : "incorrect-feedback"
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="feedback-icon">🎉</div>
                  <h3>¡Correcto!</h3>
                  <p>¡Excelente trabajo! Sigue así</p>
                </>
              ) : (
                <>
                  <div className="feedback-icon">💪</div>
                  <h3>Casi...</h3>
                  <p>
                    La respuesta correcta es:{" "}
                    <strong>{currentActivity.correctAnswer}</strong>
                  </p>
                  <p>¡No te preocupes! Sigue practicando</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="activity-actions">
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={!selectedAnswer}
            >
              Verificar Respuesta
            </button>
          ) : (
            <button onClick={handleNext} className="next-btn">
              {currentActivityIndex < activities.length - 1
                ? "Siguiente →"
                : "Terminar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activity;
