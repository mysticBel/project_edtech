# Arquitectura Técnica - Sistema de Rutas de Aprendizaje Adaptativas

## 📋 Referencia

**Historia de Usuario**: HU-004 - Ruta de Aprendizaje Adaptativa

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ALUMNO INTERACTÚA CON PLATAFORMA                 │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │  Dashboard   │  │  Actividades │  │  Progreso    │            │
│  │  Estudiante  │  │  Sugeridas   │  │  Visual      │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MOTOR DE ADAPTACIÓN                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Adaptive Learning Engine (Node.js + Python ML)             │  │
│  │                                                              │  │
│  │  1. Analizar rendimiento actual del alumno                  │  │
│  │  2. Consultar grafo de conocimientos (Neo4j)                │  │
│  │  3. Calcular siguiente actividad óptima                     │  │
│  │  4. Ajustar dificultad en tiempo real                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │     Neo4j       │  │  Redis Cache    │
│  (Actividades,  │  │  (Grafo de      │  │  (Estado del    │
│   Progreso)     │  │   Conocimientos)│  │   Aprendizaje)  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Node.js 18+** con TypeScript
- **Express.js 4.x** para APIs
- **Python 3.9+** para ML Engine
- **Neo4j 5+** para Grafo de Conocimientos

### Machine Learning

- **Algoritmo**: Knowledge Tracing (BKT - Bayesian Knowledge Tracing)
- **Librería**: PyBKT (Python)
- **Modelo alternativo**: Deep Knowledge Tracing (LSTM)

### Base de Datos

- **PostgreSQL**: Actividades, progreso histórico
- **Neo4j**: Relaciones entre conceptos
- **Redis**: Cache de rutas calculadas

---

## 🗄️ Modelo de Datos - PostgreSQL

### Tabla: `learning_activities`

```sql
CREATE TABLE learning_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    concept VARCHAR(100) NOT NULL, -- Concepto específico
    title VARCHAR(200) NOT NULL,
    description TEXT,
    activity_type VARCHAR(50) NOT NULL, -- 'video', 'exercise', 'quiz', 'game', 'reading'
    difficulty_level VARCHAR(20) NOT NULL, -- 'basic', 'intermediate', 'advanced'
    difficulty_score FLOAT NOT NULL, -- 0.0 a 1.0
    estimated_duration_minutes INTEGER,
    content_url TEXT, -- URL del contenido (video, juego, etc.)
    prerequisites UUID[], -- IDs de actividades prerequisito
    learning_objectives TEXT[], -- Objetivos de aprendizaje
    tags TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_subject ON learning_activities(subject);
CREATE INDEX idx_activities_concept ON learning_activities(concept);
CREATE INDEX idx_activities_difficulty ON learning_activities(difficulty_score);

-- Ejemplo: Actividad de Fracciones
INSERT INTO learning_activities VALUES (
    'act-frac-001',
    'mathematics',
    'fractions',
    'fraction_basics',
    '¿Qué es una Fracción? - Video Interactivo',
    'Aprende el concepto de fracción con pizzas y pasteles',
    'video',
    'basic',
    0.2,
    10,
    'https://cdn.edtech.com/videos/fractions-intro.mp4',
    ARRAY[]::UUID[], -- Sin prerequisitos
    ARRAY['Entender qué representa una fracción', 'Identificar numerador y denominador'],
    ARRAY['fracciones', 'básico', 'visual'],
    NOW(),
    NOW()
);
```

### Tabla: `student_progress`

```sql
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES learning_activities(id),
    status VARCHAR(20) NOT NULL, -- 'not_started', 'in_progress', 'completed', 'mastered'
    attempts INTEGER DEFAULT 0,
    score FLOAT, -- 0.0 a 100.0
    time_spent_seconds INTEGER,
    mastery_level FLOAT, -- 0.0 a 1.0 (calculado por BKT)
    last_attempt_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, activity_id)
);

CREATE INDEX idx_progress_user ON student_progress(user_id);
CREATE INDEX idx_progress_activity ON student_progress(activity_id);
CREATE INDEX idx_progress_status ON student_progress(status);
```

### Tabla: `learning_path_history`

