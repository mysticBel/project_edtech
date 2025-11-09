# Arquitectura Técnica - Sistema de Feedback Inteligente con IA

## 📋 Referencia

**Historia de Usuario**: HU-005 - Feedback Inmediato e Inteligente para el Alumno

---

## 🏗️ Arquitectura General

```
┌────────────────────────────────────────────────────────────────┐
│                 ALUMNO COMPLETA EJERCICIO                      │
│                                                                │
│  Respuesta del alumno: "12 × 8 = 84"  ❌                      │
└────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────────┐
│              SISTEMA DE ANÁLISIS DE RESPUESTAS                 │
│                                                                │
│  1. Detectar tipo de error (concepto, cálculo, distracción)   │
│  2. Analizar historial de errores similares                   │
│  3. Identificar patrón (¿error recurrente?)                   │
└────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                 GENERADOR DE FEEDBACK (GPT-4)                  │
│                                                                │
│  Entrada:                                                      │
│  - Pregunta: "¿Cuánto es 12 × 8?"                            │
│  - Respuesta correcta: "96"                                   │
│  - Respuesta del alumno: "84"                                 │
│  - Edad: 10 años                                              │
│  - Historial: 3 errores similares en multiplicación           │
│                                                                │
│  Salida (feedback personalizado):                             │
│  "¡Casi! Tu respuesta 84 está cerca. Recuerda:               │
│   12 × 8 es como sumar 12 ocho veces.                        │
│   Intenta con: 12 + 12 + 12 + 12 + 12 + 12 + 12 + 12        │
│   ¿Qué te da? 🤔"                                            │
└────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                CHATBOT TUTOR VIRTUAL (OPCIONAL)                │
│                                                                │
│  Si el alumno sigue con dudas:                                │
│  Alumno: "No entiendo por qué es 96"                          │
│  Tutor: "Te muestro un truco: 12 × 8 = 12 × 10 - 12 × 2     │
│          = 120 - 24 = 96. ¿Te ayuda esto? 😊"               │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Node.js 18+** con TypeScript
- **Express.js 4.x**
- **OpenAI API** (GPT-4 para generación de feedback)
- **Langchain** (para prompt engineering)

### Base de Datos

- **PostgreSQL**: Historial de errores, patrones
- **Redis**: Cache de feedback frecuentes

### Frontend

- **React 18+**
- **Framer Motion** (animaciones de feedback)
- **React-Toastify** (notificaciones)

---

## 🗄️ Modelo de Datos

### Tabla: `exercise_submissions`

```sql
CREATE TABLE exercise_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES learning_activities(id),
    question_id UUID,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    user_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INTEGER,
    attempt_number INTEGER DEFAULT 1,
    submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_submissions_user ON exercise_submissions(user_id);
CREATE INDEX idx_submissions_activity ON exercise_submissions(activity_id);
CREATE INDEX idx_submissions_correct ON exercise_submissions(is_correct);
```

### Tabla: `error_patterns`

```sql
CREATE TABLE error_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(50) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    error_type VARCHAR(50) NOT NULL, -- 'conceptual', 'calculation', 'careless', 'reading'
    description TEXT,
    occurrences INTEGER DEFAULT 1,
    first_seen_at TIMESTAMP DEFAULT NOW(),
    last_seen_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' -- 'active', 'improving', 'resolved'
);

CREATE INDEX idx_patterns_user ON error_patterns(user_id);
CREATE INDEX idx_patterns_concept ON error_patterns(concept);
CREATE INDEX idx_patterns_status ON error_patterns(status);

-- Ejemplo de patrón detectado
INSERT INTO error_patterns VALUES (
    gen_random_uuid(),
    'user-123',
    'mathematics',
    'multiplication',
    'calculation',
    'Confunde 12×8 con 12×7 (responde 84 en lugar de 96)',
    3, -- Ha ocurrido 3 veces
    '2025-01-05 10:00:00',
    '2025-01-07 14:30:00',
    'active'
);
```

### Tabla: `feedback_generated`

```sql
CREATE TABLE feedback_generated (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES exercise_submissions(id),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    feedback_text TEXT NOT NULL,
    feedback_type VARCHAR(30) NOT NULL, -- 'corrective', 'encouraging', 'explanatory', 'hint'
    generation_method VARCHAR(20), -- 'gpt4', 'template', 'cached'
    tokens_used INTEGER, -- Para control de costos
    generated_at TIMESTAMP DEFAULT NOW(),
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5), -- Opcional: alumno califica feedback
    rated_at TIMESTAMP
);

