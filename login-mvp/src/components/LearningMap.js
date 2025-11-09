import React, { useState, useEffect } from 'react';
import './LearningMap.css';
import learningPathsData from '../data/learningPaths.json';

function LearningMap({ user, onStartActivity, onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Cargar progreso del usuario desde localStorage
    const userProgress = JSON.parse(localStorage.getItem(`progress_${user.id}`) || '{}');
    setProgress(userProgress);
  }, [user.id]);

  const getTopicStatus = (subjectId, topicId) => {
    const key = `${subjectId}_${topicId}`;
    return progress[key] || { completed: false, locked: false, score: 0, attempts: 0 };
  };

  const isTopicUnlocked = (subjectId, topicOrder) => {
    if (topicOrder === 1) return true; // Primer tema siempre desbloqueado
    
    // Buscar el tema anterior
    const subject = learningPathsData.subjects.find(s => s.id === subjectId);
    const previousTopic = subject.topics.find(t => t.order === topicOrder - 1);
    
    if (!previousTopic) return true;
    
    const prevStatus = getTopicStatus(subjectId, previousTopic.id);
    return prevStatus.completed;
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleTopicClick = (topic) => {
    const unlocked = isTopicUnlocked(selectedSubject.id, topic.order);
    if (unlocked) {
      onStartActivity(selectedSubject, topic);
    }
  };

  if (!selectedSubject) {
    return (
      <div className="learning-map-container">
        <div className="learning-map-card">
          <div className="map-header">
            <button onClick={onBack} className="back-button">← Volver</button>
            <h1>Mis Rutas de Aprendizaje 🗺️</h1>
            <p>Selecciona una materia para comenzar tu aventura</p>
          </div>

          <div className="subjects-grid">
            {learningPathsData.subjects.map(subject => {
              const completedTopics = subject.topics.filter(topic => 
                getTopicStatus(subject.id, topic.id).completed
              ).length;
              const totalTopics = subject.topics.length;
              const percentage = Math.round((completedTopics / totalTopics) * 100);

              return (
                <div 
                  key={subject.id} 
                  className="subject-card"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="subject-icon">{subject.icon}</div>
                  <h3>{subject.name}</h3>
                  <div className="subject-progress">
                    <div className="progress-bar-small">
                      <div 
                        className="progress-fill-small" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p>{completedTopics} de {totalTopics} temas</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Vista de mapa de temas
  return (
    <div className="learning-map-container">
      <div className="learning-map-card wide">
        <div className="map-header">
          <button onClick={() => setSelectedSubject(null)} className="back-button">
            ← Materias
          </button>
          <h1>{selectedSubject.icon} {selectedSubject.name}</h1>
          <p>Tu mapa de conocimiento</p>
        </div>

        <div className="topics-map">
          {selectedSubject.topics.map((topic, index) => {
            const status = getTopicStatus(selectedSubject.id, topic.id);
            const unlocked = isTopicUnlocked(selectedSubject.id, topic.order);
            
            return (
              <div key={topic.id} className="topic-container">
                {index > 0 && <div className="topic-connector"></div>}
                <div 
                  className={`topic-node ${status.completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="topic-status-icon">
                    {status.completed ? '✅' : unlocked ? '🔵' : '🔒'}
                  </div>
                  <h3>{topic.name}</h3>
                  <p className="topic-difficulty">
                    {topic.difficulty === 'facil' ? '⭐ Fácil' : 
                     topic.difficulty === 'medio' ? '⭐⭐ Medio' : '⭐⭐⭐ Difícil'}
                  </p>
                  {status.attempts > 0 && (
                    <p className="topic-score">Mejor: {status.score}%</p>
                  )}
                  {!unlocked && (
                    <p className="topic-locked-msg">Completa el tema anterior</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LearningMap;
