# 🏗️ Arquitectura del Sistema - Plataforma de Aprendizaje Adaptativo

## 📑 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Actores del Sistema](#actores-del-sistema)
3. [Arquitectura de Solución](#arquitectura-de-solución)
4. [Diagrama de Componentes](#diagrama-de-componentes)
5. [Historias de Usuario con Workflows](#historias-de-usuario-con-workflows)
6. [Casos de Uso Extendidos (ECUS)](#casos-de-uso-extendidos)
7. [Modelo de Datos](#modelo-de-datos)
8. [Arquitectura de Capas](#arquitectura-de-capas)

---

## 📋 Resumen Ejecutivo

La Plataforma de Aprendizaje Adaptativo es una aplicación web educativa diseñada para personalizar la experiencia de aprendizaje mediante rutas adaptativas, feedback en tiempo real y dashboards analíticos. El sistema utiliza una arquitectura de capas basada en React con servicios centralizados para la gestión de autenticación y progreso académico.

**Tecnologías Core:**

- Frontend: React 18.x
- Almacenamiento: localStorage (MVP) → Base de datos (producción)
- Arquitectura: Patrón MVC adaptado con Services Layer
- Comunicación: Síncrona (actual) → API REST (futura)

---

## 👥 Actores del Sistema

### Actor Primario: Alumno 🧑‍🎓

**Descripción:** Estudiante de educación básica (8-12 años) que utiliza la plataforma para aprender.

**Responsabilidades:**

- Autenticarse en el sistema
- Completar encuesta inicial de perfil
- Realizar actividades de aprendizaje
- Consultar su progreso y feedback

**Interacciones:** HU-001, HU-002, HU-003, HU-004, HU-005

---

### Actor Secundario: Profesor 👨‍🏫

**Descripción:** Docente que supervisa y analiza el progreso de sus alumnos.

**Responsabilidades:**

- Monitorear desempeño individual y grupal
- Identificar estudiantes con dificultades
- Analizar métricas por materia y tema
- Exportar reportes de seguimiento

**Interacciones:** HU-001, HU-006, HU-008

---

### Actor Secundario: Administrador/Ejecutivo 📊

**Descripción:** Director académico o coordinador que toma decisiones estratégicas.

**Responsabilidades:**

- Visualizar métricas agregadas institucionales
- Analizar tasas de finalización y engagement
- Identificar materias con bajo rendimiento
- Exportar datos para análisis externo

**Interacciones:** HU-001, HU-007, HU-008

---

### Actor de Sistema: Motor Adaptativo 🤖

**Descripción:** Componente de lógica que ajusta la dificultad según el desempeño.

**Responsabilidades:**

- Evaluar respuestas del alumno
- Ajustar nivel de dificultad (simulado en MVP)
- Determinar desbloqueo de temas
- Generar mensajes de feedback

**Interacciones:** HU-004, HU-005

---

## 🏛️ Arquitectura de Solución

### Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Login   │  │ Register │  │  Survey  │  │   Home   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Learning  │  │ Activity │  │Dashboard │  │Dashboard │       │
│  │   Map    │  │          │  │ Profesor │  │Ejecutivo │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                     CAPA DE SERVICIOS (LÓGICA)                   │
│  ┌────────────────────────┐  ┌─────────────────────────┐       │
│  │   AuthService          │  │   ProgressService       │       │
│  │  - login()             │  │  - getProgress()        │       │
│  │  - register()          │  │  - saveTopicProgress()  │       │
│  │  - updateUser()        │  │  - isTopicUnlocked()    │       │
│  │  - completeSurvey()    │  │  - getSubjectStats()    │       │
│  └────────────────────────┘  └─────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE PERSISTENCIA                        │
│  ┌────────────────────────┐  ┌─────────────────────────┐       │
│  │   localStorage         │  │   JSON Files            │       │
│  │  - users               │  │  - users.json           │       │
│  │  - progress_{userId}   │  │  - learningPaths.json   │       │
│  └────────────────────────┘  └─────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Diagrama de Componentes

### Estructura de Carpetas

```
login-mvp/
│
├── src/
│   ├── pages/                    # Componentes de Vista
│   │   ├── Login.js             # Autenticación
│   │   ├── Register.js          # Registro de usuario
│   │   ├── Survey.js            # Encuesta inicial (4 pasos)
│   │   ├── Home.js              # Dashboard principal
│   │   ├── LearningMap.js       # Mapa de rutas
│   │   └── Activity.js          # Ejercicios interactivos
│   │
│   ├── services/                 # Lógica de Negocio
│   │   ├── authService.js       # Gestión de autenticación
│   │   └── progressService.js   # Gestión de progreso
│   │
│   ├── data/                     # Datos Estáticos
│   │   ├── users.json           # Usuarios de prueba
│   │   └── learningPaths.json   # Contenido educativo
│   │
│   ├── App.js                    # Router principal
│   └── index.js                  # Entry point
│
└── public/
    └── index.html
```

### Diagrama de Dependencias

```
App.js
  ├─→ Login.js ──→ AuthService ──→ users.json
  ├─→ Register.js ──→ AuthService ──→ localStorage
  ├─→ Survey.js ──→ AuthService
  ├─→ Home.js
  ├─→ LearningMap.js ──→ ProgressService ──→ learningPaths.json
  └─→ Activity.js ──→ ProgressService ──→ localStorage
```

---

## 📖 Historias de Usuario con Workflows

### HU-001: Login Básico 🔐

**Actor Principal:** Alumno, Profesor, Administrador  
**Prioridad:** CRÍTICA  
**Sprint:** 1  
**Story Points:** 5

#### Descripción

Como usuario de la plataforma, quiero iniciar sesión con mi email y contraseña para acceder a mis contenidos personalizados según mi rol.

#### Criterios de Aceptación

- ✅ Validación de email y contraseña
- ✅ Redirección según estado (survey pendiente vs completada)
- ✅ Mensajes de error claros
- ✅ Persistencia de sesión en localStorage

#### Workflow Detallado

```
┌─────────┐
│ Usuario │
└────┬────┘
     │
     ├─ 1. Ingresa email y password
     ↓
┌──────────────┐
│  Login.js    │ ← Componente de Vista
└──────┬───────┘
       │
       ├─ 2. onLogin({ email, password })
       ↓
┌──────────────┐
│   App.js     │ ← Controlador Principal
└──────┬───────┘
       │
       ├─ 3. AuthService.login(email, password)
       ↓
┌─────────────────┐
│  authService.js │ ← Servicio de Lógica
└──────┬──────────┘
       │
       ├─ 4. Busca en users.json
       ├─ 5. Valida credenciales
       ├─ 6. Carga datos de localStorage
       ↓
┌──────────────┐
│ localStorage │ ← Persistencia
└──────┬───────┘
       │
       ├─ 7. Retorna { success: true, user } o { success: false, error }
       ↓
┌──────────────┐
│   App.js     │
└──────┬───────┘
       │
       ├─ 8. Si success → Verifica si completó survey
       │    - surveyCompleted → setView('home')
       │    - !surveyCompleted → setView('survey')
       ↓
┌─────────┐
│ Usuario │ → Ve Home o Survey
└─────────┘
```

#### Diagrama de Secuencia

```
Usuario     Login.js    App.js    AuthService    localStorage    users.json
  │            │           │           │              │              │
  ├─ Ingresa datos ────→│  │           │              │              │
  │            │           │           │              │              │
  │            ├─ onLogin()───→│       │              │              │
  │            │           │           │              │              │
  │            │           ├─ login() ───→│           │              │
  │            │           │           │              │              │
  │            │           │           ├─ Lee users ──────────────→│
  │            │           │           │←─────────────────────────┤
  │            │           │           │              │              │
  │            │           │           ├─ Valida     │              │
  │            │           │           │              │              │
  │            │           │           ├─ getItem('users')───→│     │
  │            │           │           │←─────────────────────┤     │
  │            │           │←─ result ┤              │              │
  │            │           │           │              │              │
  │            │           ├─ setView()│              │              │
  │            │←─ redirect│           │              │              │
  │←───────────┤           │           │              │              │
```

---

### HU-002: Registro de Usuario 👤

**Actor Principal:** Alumno (nuevo)  
**Prioridad:** CRÍTICA  
**Sprint:** 1  
**Story Points:** 5

#### Descripción

Como nuevo usuario, quiero registrarme en la plataforma con mi nombre, email y contraseña para crear mi cuenta y comenzar mi perfil de aprendizaje.

#### Criterios de Aceptación

- ✅ Validación de formato de email
- ✅ Verificación de email único
- ✅ Contraseña mínimo 6 caracteres
- ✅ Persistencia en localStorage
- ✅ Redirección automática a encuesta inicial

#### Workflow

```
Usuario → Register.js → App.js → AuthService → localStorage
   │                                                  │
   ├─ Completa formulario                           │
   ├─ Valida formato                                │
   ├─ Verifica email único                          │
   ├─ Crea user { id, nombre, email, password }     │
   ├─ Guarda en localStorage                        │
   └─ Redirige a Survey ←───────────────────────────┘
```

---

### HU-003: Encuesta Inicial 📝

**Actor Principal:** Alumno  
**Prioridad:** CRÍTICA  
**Sprint:** 2  
**Story Points:** 8

#### Descripción

Como alumno nuevo, quiero completar una encuesta de perfil en 4 pasos para que el sistema conozca mis preferencias y personalice mi experiencia de aprendizaje.

#### Criterios de Aceptación

- ✅ 4 pasos: Grado, Materias Favoritas, Estilo de Aprendizaje, Hobbies
- ✅ Navegación entre pasos (Siguiente/Anterior)
- ✅ Validación en cada paso
- ✅ Persistencia de surveyData en user
- ✅ Flag surveyCompleted = true

#### Workflow Detallado

```
┌──────────────────────────────────────────────────────────┐
│                    Survey.js (4 Pasos)                    │
└──────────────────────────────────────────────────────────┘
                              │
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
    ↓                         ↓                         ↓
┌─────────┐            ┌─────────┐            ┌─────────┐
│ Paso 1  │  Siguiente │ Paso 2  │  Siguiente │ Paso 3  │
│ Grado   │───────────→│Materias │───────────→│ Estilo  │
└─────────┘            └─────────┘            └─────────┘
                                                    │
                                                    ↓
                                              ┌─────────┐
                                              │ Paso 4  │
                                              │ Hobbies │
                                              └────┬────┘
                                                   │
                                                   ├─ Enviar
                                                   ↓
                                         ┌──────────────────┐
                                         │ onSurveyComplete │
                                         │  (surveyData)    │
                                         └────────┬─────────┘
                                                  │
                                                  ↓
                                            ┌──────────┐
                                            │  App.js  │
                                            └─────┬────┘
                                                  │
                                                  ├─ AuthService.completeSurvey()
                                                  ↓
                                         ┌─────────────────┐
                                         │  Actualiza user │
                                         │  surveyData: {} │
                                         │  completed: true│
                                         └────────┬────────┘
                                                  │
                                                  ├─ localStorage.setItem()
                                                  ↓
                                         ┌─────────────────┐
                                         │  setView('home')│
                                         └─────────────────┘
```

#### Datos Capturados

```json
{
  "surveyData": {
    "grado": "5to Primaria",
    "materiasFavoritas": ["Matemáticas", "Ciencias"],
    "estiloAprendizaje": "Visual",
    "hobbies": ["Videojuegos", "Lectura"]
  },
  "surveyCompleted": true
}
```

---

### HU-004: Ruta Adaptativa 🗺️

**Actor Principal:** Alumno  
**Actor Secundario:** Motor Adaptativo  
**Prioridad:** CRÍTICA  
**Sprint:** 3-4  
**Story Points:** 13

#### Descripción

Como alumno, quiero seguir una ruta de aprendizaje personalizada con temas que se desbloquean progresivamente según mi desempeño para aprender a mi propio ritmo.

#### Criterios de Aceptación

- ✅ 3 materias: Matemáticas, Lengua, Ciencias
- ✅ Cada materia tiene múltiples temas ordenados
- ✅ Primer tema siempre desbloqueado
- ✅ Temas siguientes bloqueados hasta completar el anterior
- ✅ Progreso persistente por usuario
- ✅ Visualización de % completado por materia

#### Workflow Detallado

```
┌────────────────────────────────────────────────────────────┐
│                     LearningMap.js                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │Matemáticas │  │   Lengua   │  │  Ciencias  │           │
│  │  60% ✓     │  │   20% ✓    │  │   0%       │           │
│  └─────┬──────┘  └────────────┘  └────────────┘           │
│        │                                                     │
│        ├─ Click                                             │
│        ↓                                                     │
│  ┌──────────────────────────────────────────────────┐      │
│  │         Mapa de Temas - Matemáticas              │      │
│  │                                                   │      │
│  │  ┌─────────┐     ┌─────────┐     ┌─────────┐   │      │
│  │  │ Tema 1  │────→│ Tema 2  │────→│ Tema 3  │   │      │
│  │  │ Sumas   │     │ Restas  │     │Multipli │   │      │
│  │  │ ✅ 95%  │     │ ✅ 80%  │     │ 🔵 0%   │   │      │
│  │  └─────────┘     └─────────┘     └─────────┘   │      │
│  │       │               │                │         │      │
│  │       └───────────────┴────────────────┘         │      │
│  │                       │                           │      │
│  │                       └─→ ┌─────────┐            │      │
│  │                           │ Tema 4  │            │      │
│  │                           │División │            │      │
│  │                           │ 🔒      │            │      │
│  │                           └─────────┘            │      │
│  └───────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────┘

Usuario Click en Tema 3 (desbloqueado)
         │
         ↓
    ┌─────────────┐
    │ Activity.js │ ← onStartActivity(subject, topic)
    └──────┬──────┘
           │
           ├─ Carga topic.activities (preguntas)
           ├─ Muestra pregunta 1 de N
           │
           ├─ Usuario responde
           ↓
    ┌──────────────┐
    │ handleSubmit │
    └──────┬───────┘
           │
           ├─ Verifica respuesta correcta
           ├─ Actualiza stats { correct, incorrect, streak }
           │
           ├─ ¿streak === 3? → Mensaje: "¡Vamos con algo más difícil!"
           ├─ ¿incorrect >= 2? → Mensaje: "Practiquemos más fácil"
           │
           ├─ Siguiente pregunta o Finalizar
           ↓
    ┌─────────────────┐
    │  saveProgress() │
    └──────┬──────────┘
           │
           ├─ Calcula score = (correct/total) * 100
           ├─ completed = score >= 70%
           │
           ├─ ProgressService.saveTopicProgress()
           ↓
    ┌────────────────────┐
    │   localStorage     │
    │ progress_{userId}: │
    │ {                  │
    │  "math_sumas": {   │
    │    completed: true │
    │    score: 95       │
    │    attempts: 2     │
    │  }                 │
    │ }                  │
    └────────────────────┘
```

#### Algoritmo de Desbloqueo

```javascript
isTopicUnlocked(subjectId, topicOrder) {
  if (topicOrder === 1) return true; // Primer tema libre

  // Buscar tema anterior
  const previousTopic = findTopic(subjectId, topicOrder - 1);
  const status = getTopicStatus(userId, subjectId, previousTopic.id);

  return status.completed; // Solo si el anterior está completo
}
```

#### Diagrama de Estados del Tema

```
┌─────────────┐
│   LOCKED    │ 🔒 Tema bloqueado
│  (order > 1)│
└──────┬──────┘
       │
       ├─ Tema anterior completado
       ↓
┌─────────────┐
│  UNLOCKED   │ 🔵 Disponible para realizar
│ (attempts=0)│
└──────┬──────┘
       │
       ├─ Usuario realiza actividades
       ↓
┌─────────────┐
│ IN_PROGRESS │ 📝 Intentos > 0, no completado
│ (score < 70)│
└──────┬──────┘
       │
       ├─ Score >= 70%
       ↓
┌─────────────┐
│  COMPLETED  │ ✅ Tema dominado
│ (score≥70%) │
└─────────────┘
```

---

### HU-005: Feedback al Alumno 💬

**Actor Principal:** Alumno  
**Actor Secundario:** Motor Adaptativo  
**Prioridad:** ALTA  
**Sprint:** 4  
**Story Points:** 8

#### Descripción

Como alumno, quiero recibir retroalimentación inmediata después de cada respuesta con mensajes motivacionales y sugerencias para mejorar mi comprensión.

#### Criterios de Aceptación

- ✅ Feedback inmediato (correcto/incorrecto)
- ✅ Mensaje adaptativo según racha (streak)
- ✅ Explicación breve de respuesta correcta
- ✅ Sugerencias personalizadas

#### Workflow

```
Usuario responde pregunta
         │
         ↓
┌────────────────────┐
│  Validar respuesta │
└─────────┬──────────┘
          │
    ┌─────┴─────┐
    │           │
    ↓           ↓
CORRECTA    INCORRECTA
    │           │
    ├─ ✅       ├─ ❌
    ├─ +1 correct    ├─ +1 incorrect
    ├─ streak++      ├─ streak = 0
    │           │
    ├─ streak===3?   ├─ incorrect>=2?
    │   SÍ: "¡Vamos  │   SÍ: "Practiquemos
    │    con algo     │    algo más fácil"
    │    más difícil!"│
    │           │
    ↓           ↓
┌────────────────────┐
│ Mostrar feedback   │
│ + explicación      │
└────────────────────┘
```

---

### HU-006: Dashboard de Profesores 👨‍🏫

**Actor Principal:** Profesor  
**Prioridad:** ALTA  
**Sprint:** 5  
**Story Points:** 13

#### Descripción

Como profesor, quiero visualizar el progreso de mis alumnos por materia y tema para identificar quiénes necesitan apoyo adicional.

#### Criterios de Aceptación

- ⬜ Lista de alumnos con progreso general
- ⬜ Filtro por materia y grado
- ⬜ Indicadores de alumnos en riesgo (< 60%)
- ⬜ Detalle individual: temas completados, scores, tiempo invertido
- ⬜ Gráficos de progreso por alumno

#### Workflow (Pendiente Implementación)

```
Profesor Login
      │
      ├─ Rol: Profesor → Dashboard Profesores
      ↓
┌──────────────────────────────────────┐
│    Dashboard Profesores              │
│                                       │
│  Grupo: 5to Primaria - Sección A     │
│  ┌─────────────────────────────────┐ │
│  │ Alumno          │ Progreso │ ⚠️ │ │
│  ├─────────────────┼──────────┼────┤ │
│  │ Juan Pérez      │ 85% ✅   │    │ │
│  │ María López     │ 45% ⚠️   │ 🔴 │ │
│  │ Carlos Ruiz     │ 72% ✅   │    │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Click en alumno → Detalle           │
└──────────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│   Detalle: María López                │
│                                       │
│   Matemáticas: 30% ⚠️                │
│   ├─ Sumas: ✅ 80%                   │
│   ├─ Restas: ✅ 70%                  │
│   └─ Multiplicación: 🔵 0% (bloqueado)│
│                                       │
│   Lengua: 60% ⚠️                     │
│   ├─ Lectura: ✅ 75%                 │
│   └─ Ortografía: ❌ 45%              │
│                                       │
│   Últimas 5 actividades:              │
│   1. Restas - 70% (3 intentos)       │
│   2. Sumas - 80% (1 intento)         │
│                                       │
│   💡 Recomendación:                   │
│   "Reforzar multiplicación básica"    │
└──────────────────────────────────────┘
```

---

### HU-007: Dashboard Ejecutivo 📊

**Actor Principal:** Administrador/Director  
**Prioridad:** MEDIA  
**Sprint:** 6  
**Story Points:** 13

#### Descripción

Como director académico, quiero visualizar métricas agregadas de toda la institución para tomar decisiones estratégicas sobre el contenido y la enseñanza.

#### Criterios de Aceptación

- ⬜ KPIs principales: Alumnos activos, Tasa de finalización, Tiempo promedio
- ⬜ Gráfico de materias más/menos populares
- ⬜ Temas con mayor índice de dificultad
- ⬜ Tendencias de engagement por semana/mes
- ⬜ Comparativa entre grupos/grados

#### Workflow (Pendiente Implementación)

```
Admin Login
      │
      ├─ Rol: Admin → Dashboard Ejecutivo
      ↓
┌─────────────────────────────────────────────┐
│         Dashboard Ejecutivo                  │
│                                              │
│  📊 KPIs Institucionales                    │
│  ┌──────────────┬──────────────┬──────────┐│
│  │ Alumnos      │ Tasa de      │ Tiempo   ││
│  │ Activos      │ Finalización │ Promedio ││
│  │              │              │          ││
│  │    450       │    68%       │  45 min  ││
│  └──────────────┴──────────────┴──────────┘│
│                                              │
│  📈 Materias más populares                  │
│  ┌─────────────────────────────────────┐   │
│  │ 1. Matemáticas      ████████  85%   │   │
│  │ 2. Ciencias         ██████    60%   │   │
│  │ 3. Lengua           ████      45%   │   │
│  └─────────────────────────────────────┘   │
│                                              │
│  ⚠️ Temas con mayor dificultad              │
│  ┌─────────────────────────────────────┐   │
│  │ 1. División (Math)   Avg: 52%       │   │
│  │ 2. Ortografía        Avg: 58%       │   │
│  └─────────────────────────────────────┘   │
│                                              │
│  📅 Tendencia de Engagement (últimos 30 días)│
│  ┌─────────────────────────────────────┐   │
│  │      /\    /\                        │   │
│  │     /  \  /  \  /\                   │   │
│  │    /    \/    \/  \                  │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

### HU-008: Exportación de Datos 📤

**Actor Principal:** Profesor, Administrador  
**Prioridad:** MEDIA  
**Sprint:** 6  
**Story Points:** 5

#### Descripción

Como profesor/administrador, quiero exportar reportes en formato CSV y PDF para realizar análisis externos o presentaciones.

#### Criterios de Aceptación

- ⬜ Exportar progreso de alumnos (CSV)
- ⬜ Exportar métricas institucionales (CSV)
- ⬜ Generar reporte PDF con gráficos
- ⬜ Selección de rango de fechas
- ⬜ Filtros por materia, grado, grupo

#### Workflow (Pendiente Implementación)

```
Usuario (Profesor/Admin)
         │
         ├─ Click "Exportar Datos"
         ↓
┌──────────────────────────┐
│  Modal de Exportación     │
│                           │
│  Tipo: ○ CSV  ○ PDF      │
│  Datos: ☑ Alumnos        │
│         ☑ Progreso        │
│         ☐ Métricas        │
│                           │
│  Filtros:                 │
│  Materia: [Matemáticas ▼]│
│  Grado: [5to ▼]          │
│  Fechas: [01/09 - 30/11] │
│                           │
│  [Cancelar]  [Exportar]  │
└───────────┬──────────────┘
            │
            ├─ Click Exportar
            ↓
┌──────────────────────────┐
│  Generar archivo          │
│  - Consulta BD/localStorage│
│  - Aplica filtros         │
│  - Formatea datos         │
│  - Genera CSV/PDF         │
└───────────┬──────────────┘
            │
            ├─ Download
            ↓
┌──────────────────────────┐
│ alumnos_5to_matematicas_ │
│ 20251109.csv              │
│                           │
│ nombre,progreso,score     │
│ Juan Pérez,85%,82         │
│ María López,45%,52        │
└──────────────────────────┘
```

---

## 🎭 Casos de Uso Extendidos (ECUS)

### ECU-001: Inicio de Sesión Exitoso

**Actores:** Alumno  
**Precondiciones:**

- Usuario registrado en el sistema
- Credenciales válidas

**Flujo Principal:**

1. Usuario accede a la página de login
2. Sistema muestra formulario con campos email y password
3. Usuario ingresa credenciales y presiona "Iniciar Sesión"
4. Sistema valida formato de email
5. Sistema busca usuario en `users.json`
6. Sistema valida contraseña
7. Sistema carga datos del usuario desde localStorage
8. Sistema verifica estado de encuesta
   - Si `surveyCompleted === false` → Redirige a Survey
   - Si `surveyCompleted === true` → Redirige a Home
9. Usuario visualiza vista correspondiente

**Flujos Alternativos:**

**4a. Email con formato inválido**

- Sistema muestra error: "Email inválido"
- Vuelve al paso 3

**6a. Contraseña incorrecta**

- Sistema muestra error: "Credenciales incorrectas"
- Vuelve al paso 3

**7a. Usuario no existe**

- Sistema muestra error: "Usuario no encontrado"
- Ofrece enlace a registro
- Vuelve al paso 3

**Postcondiciones:**

- Usuario autenticado
- Sesión activa en memoria (state)
- Progreso cargado

---

### ECU-002: Completar Tema de Aprendizaje

**Actores:** Alumno, Motor Adaptativo  
**Precondiciones:**

- Usuario autenticado
- Tema desbloqueado (tema anterior completado o es el primero)

**Flujo Principal:**

1. Usuario selecciona materia desde LearningMap
2. Sistema muestra mapa de temas de la materia
3. Sistema consulta `ProgressService.getTopicStatus()` para cada tema
4. Sistema muestra temas con indicadores:
   - ✅ Completado (score >= 70%)
   - 🔵 Desbloqueado (order === 1 o anterior completado)
   - 🔒 Bloqueado (anterior no completado)
5. Usuario hace click en tema desbloqueado
6. Sistema carga `Activity.js` con las preguntas del tema
7. Sistema muestra pregunta 1 de N con opciones múltiples
8. Usuario selecciona respuesta y presiona "Enviar"
9. Sistema valida respuesta:
   - Correcta: ✅ + 1 correct, streak++
   - Incorrecta: ❌ + 1 incorrect, streak = 0
10. Sistema evalúa racha adaptativa:
    - Si streak === 3 → Mensaje: "¡Vamos con algo más difícil! 🎉"
    - Si incorrect >= 2 → Mensaje: "Practiquemos más fácil 💪"
11. Sistema muestra feedback y botón "Siguiente"
12. Repite pasos 7-11 hasta completar todas las preguntas
13. Sistema calcula score final: `(correct / total) * 100`
14. Sistema determina estado:
    - score >= 70% → `completed = true`
    - score < 70% → `completed = false`
15. Sistema llama `ProgressService.saveTopicProgress()`
16. Sistema guarda en localStorage:
    ```json
    {
      "math_sumas": {
        "completed": true,
        "score": 85,
        "attempts": 1,
        "lastAttempt": "2025-11-15T10:30:00Z"
      }
    }
    ```
17. Sistema verifica desbloqueo del siguiente tema
18. Sistema redirige a LearningMap actualizado
19. Usuario ve tema completado ✅ y siguiente tema desbloqueado 🔵

**Flujos Alternativos:**

**5a. Usuario intenta tema bloqueado**

- Sistema muestra mensaje: "Completa el tema anterior"
- No permite acceso
- Vuelve al paso 4

**14a. Score < 70% (No completado)**

- Sistema guarda `completed = false`
- Tema siguiente permanece bloqueado
- Sistema muestra: "Sigue practicando. Necesitas 70% para avanzar"
- Usuario puede reintentar inmediatamente
- Vuelve al paso 6

**Postcondiciones:**

- Progreso guardado en localStorage
- Si completado: Siguiente tema desbloqueado
- Estadísticas actualizadas

---

### ECU-003: Visualizar Progreso de Alumno (Profesor)

**Actores:** Profesor  
**Precondiciones:**

- Profesor autenticado
- Alumnos registrados con progreso

**Flujo Principal:**

1. Profesor accede a Dashboard de Profesores
2. Sistema carga lista de alumnos del grupo asignado
3. Para cada alumno, sistema calcula:
   - Progreso general: `(temas completados / total temas) * 100`
   - Estado: ✅ (>70%), ⚠️ (<70%), 🔴 (<50%)
4. Sistema muestra tabla con columnas:
   - Nombre del alumno
   - Progreso general (%)
   - Indicador de riesgo
5. Profesor hace click en un alumno
6. Sistema carga vista de detalle con:
   - Progreso por materia (%)
   - Lista de temas por materia con estado
   - Últimas 5 actividades realizadas
   - Tiempo total invertido
   - Número de intentos por tema
7. Sistema genera recomendaciones automáticas:
   - "Reforzar multiplicación" (si < 60%)
   - "Necesita apoyo en ortografía"
8. Profesor visualiza información y puede:
   - Exportar reporte individual
   - Asignar tareas adicionales
   - Contactar al alumno

**Flujos Alternativos:**

**2a. No hay alumnos asignados**

- Sistema muestra: "No tienes alumnos asignados"
- Ofrece contactar al administrador

**Postcondiciones:**

- Profesor informado del estado de sus alumnos
- Decisiones pedagógicas fundamentadas

---

## 💾 Modelo de Datos

### Estructura de Usuario

```json
{
  "id": "u001",
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "password123",
  "rol": "alumno",
  "surveyData": {
    "grado": "5to Primaria",
    "materiasFavoritas": ["Matemáticas", "Ciencias"],
    "estiloAprendizaje": "Visual",
    "hobbies": ["Videojuegos", "Deportes"]
  },
  "surveyCompleted": true,
  "fechaRegistro": "2025-11-01T10:00:00Z"
}
```

### Estructura de Progreso

```json
{
  "progress_u001": {
    "math_sumas": {
      "completed": true,
      "score": 95,
      "attempts": 2,
      "lastAttempt": "2025-11-15T10:30:00Z"
    },
    "math_restas": {
      "completed": true,
      "score": 80,
      "attempts": 1,
      "lastAttempt": "2025-11-14T15:20:00Z"
    },
    "math_multiplicacion": {
      "completed": false,
      "score": 65,
      "attempts": 3,
      "lastAttempt": "2025-11-13T09:10:00Z"
    }
  }
}
```

### Estructura de Contenido (learningPaths.json)

```json
{
  "subjects": [
    {
      "id": "math",
      "name": "Matemáticas",
      "icon": "🔢",
      "topics": [
        {
          "id": "sumas",
          "name": "Sumas Básicas",
          "order": 1,
          "difficulty": "facil",
          "activities": [
            {
              "id": "sum_q1",
              "type": "multiple-choice",
              "question": "¿Cuánto es 5 + 3?",
              "options": ["6", "7", "8", "9"],
              "correctAnswer": "8",
              "explanation": "5 + 3 = 8. Puedes contarlo con tus dedos."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🏗️ Arquitectura de Capas

### Capa de Presentación (Pages)

**Responsabilidad:** Renderizar UI y capturar interacciones del usuario

**Componentes:**

- `Login.js` - Formulario de autenticación
- `Register.js` - Formulario de registro
- `Survey.js` - Encuesta multi-paso
- `Home.js` - Dashboard principal
- `LearningMap.js` - Visualización de rutas
- `Activity.js` - Interfaz de ejercicios

**Principios:**

- Sin lógica de negocio
- Solo manejo de estado local (UI)
- Comunicación con App.js mediante callbacks
- Uso de servicios para operaciones de datos

---

### Capa de Servicios (Services)

**Responsabilidad:** Centralizar lógica de negocio y acceso a datos

#### AuthService

```javascript
class AuthService {
  static login(email, password) {
    // Busca en users.json
    // Valida contraseña
    // Carga datos de localStorage
    // Retorna { success, user, error }
  }

  static register(nombre, email, password) {
    // Valida email único
    // Crea nuevo usuario
    // Guarda en localStorage
    // Retorna { success, user, error }
  }

  static updateUser(userId, updates) {
    // Actualiza datos del usuario
    // Sincroniza localStorage
  }

  static completeSurvey(userId, surveyData) {
    // Guarda respuestas de encuesta
    // Marca surveyCompleted = true
  }
}
```

#### ProgressService

```javascript
class ProgressService {
  static getProgress(userId) {
    // Lee localStorage progress_{userId}
    // Retorna objeto de progreso
  }

  static getTopicStatus(userId, subjectId, topicId) {
    // Consulta estado específico de un tema
    // Retorna { completed, score, attempts }
  }

  static saveTopicProgress(userId, subjectId, topicId, completed, score) {
    // Guarda o actualiza progreso de tema
    // Actualiza mejor score si es mayor
    // Incrementa attempts
  }

  static isTopicUnlocked(userId, subjectId, topicOrder) {
    // Verifica si tema anterior está completado
    // Retorna boolean
  }

  static getSubjectStats(userId, subjectId) {
    // Calcula estadísticas agregadas
    // Retorna { completedTopics, totalTopics, percentage }
  }
}
```

---

### Capa de Datos (Data)

**Responsabilidad:** Persistencia y almacenamiento

**Fuentes de datos:**

1. **localStorage** (runtime)

   - `users` - Usuarios registrados
   - `progress_{userId}` - Progreso individual

2. **JSON Files** (estáticos)
   - `users.json` - Usuarios predefinidos
   - `learningPaths.json` - Contenido educativo

**Operaciones:**

- `localStorage.getItem(key)`
- `localStorage.setItem(key, JSON.stringify(data))`
- `import dataJson from './data.json'`

---

## 📊 Diagramas Adicionales

### Diagrama de Flujo General del Sistema

```
┌─────────────┐
│   Usuario   │
│   accede    │
└──────┬──────┘
       │
       ↓
  ¿Registrado?
   ╱        ╲
 NO          SÍ
  ↓           ↓
Register    Login
  │           │
  └─────┬─────┘
        │
        ↓
  ¿Survey completa?
   ╱            ╲
 NO              SÍ
  ↓               ↓
Survey          Home
  │               │
  └───────┬───────┘
          │
          ↓
    Learning Map
          │
          ├─ Selecciona materia
          ↓
    Mapa de Temas
          │
          ├─ Click en tema desbloqueado
          ↓
     Activities
          │
          ├─ Responde preguntas
          ├─ Recibe feedback
          ├─ Guarda progreso
          │
          ↓
    ¿Score >= 70%?
     ╱          ╲
   SÍ            NO
    │             │
 Completa     Reintentar
    │             │
Desbloquea       │
siguiente ←──────┘
    │
    ↓
Back to Map
```

---

## 🔐 Consideraciones de Seguridad (Producción)

### Estado Actual (MVP)

- ❌ Contraseñas en texto plano
- ❌ Sin HTTPS
- ❌ Sin tokens de sesión
- ❌ localStorage sin cifrado

### Mejoras Recomendadas

- ✅ Hash de contraseñas (bcrypt)
- ✅ JWT para autenticación
- ✅ HTTPS obligatorio
- ✅ Validación server-side
- ✅ Rate limiting en login
- ✅ Cifrado de datos sensibles

---

## 🚀 Roadmap de Evolución

### Fase 1: MVP (Completado) ✅

- HU-001: Login
- HU-002: Registro
- HU-003: Encuesta
- HU-004: Rutas Adaptativas

### Fase 2: Analytics (Pendiente) ⏳

- HU-005: Feedback Avanzado
- HU-006: Dashboard Profesores
- HU-007: Dashboard Ejecutivo
- HU-008: Exportación de Datos

### Fase 3: Escalabilidad (Futuro) 🔮

- Backend REST API (Node.js + Express)
- Base de datos (PostgreSQL/MongoDB)
- Machine Learning real para adaptación
- Gamificación (badges, leaderboards)
- Modo offline (PWA)
- Aplicación móvil (React Native)

---

## 📞 Contacto y Mantenimiento

**Desarrollador:** Equipo EdTech MVP  
**Repositorio:** `project_edtech`  
**Branch:** `main`  
**Última actualización:** 15 de Noviembre, 2025

---

## 📚 Referencias

- [React Documentation](https://react.dev)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [UML Diagrams Best Practices](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/)
- [Adaptive Learning Systems](https://en.wikipedia.org/wiki/Adaptive_learning)

---

**Fin del Documento de Arquitectura**