CREATE INDEX idx_feedback_submission ON feedback_generated(submission_id);
CREATE INDEX idx_feedback_user ON feedback_generated(user_id);
CREATE INDEX idx_feedback_type ON feedback_generated(feedback_type);
```

### Tabla: `tutor_conversations`

```sql
CREATE TABLE tutor_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES learning_activities(id),
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    message_count INTEGER DEFAULT 0,
    was_helpful BOOLEAN,
    conversation_history JSONB -- Array de mensajes
);

-- Ejemplo de conversación
-- conversation_history:
{
    "messages": [
        {
            "role": "user",
            "content": "No entiendo por qué 12 × 8 = 96",
            "timestamp": "2025-01-07T14:35:00Z"
        },
        {
            "role": "assistant",
            "content": "Te lo explico con un truco: 12 × 8 = (10 + 2) × 8 = 80 + 16 = 96",
            "timestamp": "2025-01-07T14:35:03Z"
        },
        {
            "role": "user",
            "content": "¡Ahora entendí! Gracias 😊",
            "timestamp": "2025-01-07T14:35:20Z"
        }
    ]
}
```

---

## 🤖 Algoritmo de Detección de Errores

### Clasificación de Tipos de Error

```typescript
// services/error-analyzer.service.ts

interface ErrorAnalysis {
  type: "conceptual" | "calculation" | "careless" | "reading";
  severity: "low" | "medium" | "high";
  pattern: boolean; // ¿Es un error recurrente?
  recommendation: string;
}

async function analyzeError(
  userId: string,
  question: string,
  correctAnswer: string,
  userAnswer: string,
  subject: string,
  concept: string
): Promise<ErrorAnalysis> {
  // 1. Análisis cuantitativo
  const similarity = calculateSimilarity(correctAnswer, userAnswer);
  const isClose = similarity > 0.7; // Respuesta cercana

  // 2. Consultar historial de errores
  const previousErrors = await db.query(
    `
        SELECT error_type, COUNT(*) as count
        FROM error_patterns
        WHERE user_id = $1 
          AND concept = $2
          AND status = 'active'
        GROUP BY error_type
        ORDER BY count DESC
    `,
    [userId, concept]
  );

  const hasPattern =
    previousErrors.rows.length > 0 && previousErrors.rows[0].count >= 3;

  // 3. Clasificación por heurísticas
  let errorType: ErrorAnalysis["type"];
  let severity: ErrorAnalysis["severity"];

  if (isClose) {
    // Respuesta cercana → probablemente error de cálculo
    errorType = "calculation";
    severity = "low";
  } else if (hasMisreadQuestion(question, userAnswer)) {
    // Mala lectura del enunciado
    errorType = "reading";
    severity = "medium";
  } else if (hasPattern) {
    // Error recurrente → problema conceptual
    errorType = "conceptual";
    severity = "high";
  } else {
    // Error aislado → distracción
    errorType = "careless";
    severity = "low";
  }

  // 4. Guardar patrón si es recurrente
  if (hasPattern) {
    await saveErrorPattern(userId, subject, concept, errorType);
  }

  return {
    type: errorType,
    severity: severity,
    pattern: hasPattern,
    recommendation: getRecommendation(errorType, severity),
  };
}

function calculateSimilarity(str1: string, str2: string): number {
  // Levenshtein distance normalizado
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
}

function hasMisreadQuestion(question: string, answer: string): boolean {
  // Detectar si el alumno respondió a una pregunta diferente
  // Ejemplo: Pregunta "¿Cuánto es 12 × 8?" pero alumno respondió "20" (12 + 8)

  const numbers = extractNumbers(question);
  const answerNum = parseFloat(answer);

  if (numbers.length === 2) {
    const [a, b] = numbers;
    // Verificar operaciones comunes
    if (answerNum === a + b) return true; // Sumó en vez de multiplicar
    if (answerNum === a - b || answerNum === b - a) return true; // Restó
    if (answerNum === a / b || answerNum === b / a) return true; // Dividió
  }

  return false;
}

function getRecommendation(
  errorType: ErrorAnalysis["type"],
  severity: ErrorAnalysis["severity"]
): string {
  const recommendations = {
    conceptual: "Revisar conceptos fundamentales con actividades de refuerzo",
    calculation: "Practicar cálculo mental y verificación de resultados",
    careless: "Tomarse más tiempo para revisar antes de responder",
    reading: "Leer el enunciado dos veces y subrayar datos clave",
  };

  return recommendations[errorType];
}
```

---

## 🧠 Generación de Feedback con GPT-4

### Prompt Engineering

```typescript
// services/feedback-generator.service.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface FeedbackRequest {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  studentAge: number;
  errorAnalysis: ErrorAnalysis;
  previousAttempts: number;
  studentProfile: {
    learningStyle: string;
    interests: string[];
  };
}

