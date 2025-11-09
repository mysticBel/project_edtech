import React, { useState } from 'react';
import './Survey.css';

function Survey({ user, onSurveyComplete }) {
  const [step, setStep] = useState(1);
  const [surveyData, setSurveyData] = useState({
    grado: '',
    materiasFavoritas: [],
    materiasNecesitanAyuda: [],
    estiloAprendizaje: '',
    pasatiempos: []
  });

  const grados = ['3° Primaria', '4° Primaria', '5° Primaria', '6° Primaria'];
  const materias = ['Matemáticas', 'Lengua', 'Ciencias', 'Inglés', 'Historia', 'Geografía'];
  const estilos = [
    { value: 'visual', label: 'Viendo videos e imágenes', icon: '📺' },
    { value: 'lectura', label: 'Leyendo', icon: '📚' },
    { value: 'practica', label: 'Haciendo ejercicios', icon: '✏️' },
    { value: 'juegos', label: 'Jugando', icon: '🎮' }
  ];
  const pasatiempos = ['Deportes', 'Arte', 'Música', 'Lectura', 'Videojuegos', 'Ciencia'];

  const handleGradoSelect = (grado) => {
    setSurveyData({ ...surveyData, grado });
    setStep(2);
  };

  const toggleMateria = (materia, tipo) => {
    const key = tipo === 'favorita' ? 'materiasFavoritas' : 'materiasNecesitanAyuda';
    const current = surveyData[key];
    const updated = current.includes(materia)
      ? current.filter(m => m !== materia)
      : [...current, materia];
    setSurveyData({ ...surveyData, [key]: updated });
  };

  const handleEstiloSelect = (estilo) => {
    setSurveyData({ ...surveyData, estiloAprendizaje: estilo });
    setStep(4);
  };

  const togglePasatiempo = (pasatiempo) => {
    const current = surveyData.pasatiempos;
    const updated = current.includes(pasatiempo)
      ? current.filter(p => p !== pasatiempo)
      : [...current, pasatiempo];
    setSurveyData({ ...surveyData, pasatiempos: updated });
  };

  const handleComplete = () => {
    // Guardar en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id 
        ? { ...u, completedSurvey: true, surveyData }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Notificar que se completó
    onSurveyComplete({ ...user, completedSurvey: true, surveyData });
  };

  const handleSkip = () => {
    if (window.confirm('¿Seguro que quieres saltarte la encuesta? Te ayudará a tener mejores recomendaciones.')) {
      onSurveyComplete(user);
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <div className="survey-header">
          <h1>¡Hola {user.nombre}! 👋</h1>
          <p>Vamos a conocernos mejor para personalizar tu experiencia</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
          <p className="step-indicator">Paso {step} de 4</p>
        </div>

        {step === 1 && (
          <div className="survey-step">
            <h2>¿En qué grado estás?</h2>
            <div className="options-grid">
              {grados.map(grado => (
                <button
                  key={grado}
                  className="option-button"
                  onClick={() => handleGradoSelect(grado)}
                >
                  {grado}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="survey-step">
            <h2>Selecciona tus materias favoritas</h2>
            <p className="hint">Puedes elegir varias</p>
            <div className="options-grid">
              {materias.map(materia => (
                <button
                  key={materia}
                  className={`option-button ${surveyData.materiasFavoritas.includes(materia) ? 'selected' : ''}`}
                  onClick={() => toggleMateria(materia, 'favorita')}
                >
                  {materia}
                </button>
              ))}
            </div>
            <button 
              className="next-button" 
              onClick={() => setStep(3)}
              disabled={surveyData.materiasFavoritas.length === 0}
            >
              Siguiente →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="survey-step">
            <h2>¿Cómo te gusta aprender?</h2>
            <div className="options-grid">
              {estilos.map(estilo => (
                <button
                  key={estilo.value}
                  className="option-button large"
                  onClick={() => handleEstiloSelect(estilo.value)}
                >
                  <span className="icon">{estilo.icon}</span>
                  <span>{estilo.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="survey-step">
            <h2>¿Qué te gusta hacer en tu tiempo libre?</h2>
            <p className="hint">Puedes elegir varios</p>
            <div className="options-grid">
              {pasatiempos.map(pasatiempo => (
                <button
                  key={pasatiempo}
                  className={`option-button ${surveyData.pasatiempos.includes(pasatiempo) ? 'selected' : ''}`}
                  onClick={() => togglePasatiempo(pasatiempo)}
                >
                  {pasatiempo}
                </button>
              ))}
            </div>
            <button 
              className="complete-button" 
              onClick={handleComplete}
              disabled={surveyData.pasatiempos.length === 0}
            >
              ¡Terminar! 🎉
            </button>
          </div>
        )}

        <button className="skip-button" onClick={handleSkip}>
          Saltar encuesta (no recomendado)
        </button>
      </div>
    </div>
  );
}

export default Survey;
