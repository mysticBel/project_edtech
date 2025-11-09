# Arquitectura Técnica - Sistema de Encuesta Inicial y Evaluación de Nivel

## 📋 Referencia

**Historia de Usuario**: HU-003 - Encuesta Inicial para Conocer al Alumno

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Wizard UI   │  │  Preguntas   │  │  Resultados  │      │
│  │  (Stepper)   │  │  Adaptativas │  │   Visuales   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE API                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Assessment Service                           │   │
│  │  - GET  /api/v1/assessment/start                     │   │
│  │  - POST /api/v1/assessment/answer                    │   │
│  │  - GET  /api/v1/assessment/next-question             │   │
│  │  - POST /api/v1/assessment/complete                  │   │
│  │  - GET  /api/v1/assessment/results/:userId           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │    Redis     │  │  ML Service  │
│ (Preguntas,  │  │  (Progreso   │  │ (Clasificador│
│  Respuestas) │  │  temporal)   │  │  de Nivel)   │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Lenguaje**: Node.js 18+ con TypeScript
- **Framework**: Express.js 4.x
- **ML**: Python 3.9+ con Scikit-learn
- **IRT Model**: Item Response Theory library

### Frontend

- **Framework**: React 18+
- **Wizard**: Material-UI Stepper
- **Charts**: Recharts para visualización de resultados
- **Progress**: React-circular-progressbar

---

## 🗄️ Modelo de Datos

### Tabla: `assessment_questions`

```sql
CREATE TABLE assessment_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(50) NOT NULL, -- 'math', 'language', 'science'
    topic VARCHAR(100) NOT NULL, -- 'fractions', 'grammar', 'biology'
    difficulty_level VARCHAR(20) NOT NULL, -- 'basic', 'intermediate', 'advanced'
    difficulty_score FLOAT NOT NULL, -- 0.0 a 1.0 (IRT parameter)
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL, -- 'multiple_choice', 'true_false', 'fill_blank'
    correct_answer TEXT NOT NULL,
    options JSONB, -- Para multiple choice: ["A", "B", "C", "D"]
    explanation TEXT, -- Explicación de la respuesta
    time_limit_seconds INTEGER DEFAULT 120,
    grade_level INTEGER, -- 3, 4, 5, 6 (primaria)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_questions_subject ON assessment_questions(subject);
CREATE INDEX idx_questions_difficulty ON assessment_questions(difficulty_level);
CREATE INDEX idx_questions_grade ON assessment_questions(grade_level);

-- Ejemplo de pregunta
INSERT INTO assessment_questions VALUES (
    gen_random_uuid(),
    'math',
    'basic_arithmetic',
    'basic',
    0.3, -- Fácil
    '¿Cuánto es 7 + 5?',
    'multiple_choice',
    '12',
    '["10", "11", "12", "13"]'::jsonb,
    'Sumamos 7 + 5 = 12',
    60,
    3,
    NOW(),
    NOW()
);
```

### Tabla: `assessment_attempts`

```sql
CREATE TABLE assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP NULL,
    status VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
    total_questions INTEGER,
    questions_answered INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_attempts_user ON assessment_attempts(user_id);
CREATE INDEX idx_attempts_status ON assessment_attempts(status);
```

### Tabla: `assessment_answers`

```sql
CREATE TABLE assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES assessment_questions(id),
    user_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INTEGER,
    answered_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_answers_attempt ON assessment_answers(attempt_id);
CREATE INDEX idx_answers_question ON assessment_answers(question_id);
```

### Tabla: `assessment_results`

```sql
CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    attempt_id UUID REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    subject VARCHAR(50) NOT NULL,
    level_assigned VARCHAR(20) NOT NULL, -- 'basic', 'intermediate', 'advanced'
    confidence_score FLOAT, -- 0.0 a 1.0 (confianza del modelo)
    total_correct INTEGER,
    total_questions INTEGER,
    accuracy_percentage FLOAT,
    avg_time_per_question FLOAT,
    estimated_ability FLOAT, -- IRT theta parameter (-3 a +3)
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_results_user ON assessment_results(user_id);
CREATE INDEX idx_results_subject ON assessment_results(subject);
```