```sql
CREATE TABLE learning_path_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(50) NOT NULL,
    path_version INTEGER, -- Para tracking de cambios
    activities_sequence UUID[], -- Orden de actividades recomendadas
    reasoning TEXT, -- Explicación del algoritmo
    generated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_path_user ON learning_path_history(user_id);
CREATE INDEX idx_path_active ON learning_path_history(is_active);
```

---

## 🕸️ Grafo de Conocimientos - Neo4j

### Modelo de Nodos y Relaciones

```cypher
// NODO: Concepto
CREATE (c:Concept {
    id: 'frac_basics',
    name: 'Fundamentos de Fracciones',
    subject: 'mathematics',
    topic: 'fractions',
    difficulty: 0.2,
    description: 'Qué es una fracción, numerador y denominador'
})

// NODO: Actividad
CREATE (a:Activity {
    id: 'act-frac-001',
    title: '¿Qué es una Fracción?',
    type: 'video',
    duration: 10,
    difficulty: 0.2
})

// RELACIÓN: Actividad enseña Concepto
CREATE (a)-[:TEACHES {effectiveness: 0.85}]->(c)

// RELACIÓN: Prerequisito
CREATE (c1:Concept {id: 'frac_basics', name: 'Fundamentos de Fracciones'})
CREATE (c2:Concept {id: 'frac_addition', name: 'Suma de Fracciones'})
CREATE (c1)<-[:REQUIRES {strength: 0.9}]-(c2)

// RELACIÓN: Progresión natural
CREATE (c1)-[:LEADS_TO {probability: 0.8}]->(c2)

// RELACIÓN: Habilidad del alumno en concepto
MATCH (u:User {id: 'user-123'}), (c:Concept {id: 'frac_basics'})
CREATE (u)-[:KNOWS {mastery: 0.75, last_updated: datetime()}]->(c)
```

### Consulta: Encontrar Siguiente Concepto Óptimo

```cypher
// Dado un alumno y su nivel actual, encontrar el siguiente concepto
MATCH (user:User {id: $userId})
MATCH (user)-[k:KNOWS]->(masteredConcept:Concept)
WHERE k.mastery >= 0.7 // Conceptos dominados

// Encontrar conceptos que requieren los dominados
MATCH (nextConcept:Concept)-[r:REQUIRES]->(masteredConcept)
WHERE NOT EXISTS((user)-[:KNOWS {mastery: >= 0.7}]->(nextConcept))

// Verificar que todos los prerequisitos estén cubiertos
WITH nextConcept, user,
     COUNT(DISTINCT r) AS totalPrereqs,
     SIZE([(nextConcept)-[:REQUIRES]->(prereq:Concept) | prereq]) AS requiredPrereqs
WHERE totalPrereqs = requiredPrereqs

// Encontrar actividades que enseñan ese concepto
MATCH (activity:Activity)-[t:TEACHES]->(nextConcept)

// Ordenar por efectividad y dificultad apropiada
WITH nextConcept, activity, t.effectiveness AS eff,
     ABS(activity.difficulty - $userLevel) AS difficultyGap
ORDER BY eff DESC, difficultyGap ASC
LIMIT 5

RETURN nextConcept.name AS concept,
       activity.title AS activity,
       activity.type AS type,
       activity.duration AS duration,
       activity.difficulty AS difficulty,
       eff AS effectiveness
```

---

## 🤖 Algoritmo de Adaptación

### Bayesian Knowledge Tracing (BKT)

El algoritmo estima 4 parámetros por concepto:

- **P(L₀)**: Probabilidad de que el alumno ya sepa el concepto antes de la actividad
- **P(T)**: Probabilidad de aprender el concepto tras completar la actividad
- **P(G)**: Probabilidad de adivinar (responder bien sin saber)
- **P(S)**: Probabilidad de error (responder mal sabiendo)

