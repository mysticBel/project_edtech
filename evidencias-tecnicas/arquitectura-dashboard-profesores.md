# Arquitectura Técnica - Dashboard de Profesores

## 📋 Referencia

**Historia de Usuario**: HU-006 - Dashboard para Profesores

---

## 🏗️ Arquitectura General

```
┌──────────────────────────────────────────────────────────────────┐
│              INTERFAZ PROFESOR (React Dashboard)                 │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Vista Grupo │  │  Alumno     │  │  Alertas    │            │
│  │ (Métricas)  │  │  Individual │  │ Predictivas │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└──────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                   CAPA DE SERVICIOS                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Dashboard Service (Node.js + TypeScript)                │  │
│  │                                                          │  │
│  │  GET  /api/v1/teacher/dashboard/group/:groupId          │  │
│  │  GET  /api/v1/teacher/students/:studentId/progress      │  │
│  │  GET  /api/v1/teacher/alerts/:teacherId                 │  │
│  │  POST /api/v1/teacher/interventions                     │  │
│  │  GET  /api/v1/teacher/analytics/comparative             │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │  ML Engine   │  │    Redis     │
│  (Métricas,  │  │  (Alertas    │  │  (Cache de   │
│   Progreso)  │  │  Predictivas)│  │   Dashboards)│
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Node.js 18+** con TypeScript
- **Express.js 4.x**
- **Python 3.9+** (ML para alertas predictivas)
- **Scikit-learn** (Random Forest para predicción de riesgo)

### Frontend

- **React 18+** con Material-UI
- **Recharts** (gráficas)
- **React-Table** (tablas de alumnos)
- **Socket.io** (actualizaciones en tiempo real)

### Base de Datos

- **PostgreSQL 14+**
- **Redis 7+**

---

## 🗄️ Modelo de Datos

### Tabla: `teacher_groups`

```sql
CREATE TABLE teacher_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    group_name VARCHAR(100) NOT NULL,
    grade_level INTEGER, -- 3, 4, 5, 6
    school_year VARCHAR(20), -- '2025-2026'
    subject VARCHAR(50), -- 'mathematics', 'language', 'all'
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_groups_teacher ON teacher_groups(teacher_id);
```

### Tabla: `group_students`

```sql
CREATE TABLE group_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES teacher_groups(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(group_id, student_id)
);

CREATE INDEX idx_group_students_group ON group_students(group_id);
CREATE INDEX idx_group_students_student ON group_students(student_id);
```

### Tabla: `teacher_alerts`

```sql
CREATE TABLE teacher_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'low_engagement', 'struggling', 'no_progress', 'churn_risk'
    severity VARCHAR(20) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    data JSONB, -- Información adicional (métricas, etc.)
    is_read BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    resolution_notes TEXT
);

CREATE INDEX idx_alerts_teacher ON teacher_alerts(teacher_id);
CREATE INDEX idx_alerts_student ON teacher_alerts(student_id);
CREATE INDEX idx_alerts_unread ON teacher_alerts(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_alerts_unresolved ON teacher_alerts(is_resolved) WHERE is_resolved = FALSE;

-- Ejemplo de alerta
INSERT INTO teacher_alerts VALUES (
    gen_random_uuid(),
    'teacher-001',
    'student-123',
    'low_engagement',
    'high',
    'María no ha entrado en 5 días',
    'La alumna María García no accede a la plataforma desde hace 5 días. Última actividad: 03/01/2025.',
    '{
        "days_inactive": 5,
        "last_activity": "2025-01-03T10:30:00Z",
        "completion_rate_last_week": 0.2,
        "avg_time_per_session": 8
    }'::jsonb,
    FALSE,
    FALSE,
    NOW(),
    NULL,
    NULL
);
```

### Tabla: `teacher_interventions`

```sql
CREATE TABLE teacher_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    alert_id UUID REFERENCES teacher_alerts(id) ON DELETE SET NULL,
    intervention_type VARCHAR(50), -- 'personalized_message', 'adjusted_path', 'parent_contact', 'extra_resources'
    description TEXT NOT NULL,
    outcome TEXT, -- Resultado de la intervención
    created_at TIMESTAMP DEFAULT NOW(),
    followed_up_at TIMESTAMP
);