### Tabla: `student_profiles` (extensión)

```sql
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    learning_style VARCHAR(50); -- 'visual', 'auditory', 'kinesthetic', 'mixed'

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    interests TEXT[]; -- ['sports', 'art', 'music', 'reading', 'gaming']

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    favorite_subjects TEXT[]; -- ['math', 'language', 'science']

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    difficult_subjects TEXT[]; -- ['math', 'history']

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    assessment_completed BOOLEAN DEFAULT FALSE;

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS
    assessment_completed_at TIMESTAMP NULL;
```

---

## 🔄 Flujo de Evaluación Adaptativa

### Algoritmo de Selección de Preguntas (CAT - Computerized Adaptive Testing)

```
Alumno inicia encuesta
                │
                ▼
┌───────────────────────────────────────────────┐
│ Sección 1: Información Personal               │
│ - Grado escolar: 5° primaria                  │
│ - Materias favoritas: Matemáticas, Arte       │
│ - Materias difíciles: Lengua                  │
│ - Estilo de aprendizaje: Visual + Juegos      │
│ - Intereses: Deportes, Videojuegos            │
└───────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────┐
│ Sección 2: Evaluación por Materia            │
│                                               │
│ Para cada materia (Matemáticas, Lengua,      │
│ Ciencias): 8-10 preguntas adaptativas        │
└───────────────────────────────────────────────┘
                │
                ▼
Iniciar con pregunta de dificultad MEDIA (0.5)
                │
                ▼
┌───────────────────────────────────────────────┐
│ Pregunta 1 (Dificultad: 0.5)                  │
│ "¿Cuánto es 12 × 8?"                          │
│ Opciones: [84, 96, 104, 108]                  │
└───────────────────────────────────────────────┘
                │
        ┌───────┴───────┐
        │               │
    CORRECTO      INCORRECTO
    (Rápido)      (Lento)
        │               │
        ▼               ▼
Aumentar           Disminuir
dificultad         dificultad
    │               │
    ▼               ▼
Pregunta 2     Pregunta 2
(Dif: 0.7)     (Dif: 0.3)
    │               │
    └───────┬───────┘
            ▼
Continuar adaptando según respuestas
            │
            ▼
Después de 8-10 preguntas:
Calcular nivel estimado con IRT
            │
            ▼
┌───────────────────────────────────────────────┐
│ Clasificación Final:                          │
│                                               │
│ Si θ < -1.0  → BÁSICO                         │
│ Si -1.0 ≤ θ ≤ 1.0 → INTERMEDIO               │
│ Si θ > 1.0   → AVANZADO                       │
│                                               │
│ θ (theta) = parámetro de habilidad IRT       │
└───────────────────────────────────────────────┘
```

### Código del Algoritmo Adaptativo