```python
# ml_engine/bkt_model.py

import numpy as np
from pybkt.models import Model

class AdaptiveLearningEngine:
    def __init__(self):
        self.bkt_model = Model(seed=42)

    def calculate_mastery(
        self,
        user_id: str,
        concept_id: str,
        activity_results: list
    ) -> float:
        """
        Calcula el nivel de dominio de un concepto

        activity_results: [
            {'correct': True, 'time_taken': 45},
            {'correct': False, 'time_taken': 120},
            {'correct': True, 'time_taken': 30}
        ]
        """
        # Preparar datos para BKT
        observations = [int(r['correct']) for r in activity_results]

        # Entrenar modelo BKT
        self.bkt_model.fit(
            data=[observations],
            skills=[concept_id]
        )

        # Obtener probabilidad de conocimiento actual P(Ln)
        mastery = self.bkt_model.predict(
            data=[observations],
            skills=[concept_id]
        )[-1][0]

        return mastery

    def recommend_next_activity(
        self,
        user_id: str,
        subject: str,
        current_mastery_levels: dict
    ) -> dict:
        """
        Recomienda la siguiente actividad óptima

        current_mastery_levels: {
            'frac_basics': 0.85,
            'frac_parts': 0.60,
            'frac_comparison': 0.30
        }
        """
        # 1. Consultar Neo4j para conceptos disponibles
        candidate_concepts = self._get_candidate_concepts(
            user_id,
            subject,
            current_mastery_levels
        )

        # 2. Para cada candidato, calcular score
        scored_concepts = []
        for concept in candidate_concepts:
            score = self._calculate_concept_score(
                concept,
                current_mastery_levels
            )
            scored_concepts.append({
                'concept': concept,
                'score': score
            })

        # 3. Seleccionar el concepto con mayor score
        best_concept = max(scored_concepts, key=lambda x: x['score'])

        # 4. Seleccionar actividad apropiada para ese concepto
        activity = self._select_activity_for_concept(
            best_concept['concept'],
            current_mastery_levels.get(best_concept['concept']['id'], 0)
        )

        return {
            'concept': best_concept['concept'],
            'activity': activity,
            'reasoning': self._explain_recommendation(
                best_concept,
                current_mastery_levels
            )
        }

    def _calculate_concept_score(
        self,
        concept: dict,
        current_mastery: dict
    ) -> float:
        """
        Score = Importancia × Preparación × Urgencia
        """
        # Importancia (según currículo)
        importance = concept.get('curriculum_weight', 0.5)

        # Preparación (prerequisitos cumplidos)
        prereqs = concept.get('prerequisites', [])
        if prereqs:
            prereq_mastery = [
                current_mastery.get(p, 0) for p in prereqs
            ]
            preparation = np.mean(prereq_mastery)
        else:
            preparation = 1.0

        # Urgencia (diferencia entre meta y nivel actual)
        target_mastery = 0.8
        current = current_mastery.get(concept['id'], 0)
        urgency = max(0, target_mastery - current)

        # Score final
        score = importance * preparation * (1 + urgency)

        return score

    def adjust_difficulty_realtime(
        self,
        user_id: str,
        activity_id: str,
        performance_data: dict
    ) -> dict:
        """
        Ajusta dificultad durante la actividad

        performance_data: {
            'correct_streak': 5,
            'avg_response_time': 20,
            'mistakes': 1
        }
        """
        correct_streak = performance_data['correct_streak']
        avg_time = performance_data['avg_response_time']
        mistakes = performance_data['mistakes']

        # Reglas de ajuste
        if correct_streak >= 5 and avg_time < 30:
            # Muy fácil → Aumentar dificultad
            return {
                'action': 'increase_difficulty',
                'magnitude': 0.2,
                'reason': 'Alumno responde correctamente muy rápido'
            }
        elif mistakes >= 3 and avg_time > 90:
            # Muy difícil → Disminuir dificultad
            return {
                'action': 'decrease_difficulty',
                'magnitude': 0.2,
                'reason': 'Alumno tiene muchos errores y demora mucho'
            }
        elif correct_streak >= 3 and mistakes <= 1:
            # Nivel apropiado → Mantener
            return {
                'action': 'maintain',
                'magnitude': 0,
                'reason': 'Nivel de desafío adecuado'
            }
        else:
            # Sin cambios
            return {
                'action': 'maintain',
                'magnitude': 0,
                'reason': 'Recolectando más datos'
            }
```

### API Node.js - Adaptación