CREATE INDEX idx_interventions_teacher ON teacher_interventions(teacher_id);
CREATE INDEX idx_interventions_student ON teacher_interventions(student_id);
```

### Vista Materializada: `student_performance_summary`

```sql
CREATE MATERIALIZED VIEW student_performance_summary AS
SELECT
    u.id AS student_id,
    u.first_name,
    u.last_name,
    gs.group_id,

    -- Métricas de actividad
    COUNT(DISTINCT DATE(sp.last_attempt_at)) AS days_active_last_30,
    SUM(sp.time_spent_seconds) / 3600.0 AS total_hours,
    AVG(sp.score) AS avg_score,

    -- Progreso
    COUNT(CASE WHEN sp.status = 'completed' THEN 1 END) AS activities_completed,
    COUNT(CASE WHEN sp.status = 'mastered' THEN 1 END) AS activities_mastered,
    COUNT(sp.id) AS total_activities_assigned,
    (COUNT(CASE WHEN sp.status = 'completed' THEN 1 END)::FLOAT /
     NULLIF(COUNT(sp.id), 0)) AS completion_rate,

    -- Nivel actual
    AVG(sp.mastery_level) AS avg_mastery,

    -- Última actividad
    MAX(sp.last_attempt_at) AS last_activity_at,
    NOW() - MAX(sp.last_attempt_at) AS days_since_last_activity

FROM users u
JOIN group_students gs ON u.id = gs.student_id
LEFT JOIN student_progress sp ON u.id = sp.user_id
    AND sp.last_attempt_at >= NOW() - INTERVAL '30 days'
WHERE u.role = 'student'
GROUP BY u.id, u.first_name, u.last_name, gs.group_id;

CREATE UNIQUE INDEX idx_perf_summary_student_group
    ON student_performance_summary(student_id, group_id);

-- Refrescar cada hora
CREATE OR REPLACE FUNCTION refresh_performance_summary()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY student_performance_summary;
END;
$$ LANGUAGE plpgsql;

-- Programar refresco automático (con pg_cron)
SELECT cron.schedule('refresh-performance', '0 * * * *',
    'SELECT refresh_performance_summary()');
```

---

## 📊 Dashboard - Vista de Grupo

### API: Métricas del Grupo

```typescript
// controllers/teacher-dashboard.controller.ts

export async function getGroupDashboard(req: Request, res: Response) {
  const teacherId = req.user.id;
  const { groupId } = req.params;

  // Verificar que el grupo pertenece al profesor
  const group = await db.query(
    "SELECT * FROM teacher_groups WHERE id = $1 AND teacher_id = $2",
    [groupId, teacherId]
  );

  if (group.rows.length === 0) {
    return res.status(404).json({ error: "Group not found" });
  }

  // Obtener métricas del grupo
  const metrics = await calculateGroupMetrics(groupId);

  // Obtener lista de alumnos
  const students = await getStudentsList(groupId);

  // Obtener alertas activas
  const alerts = await getActiveAlerts(teacherId, groupId);

  res.json({
    group: group.rows[0],
    metrics: metrics,
    students: students,
    alerts: alerts,
    generatedAt: new Date().toISOString(),
  });
}

async function calculateGroupMetrics(groupId: string) {
  const result = await db.query(
    `
        SELECT 
            COUNT(DISTINCT gs.student_id) AS total_students,
            
            -- Engagement
            AVG(sps.days_active_last_30) AS avg_days_active,
            AVG(sps.total_hours) AS avg_hours_studied,
            COUNT(CASE WHEN sps.days_since_last_activity > INTERVAL '7 days' 
                  THEN 1 END) AS students_inactive_7days,
            
            -- Progreso
            AVG(sps.completion_rate) * 100 AS avg_completion_rate,
            AVG(sps.avg_score) AS avg_score,
            AVG(sps.avg_mastery) * 100 AS avg_mastery_level,
            
            -- Distribución por nivel
            COUNT(CASE WHEN sps.avg_mastery < 0.5 THEN 1 END) AS students_struggling,
            COUNT(CASE WHEN sps.avg_mastery BETWEEN 0.5 AND 0.7 THEN 1 END) AS students_progressing,
            COUNT(CASE WHEN sps.avg_mastery > 0.7 THEN 1 END) AS students_advanced,
            
            -- Tendencias (últimos 7 días vs. previos 7 días)
            AVG(recent.completion_rate) - AVG(sps.completion_rate) AS completion_trend
            
        FROM group_students gs
        JOIN student_performance_summary sps ON gs.student_id = sps.student_id
        LEFT JOIN student_performance_summary recent 
            ON gs.student_id = recent.student_id
            AND recent.last_activity_at >= NOW() - INTERVAL '7 days'
        WHERE gs.group_id = $1
    `,
    [groupId]
  );

  return result.rows[0];
}