async function generatePersonalizedFeedback(
  req: FeedbackRequest
): Promise<string> {
  // Construir prompt optimizado
  const systemPrompt = `
Eres un tutor virtual amigable para niños de primaria (8-12 años).
Tu misión es dar feedback educativo que:
1. Sea POSITIVO y MOTIVADOR, nunca crítico
2. Use LENGUAJE SIMPLE apropiado para la edad del alumno
3. Incluya EMOJIS para hacerlo divertido 😊
4. Explique el ERROR de forma constructiva
5. Dé una PISTA o ESTRATEGIA para la siguiente vez
6. Sea BREVE (máximo 3-4 oraciones)

IMPORTANTE: Nunca des la respuesta directamente, guía al alumno para que piense.
`;

  const userPrompt = `
Alumno: ${req.studentAge} años
Pregunta: ${req.question}
Respuesta correcta: ${req.correctAnswer}
Respuesta del alumno: ${req.userAnswer}
Tipo de error: ${req.errorAnalysis.type}
Intentos previos: ${req.previousAttempts}
Estilo de aprendizaje: ${req.studentProfile.learningStyle}
Intereses: ${req.studentProfile.interests.join(", ")}

Genera un feedback personalizado considerando:
- Su error fue de tipo "${req.errorAnalysis.type}"
${
  req.errorAnalysis.pattern
    ? "- Este error se ha repetido antes, refuerza el concepto"
    : ""
}
- Adapta el lenguaje a su edad (${req.studentAge} años)
${
  req.studentProfile.learningStyle === "visual"
    ? "- Le ayudan las explicaciones con ejemplos visuales"
    : ""
}
${
  req.studentProfile.interests.length > 0
    ? `- Le interesa: ${req.studentProfile.interests[0]}`
    : ""
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7, // Balance entre creatividad y consistencia
      max_tokens: 150,
      presence_penalty: 0.6, // Evitar repeticiones
      frequency_penalty: 0.3,
    });

    const feedback = response.choices[0].message.content;
    const tokensUsed = response.usage?.total_tokens || 0;

    // Guardar en base de datos
    await saveFeedback(req.userAnswer, feedback, "gpt4", tokensUsed);

    return feedback;
  } catch (error) {
    console.error("Error generating feedback:", error);
    // Fallback a feedback template
    return generateTemplateFeedback(req);
  }
}

function generateTemplateFeedback(req: FeedbackRequest): string {
  // Fallback si GPT-4 falla o para ahorrar costos
  const templates = {
    calculation: `¡Buen intento! 😊 Tu respuesta ${req.userAnswer} está cerca, pero revisa tus cálculos. ¿Qué tal si lo intentas de nuevo paso a paso?`,
    conceptual: `Veo que este concepto te está costando un poco 🤔. Te recomiendo revisar el video explicativo antes de intentar de nuevo. ¡Tú puedes!`,
    careless: `¡Oops! Creo que fue un descuido 😅. Lee bien la pregunta y tómate tu tiempo. Seguro que la próxima la sacas bien.`,
    reading: `Parece que leíste la pregunta un poco rápido 📖. Lee con calma y subraya los datos importantes. ¡Inténtalo de nuevo!`,
  };

  return templates[req.errorAnalysis.type];
}
```

### Ejemplo de Feedback Generado

**Escenario 1: Error de cálculo**

```
Pregunta: ¿Cuánto es 12 × 8?
Respuesta correcta: 96
Respuesta del alumno: 84
Edad: 10 años

Feedback GPT-4:
"¡Casi lo tienes! 😊 Tu respuesta 84 está muy cerca.
Un truco: 12 × 8 es como 12 × 10 menos 12 × 2.
¿Puedes calcular 120 - 24? ¡Inténtalo de nuevo! 💪"
```

**Escenario 2: Error conceptual (recurrente)**

```
Pregunta: ¿Qué fracción es mayor: 1/3 o 1/4?
Respuesta correcta: 1/3
Respuesta del alumno: 1/4
Edad: 9 años (3er error similar)

Feedback GPT-4:
"Entiendo que las fracciones pueden ser confusas 🤔.
Piensa en una pizza: si la cortas en 3 pedazos, cada pedazo es MÁS GRANDE
que si la cortas en 4 pedazos. Entonces 1/3 > 1/4.
Antes de continuar, mira este video sobre fracciones 🍕📺"

[Botón: Ver Video Explicativo]
```

**Escenario 3: Respuesta correcta (motivacional)**

```
Respuesta: ¡CORRECTA! ✅

Feedback GPT-4:
"¡Excelente! 🎉 Resolviste la multiplicación perfectamente.
Veo que dominas este tema. ¿Te gustaría un reto más difícil? 🚀"

[Botón: Siguiente Ejercicio] [Botón: Reto Avanzado]
```

---

## 💬 Chatbot Tutor Virtual

### Implementación con Langchain

```typescript
// services/tutor-chatbot.service.ts

import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

class TutorChatbot {
  private chain: ConversationChain;
  private conversationHistory: Map<string, BufferMemory>;

  constructor() {
    this.conversationHistory = new Map();
  }

  async chat(
    userId: string,
    activityId: string,
    userMessage: string,
    context: {
      currentTopic: string;
      studentAge: number;
      recentErrors: string[];
    }
  ): Promise<string> {
    // Obtener o crear memoria de conversación
    const memoryKey = `${userId}:${activityId}`;
    let memory = this.conversationHistory.get(memoryKey);

    if (!memory) {
      memory = new BufferMemory({
        returnMessages: true,
        memoryKey: "history",
      });
      this.conversationHistory.set(memoryKey, memory);
    }

    // Configurar modelo con contexto
    const model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0.7,
    });

    const chain = new ConversationChain({
      llm: model,
      memory: memory,
      prompt: this.buildTutorPrompt(context),
    });

    // Generar respuesta
    const response = await chain.call({
      input: userMessage,
    });

    // Guardar en base de datos
    await this.saveConversationMessage(
      userId,
      activityId,
      userMessage,
      response.response
    );

    return response.response;
  }

  buildTutorPrompt(context: any) {
    return `
Eres un tutor virtual paciente y amigable para un alumno de ${
      context.studentAge
    } años.
Tema actual: ${context.currentTopic}
Errores recientes del alumno: ${context.recentErrors.join(", ")}

Reglas:
1. Usa lenguaje simple para niños de ${context.studentAge} años
2. Sé paciente y motivador, nunca frustres al alumno
3. Usa analogías con cosas cotidianas (deportes, comida, juegos)
4. Haz preguntas socráticas para guiar el razonamiento
5. Incluye emojis para mantener el tono amigable
6. Si el alumno está muy frustrado, sugiere tomar un descanso

Historial de conversación:
{history}

Alumno: {input}
Tutor:
`;
  }

  async endConversation(
    userId: string,
    activityId: string,
    wasHelpful: boolean
  ) {
    const memoryKey = `${userId}:${activityId}`;

    // Actualizar en BD
    await db.query(
      `
            UPDATE tutor_conversations
            SET ended_at = NOW(),
                was_helpful = $3
            WHERE user_id = $1 AND activity_id = $2 AND ended_at IS NULL
        `,
      [userId, activityId, wasHelpful]
    );

    // Limpiar memoria
    this.conversationHistory.delete(memoryKey);
  }
}
```

---

## 📊 Métricas y Monitoreo

```typescript
// Métricas a trackear
interface FeedbackMetrics {
  avgResponseTime: number; // Tiempo de generación
  tokensUsed: number; // Control de costos
  feedbackRatings: number[]; // Calificaciones de alumnos
  errorReductionRate: number; // ¿Reduce errores recurrentes?
  chatbotUsageRate: number; // % alumnos que usan chatbot
  avgChatDuration: number; // Duración promedio de conversación
}

async function calculateFeedbackMetrics(
  startDate: Date,
  endDate: Date
): Promise<FeedbackMetrics> {
  // Implementación de queries analíticas
  // ...
}
```

---

## 🧪 Testing

```typescript
describe("Feedback Generator", () => {
  it("should generate encouraging feedback for calculation error", async () => {
    const feedback = await generatePersonalizedFeedback({
      question: "12 × 8 = ?",
      correctAnswer: "96",
      userAnswer: "84",
      studentAge: 10,
      errorAnalysis: { type: "calculation", severity: "low", pattern: false },
      previousAttempts: 1,
      studentProfile: { learningStyle: "visual", interests: ["sports"] },
    });

    expect(feedback).toContain("intenta");
    expect(feedback.length).toBeLessThan(300);
  });

  it("should detect error pattern after 3 occurrences", async () => {
    // Simular 3 errores similares
    const analysis = await analyzeError(
      "user-123",
      "12 × 8 = ?",
      "96",
      "84",
      "mathematics",
      "multiplication"
    );

    expect(analysis.pattern).toBe(true);
    expect(analysis.type).toBe("conceptual");
  });
});
```

---

**Última actualización**: 09/11/2025