```typescript
// controllers/adaptive-learning.controller.ts

import { Request, Response } from "express";
import axios from "axios";

const ML_ENGINE_URL = process.env.ML_ENGINE_URL || "http://localhost:5000";

export async function getRecommendedPath(req: Request, res: Response) {
  const userId = req.user.id;
  const { subject } = req.params;

  try {
    // 1. Obtener nivel actual del alumno en todos los conceptos
    const currentMastery = await calculateCurrentMastery(userId, subject);

    // 2. Llamar al motor ML para recomendación
    const response = await axios.post(`${ML_ENGINE_URL}/api/recommend`, {
      user_id: userId,
      subject: subject,
      current_mastery: currentMastery,
    });

    const recommendation = response.data;

    // 3. Guardar en historial
    await saveLearningPath(userId, subject, recommendation);

    // 4. Cachear en Redis (5 minutos)
    await redisClient.setex(
      `learning_path:${userId}:${subject}`,
      300,
      JSON.stringify(recommendation)
    );

    res.json({
      success: true,
      recommendation: {
        concept: recommendation.concept.name,
        activity: {
          id: recommendation.activity.id,
          title: recommendation.activity.title,
          type: recommendation.activity.type,
          duration: recommendation.activity.duration,
          difficulty: recommendation.activity.difficulty,
        },
        reasoning: recommendation.reasoning,
        estimatedMasteryGain: recommendation.expected_mastery_increase,
      },
    });
  } catch (error) {
    console.error("Error getting recommendation:", error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
}

async function calculateCurrentMastery(
  userId: string,
  subject: string
): Promise<Record<string, number>> {
  // Consultar progreso del alumno
  const progress = await db.query(
    `
        SELECT 
            la.concept,
            sp.mastery_level,
            sp.score,
            sp.attempts
        FROM student_progress sp
        JOIN learning_activities la ON sp.activity_id = la.id
        WHERE sp.user_id = $1 AND la.subject = $2
    `,
    [userId, subject]
  );

  // Agrupar por concepto
  const mastery: Record<string, number> = {};
  for (const row of progress.rows) {
    const concept = row.concept;
    if (!mastery[concept] || mastery[concept] < row.mastery_level) {
      mastery[concept] = row.mastery_level;
    }
  }

  return mastery;
}
```

---

## 📊 Visualización del Dashboard

### Ruta de Aprendizaje Visual

```
┌──────────────────────────────────────────────────────────────┐
│  🎯 Tu Ruta de Aprendizaje en Matemáticas                   │
│                                                              │
│  Progreso General: [████████░░] 75% completado              │
└──────────────────────────────────────────────────────────────┘

    ✅ Fundamentos de Fracciones
         Dominio: 85% ⭐⭐⭐
         │
         ▼
    ✅ Partes de una Fracción
         Dominio: 75% ⭐⭐⭐
         │
         ▼
    🔄 Comparación de Fracciones (EN PROGRESO)
         Dominio: 60% ⭐⭐
         │
         │   📌 Actividad Actual:
         │   "Compara Fracciones - Juego Interactivo"
         │   Tiempo estimado: 15 min
         │   [Continuar →]
         │
         ▼
    🔒 Suma de Fracciones con Igual Denominador
         (Desbloquea al dominar Comparación al 70%)
         │
         ▼
    🔒 Suma de Fracciones con Diferente Denominador
         (Desbloquea al dominar Suma Básica al 80%)

┌──────────────────────────────────────────────────────────────┐
│  💡 Recomendación Personalizada                              │
│                                                              │
│  Hemos notado que aprendes rápido cuando:                   │
│  • Ves ejemplos visuales con dibujos                        │
│  • Practicas con juegos interactivos                        │
│                                                              │
│  Por eso, tu siguiente actividad será:                      │
│  🎮 "Batalla de Fracciones" - Juego de comparación          │
│                                                              │
│  [Empezar Actividad →]                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing

```typescript
describe("Adaptive Learning Engine", () => {
  it("should recommend next concept based on mastery", async () => {
    const mastery = {
      frac_basics: 0.85,
      frac_parts: 0.75,
    };

    const recommendation = await getRecommendation(
      "user-123",
      "mathematics",
      mastery
    );

    expect(recommendation.concept).toBe("frac_comparison");
    expect(recommendation.activity.difficulty).toBeCloseTo(0.6, 1);
  });

  it("should increase difficulty after 5 correct answers", async () => {
    const adjustment = adjustDifficultyRealtime({
      correct_streak: 5,
      avg_response_time: 25,
      mistakes: 0,
    });

    expect(adjustment.action).toBe("increase_difficulty");
    expect(adjustment.magnitude).toBe(0.2);
  });
});
```

---

**Última actualización**: 09/11/2025