async function getStudentsList(groupId: string) {
  const result = await db.query(
    `
        SELECT 
            u.id,
            u.first_name,
            u.last_name,
            sps.days_active_last_30,
            sps.total_hours,
            sps.avg_score,
            sps.completion_rate * 100 AS completion_rate,
            sps.avg_mastery * 100 AS mastery_level,
            sps.last_activity_at,
            
            -- Indicador de riesgo (calculado)
            CASE 
                WHEN sps.days_since_last_activity > INTERVAL '7 days' THEN 'high'
                WHEN sps.completion_rate < 0.3 THEN 'medium'
                WHEN sps.avg_mastery < 0.4 THEN 'medium'
                ELSE 'low'
            END AS risk_level,
            
            -- Alertas pendientes
            COUNT(ta.id) FILTER (WHERE ta.is_resolved = FALSE) AS pending_alerts
            
        FROM group_students gs
        JOIN users u ON gs.student_id = u.id
        LEFT JOIN student_performance_summary sps ON u.id = sps.student_id
        LEFT JOIN teacher_alerts ta ON u.id = ta.student_id AND ta.is_resolved = FALSE
        WHERE gs.group_id = $1
        GROUP BY u.id, u.first_name, u.last_name, 
                 sps.days_active_last_30, sps.total_hours, sps.avg_score,
                 sps.completion_rate, sps.avg_mastery, sps.last_activity_at,
                 sps.days_since_last_activity
        ORDER BY risk_level DESC, sps.avg_mastery ASC
    `,
    [groupId]
  );

  return result.rows;
}
```

### Visualización del Dashboard

```
┌──────────────────────────────────────────────────────────────────────┐
│  📚 Grupo: 5° Primaria - Matemáticas     👤 Prof. Juan Pérez        │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📊 Métricas Generales del Grupo                                    │
│                                                                     │
│  👥 Total Alumnos: 25                                               │
│  📈 Tasa de Finalización Promedio: 68%  [████████░░] (+5% vs. sem) │
│  ⏱️ Horas Promedio por Alumno: 8.5h                                │
│  🎯 Nivel de Dominio Promedio: 72%                                  │
│  ⚠️ Alumnos Inactivos (>7 días): 3                                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  🔔 Alertas Activas (6)                            [Ver Todas →]    │
│                                                                     │
│  🔴 CRÍTICO: María García - Sin actividad hace 5 días              │
│     Última sesión: 03/01/2025 | Completado: 20%                    │
│     [Enviar Mensaje] [Ver Perfil] [Marcar como Resuelta]           │
│                                                                     │
│  🟡 MEDIO: Carlos López - Bajo rendimiento en Fracciones           │
│     Dominio: 35% | Intentos: 8 | Errores recurrentes               │
│     [Ver Detalles] [Asignar Refuerzo]                              │
│                                                                     │
│  🟡 MEDIO: Ana Martínez - Riesgo de abandono (ML: 68%)            │
│     Días activos últimos 30d: 8 | Tendencia: ↓                     │
│     [Contactar Padre/Madre] [Plan Personalizado]                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📋 Lista de Alumnos                              [Exportar CSV]    │
│                                                                     │
│  Alumno            | Act.  | Horas | Compl.| Dominio | Riesgo      │
│  ──────────────────────────────────────────────────────────────────│
│  🔴 María García   | 5d ago| 2.5h  | 20%   | 45%     | ALTO       │
│  🟡 Carlos López   | 1d ago| 7.0h  | 55%   | 58%     | MEDIO      │
│  🟡 Ana Martínez   | 2d ago| 6.5h  | 60%   | 62%     | MEDIO      │
│  🟢 Luis Ramírez   | hoy   | 12h   | 85%   | 88%     | BAJO       │
│  🟢 Sofía Torres   | hoy   | 10h   | 92%   | 91%     | BAJO       │
│  ...                                                               │
│                                                     [1] [2] [3]     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📈 Distribución por Nivel de Dominio                               │
│                                                                     │
│  Avanzado (>70%)      [████████████░░] 15 alumnos (60%)           │
│  En Progreso (50-70%) [████████░░░░░░] 7 alumnos (28%)            │
│  Con Dificultades     [████░░░░░░░░░░] 3 alumnos (12%)            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 Algoritmo de Alertas Predictivas (ML)