```typescript
// Service: assessment.service.ts

interface AdaptiveState {
  attemptId: string;
  userId: string;
  subject: string;
  currentTheta: number; // Habilidad estimada (-3 a +3)
  questionsAsked: number;
  maxQuestions: number;
}

async function getNextQuestion(state: AdaptiveState): Promise<Question> {
  const { subject, currentTheta, questionsAsked, maxQuestions } = state;

  // Si es la primera pregunta, empezar con dificultad media
  if (questionsAsked === 0) {
    return await findQuestionByDifficulty(subject, 0.5);
  }

  // Si ya llegamos al máximo, terminar
  if (questionsAsked >= maxQuestions) {
    return null; // Fin de la evaluación
  }

  // Calcular dificultad objetivo basada en theta actual
  // Teoría: La mejor pregunta tiene dificultad ≈ habilidad
  const targetDifficulty = thetaToDifficulty(currentTheta);

  // Buscar pregunta no respondida con dificultad cercana
  const question = await findQuestionByDifficulty(
    subject,
    targetDifficulty,
    state.attemptId // Excluir ya respondidas
  );

  return question;
}

function thetaToDifficulty(theta: number): number {
  // Mapear theta (-3 a +3) a dificultad (0.0 a 1.0)
  // theta = -3 → difficulty = 0.0 (muy fácil)
  // theta =  0 → difficulty = 0.5 (media)
  // theta = +3 → difficulty = 1.0 (muy difícil)
  return (theta + 3) / 6;
}

async function updateThetaEstimate(
  state: AdaptiveState,
  question: Question,
  isCorrect: boolean,
  timeTaken: number
): Promise<number> {
  // Item Response Theory (IRT) - Modelo de Rasch simplificado
  const b = question.difficulty_score; // Dificultad del ítem
  const theta = state.currentTheta;

  // Probabilidad de respuesta correcta según IRT
  const expectedP = 1 / (1 + Math.exp(-(theta - b)));

  // Actualizar theta según si acertó o no
  const actualP = isCorrect ? 1 : 0;
  const error = actualP - expectedP;

  // Factor de aprendizaje (learning rate)
  const learningRate = 0.3;

  // Penalizar si tardó mucho (>2x tiempo esperado)
  const timePenalty = timeTaken > question.time_limit_seconds * 2 ? 0.1 : 0;

  const newTheta = theta + learningRate * error - timePenalty;

  // Limitar theta entre -3 y +3
  return Math.max(-3, Math.min(3, newTheta));
}

function classifyLevel(theta: number): string {
  if (theta < -1.0) return "basic";
  if (theta <= 1.0) return "intermediate";
  return "advanced";
}

function calculateConfidence(theta: number, questionsAnswered: number): number {
  // Confianza aumenta con más preguntas
  const baseConfidence = questionsAnswered / 10; // Max 1.0

  // Confianza disminuye si theta está cerca de umbrales
  const distanceToThreshold = Math.min(
    Math.abs(theta - -1.0),
    Math.abs(theta - 1.0)
  );

  const thresholdPenalty = Math.max(0, 0.3 - distanceToThreshold);

  return Math.min(1.0, baseConfidence - thresholdPenalty);
}
```

---

## 📊 Visualización de Resultados

### Estructura de Respuesta al Completar Encuesta

```json
{
  "attemptId": "abc-123",
  "userId": "user-456",
  "completedAt": "2025-11-09T15:30:00Z",
  "results": {
    "mathematics": {
      "level": "intermediate",
      "confidence": 0.85,
      "theta": 0.4,
      "accuracy": 75,
      "totalQuestions": 10,
      "totalCorrect": 7.5,
      "avgTimePerQuestion": 45.2,
      "strengths": ["multiplication", "fractions"],
      "weaknesses": ["division", "decimals"]
    },
    "language": {
      "level": "basic",
      "confidence": 0.78,
      "theta": -1.2,
      "accuracy": 60,
      "totalQuestions": 8,
      "totalCorrect": 4.8,
      "avgTimePerQuestion": 52.7,
      "strengths": ["reading_comprehension"],
      "weaknesses": ["grammar", "spelling"]
    },
    "science": {
      "level": "advanced",
      "confidence": 0.92,
      "theta": 1.8,
      "accuracy": 90,
      "totalQuestions": 10,
      "totalCorrect": 9,
      "avgTimePerQuestion": 38.5,
      "strengths": ["biology", "scientific_method"],
      "weaknesses": []
    }
  },
  "profile": {
    "learningStyle": "visual",
    "interests": ["sports", "videogames", "science"],
    "favoriteSubjects": ["science", "mathematics"],
    "difficultSubjects": ["language"]
  },
  "recommendations": [
    {
      "subject": "mathematics",
      "topics": ["division_practice", "decimal_introduction"],
      "priority": "high"
    },
    {
      "subject": "language",
      "topics": ["grammar_basics", "spelling_exercises"],
      "priority": "high"
    },
    {
      "subject": "science",
      "topics": ["advanced_biology", "chemistry_intro"],
      "priority": "medium"
    }
  ]
}
```