### Modelo de Predicción de Riesgo de Abandono

```python
# ml_engine/churn_prediction.py

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

class StudentChurnPredictor:
    def __init__(self):
        self.model = None
        self.feature_columns = [
            'days_since_last_activity',
            'completion_rate',
            'avg_mastery',
            'total_hours',
            'days_active_last_30',
            'avg_score',
            'error_rate',
            'session_avg_duration',
            'weeks_since_enrollment'
        ]

    def train(self, training_data: pd.DataFrame):
        """
        Entrena el modelo con datos históricos

        training_data debe incluir:
        - Features: días inactivo, tasa de completado, nivel de dominio, etc.
        - Target: 'churned' (1 si el alumno abandonó, 0 si no)
        """
        X = training_data[self.feature_columns]
        y = training_data['churned']

        # Split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Entrenar Random Forest
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=20,
            class_weight='balanced',  # Importante para clases desbalanceadas
            random_state=42
        )

        self.model.fit(X_train, y_train)

        # Evaluar
        y_pred = self.model.predict(X_test)
        print(classification_report(y_test, y_pred))

        # Guardar modelo
        joblib.dump(self.model, 'models/churn_predictor.pkl')

        return self.model

    def predict_churn_risk(self, student_data: dict) -> dict:
        """
        Predice el riesgo de abandono de un alumno

        Returns:
        {
            'risk_probability': 0.68,
            'risk_level': 'high',
            'contributing_factors': [
                'Inactividad alta (5 días)',
                'Bajo dominio (45%)',
                'Pocas horas de estudio'
            ]
        }
        """
        if not self.model:
            self.model = joblib.load('models/churn_predictor.pkl')

        # Preparar features
        features = pd.DataFrame([{
            col: student_data.get(col, 0) for col in self.feature_columns
        }])

        # Predicción
        risk_prob = self.model.predict_proba(features)[0][1]  # Probabilidad de churn

        # Clasificación
        if risk_prob >= 0.7:
            risk_level = 'critical'
        elif risk_prob >= 0.5:
            risk_level = 'high'
        elif risk_prob >= 0.3:
            risk_level = 'medium'
        else:
            risk_level = 'low'

        # Identificar factores contribuyentes
        feature_importance = self.model.feature_importances_
        factors = []

        for i, col in enumerate(self.feature_columns):
            if feature_importance[i] > 0.1:  # Features importantes
                value = student_data.get(col, 0)
                factor = self._explain_factor(col, value)
                if factor:
                    factors.append(factor)

        return {
            'risk_probability': round(risk_prob, 2),
            'risk_level': risk_level,
            'contributing_factors': factors[:3]  # Top 3
        }

    def _explain_factor(self, feature: str, value: float) -> str:
        explanations = {
            'days_since_last_activity': f'Inactividad: {int(value)} días sin acceder',
            'completion_rate': f'Bajo completado: {int(value*100)}%',
            'avg_mastery': f'Dominio bajo: {int(value*100)}%',
            'total_hours': f'Pocas horas: {value:.1f}h total',
            'days_active_last_30': f'Poca frecuencia: {int(value)} días activos',
            'avg_score': f'Puntuación baja: {int(value)}%',
            'error_rate': f'Tasa de errores alta: {int(value*100)}%',
            'session_avg_duration': f'Sesiones muy cortas: {int(value)}min promedio'
        }

        # Retornar explicación solo si el valor es problemático
        thresholds = {
            'days_since_last_activity': 3,
            'completion_rate': 0.4,
            'avg_mastery': 0.5,
            'total_hours': 5,
            'days_active_last_30': 10,
            'avg_score': 60,
            'error_rate': 0.4,
            'session_avg_duration': 15
        }

        if feature in thresholds:
            if (feature in ['days_since_last_activity', 'error_rate'] and value > thresholds[feature]) or \
               (feature not in ['days_since_last_activity', 'error_rate'] and value < thresholds[feature]):
                return explanations.get(feature, '')

        return ''
```

### Generación Automática de Alertas

```typescript
// jobs/alert-generator.job.ts

import cron from "node-cron";

// Ejecutar cada hora
cron.schedule("0 * * * *", async () => {
  console.log("Generating alerts...");
  await generateAlerts();
});

async function generateAlerts() {
  // Obtener todos los alumnos activos
  const students = await db.query(`
        SELECT 
            u.id AS student_id,
            gs.group_id,
            tg.teacher_id,
            sps.*
        FROM users u
        JOIN group_students gs ON u.id = gs.student_id
        JOIN teacher_groups tg ON gs.group_id = tg.id
        LEFT JOIN student_performance_summary sps ON u.id = sps.student_id
        WHERE u.role = 'student'
          AND u.is_active = TRUE
    `);

  for (const student of students.rows) {
    // 1. Alerta por inactividad
    if (student.days_since_last_activity > 5) {
      await createAlert({
        teacherId: student.teacher_id,
        studentId: student.student_id,
        type: "low_engagement",
        severity: student.days_since_last_activity > 10 ? "critical" : "high",
        title: `${student.first_name} lleva ${student.days_since_last_activity} días sin acceder`,
        description: `Última actividad: ${student.last_activity_at}`,
        data: {
          days_inactive: student.days_since_last_activity,
          last_activity: student.last_activity_at,
        },
      });
    }

    // 2. Alerta por bajo rendimiento
    if (student.avg_mastery < 0.4 && student.activities_completed > 5) {
      await createAlert({
        teacherId: student.teacher_id,
        studentId: student.student_id,
        type: "struggling",
        severity: "medium",
        title: `${student.first_name} tiene bajo dominio en varios temas`,
        description: `Nivel de dominio: ${(student.avg_mastery * 100).toFixed(
          0
        )}%`,
        data: {
          mastery_level: student.avg_mastery,
          activities_completed: student.activities_completed,
        },
      });
    }

    // 3. Alerta predictiva (ML)
    const churnPrediction = await predictChurnRisk(student);
    if (
      churnPrediction.risk_level === "high" ||
      churnPrediction.risk_level === "critical"
    ) {
      await createAlert({
        teacherId: student.teacher_id,
        studentId: student.student_id,
        type: "churn_risk",
        severity: churnPrediction.risk_level,
        title: `Riesgo de abandono: ${student.first_name} (${(
          churnPrediction.risk_probability * 100
        ).toFixed(0)}%)`,
        description: `Factores: ${churnPrediction.contributing_factors.join(
          ", "
        )}`,
        data: churnPrediction,
      });
    }
  }
}

async function predictChurnRisk(student: any) {
  // Llamar a Python ML service
  const response = await axios.post("http://ml-engine:5000/predict-churn", {
    student_id: student.student_id,
    features: {
      days_since_last_activity: student.days_since_last_activity,
      completion_rate: student.completion_rate,
      avg_mastery: student.avg_mastery,
      total_hours: student.total_hours,
      days_active_last_30: student.days_active_last_30,
      avg_score: student.avg_score,
    },
  });

  return response.data;
}
```

---

## 🧪 Testing

```typescript
describe("Teacher Dashboard", () => {
  it("should calculate group metrics correctly", async () => {
    const metrics = await calculateGroupMetrics("group-123");

    expect(metrics.total_students).toBeGreaterThan(0);
    expect(metrics.avg_completion_rate).toBeGreaterThanOrEqual(0);
    expect(metrics.avg_completion_rate).toBeLessThanOrEqual(100);
  });

  it("should generate alert for inactive student", async () => {
    // Mock alumno inactivo 7 días
    await generateAlerts();

    const alerts = await db.query(
      "SELECT * FROM teacher_alerts WHERE alert_type = $1",
      ["low_engagement"]
    );

    expect(alerts.rows.length).toBeGreaterThan(0);
  });
});
```

---

**Última actualización**: 09/11/2025