### Pantalla de Resultados para el Alumno

```
┌──────────────────────────────────────────────────────────┐
│           🎉 ¡Completaste la Encuesta!                   │
│                                                          │
│  Estos son tus resultados:                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  📊 Tu Nivel por Materia                                 │
│                                                          │
│  📐 Matemáticas      [████████░░] 75%  ⭐ Intermedio    │
│                                                          │
│     ✅ Dominas: Multiplicación, Fracciones              │
│     📝 Practicar: División, Decimales                   │
│                                                          │
│  📚 Lengua           [██████░░░░] 60%  ⭐ Básico        │
│                                                          │
│     ✅ Dominas: Lectura y comprensión                   │
│     📝 Practicar: Gramática, Ortografía                 │
│                                                          │
│  🔬 Ciencias         [█████████░] 90%  ⭐ Avanzado      │
│                                                          │
│     ✅ Dominas: Biología, Método científico             │
│     🎯 Desafíos: Química avanzada                       │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  🎨 Tu Estilo de Aprendizaje                             │
│                                                          │
│  Aprendes mejor con: 👁️ Visual + 🎮 Juegos             │
│                                                          │
│  Por eso te vamos a recomendar:                         │
│  • Videos explicativos                                   │
│  • Diagramas y mapas mentales                           │
│  • Ejercicios interactivos tipo juego                   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  🚀 Actividades Recomendadas para Ti                     │
│                                                          │
│  1. 🎯 División Paso a Paso (Matemáticas)               │
│     Dificultad: Media | Tiempo: 15 min                  │
│     [Empezar →]                                          │
│                                                          │
│  2. 📝 Gramática Divertida (Lengua)                     │
│     Dificultad: Básica | Tiempo: 10 min                 │
│     [Empezar →]                                          │
│                                                          │
│  3. 🔬 Experimentos de Química (Ciencias)               │
│     Dificultad: Avanzada | Tiempo: 20 min               │
│     [Empezar →]                                          │
└──────────────────────────────────────────────────────────┘

                    [Ver mi Dashboard 📊]
```

---

## 🧪 Testing

### Casos de Prueba

```typescript
describe('Adaptive Assessment', () => {
    it('should start with medium difficulty question', async () => {
        const attempt = await startAssessment(userId, 'mathematics');
        const firstQuestion = await getNextQuestion(attempt.id);

        expect(firstQuestion.difficulty_score).toBeCloseTo(0.5, 1);
    });

    it('should increase difficulty after correct answer', async () => {
        // Respuesta correcta rápida
        const newTheta = await updateThetaEstimate(
            { currentTheta: 0, ... },
            { difficulty_score: 0.5, ... },
            true, // correcto
            30 // rápido
        );

        expect(newTheta).toBeGreaterThan(0);
    });

    it('should classify as basic when theta < -1', async () => {
        const level = classifyLevel(-1.5);
        expect(level).toBe('basic');
    });

    it('should complete assessment after 10 questions', async () => {
        // Simular 10 respuestas
        const results = await completeAssessment(attemptId);

        expect(results.totalQuestions).toBe(10);
        expect(results.level).toBeDefined();
        expect(results.confidence).toBeGreaterThan(0.7);
    });
});
```

---

## 📚 Referencias

- **Item Response Theory**: Baker, F. B. (2001). _The Basics of Item Response Theory_
- **Computerized Adaptive Testing**: Wainer, H. (2000). _Computerized Adaptive Testing: A Primer_
- **Educational Assessment**: Bloom's Taxonomy of Educational Objectives

---

**Última actualización**: 09/11/2025
