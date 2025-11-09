# Historias de Usuario Simplificadas - Plataforma EdTech

## 📚 Proyecto: Sistema Educativo Adaptativo para Primaria

Este directorio contiene las **8 Historias de Usuario** del proyecto, escritas de forma **simple y sin tecnicismos**, enfocadas en la **perspectiva del usuario** (alumnos, profesores, directores y padres).

---

## 👥 Usuarios del Sistema

### 🎒 Alumnos (8-12 años)

- Estudiantes de primaria de 3° a 6° grado
- Usuarios principales de la plataforma
- Reciben aprendizaje personalizado y adaptativo

### 👨‍🏫 Profesores

- Monitoran el progreso de sus grupos
- Intervienen cuando detectan alumnos en riesgo
- Crean y asignan actividades

### 👔 Directores/Coordinadores

- Toman decisiones estratégicas
- Analizan métricas institucionales
- Demuestran ROI a stakeholders

### 👨‍👩‍👧 Padres/Tutores

- Supervisan el progreso de sus hijos
- Autorizan el acceso de menores de 13 años (COPPA)
- Reciben notificaciones sobre avances y alertas

---

## 📋 Catálogo de Historias de Usuario

### 🔐 Módulo 1: Acceso y Registro

#### [HU-001: Inicio de Sesión Seguro](./HU-001-login-basico.md)

**Prioridad**: CRÍTICA | **Estimación**: 13 SP

Permite que usuarios inicien sesión de forma segura con:

- Email y contraseña
- Google o Microsoft (OAuth)
- Verificación en dos pasos (2FA) opcional
- Protección contra intentos fallidos
- Cumplimiento COPPA para menores de 13 años

**Beneficio clave**: Acceso rápido y seguro en menos de 2 segundos

---

#### [HU-002: Registro de Nuevos Usuarios](./HU-002-registro-usuario.md)

**Prioridad**: CRÍTICA | **Estimación**: 8 SP

Permite que nuevos usuarios se registren según su rol:

- **Profesores**: Con email institucional
- **Alumnos**: Con consentimiento parental obligatorio (<13 años)
- **Padres**: Para supervisar a sus hijos

**Beneficio clave**: Proceso de registro simple completado en menos de 3 minutos

---

### 📝 Módulo 2: Evaluación y Personalización

#### [HU-003: Encuesta Inicial para Conocer al Alumno](./HU-003-encuesta-inicial.md)

**Prioridad**: ALTA | **Estimación**: 8 SP

Encuesta divertida de 10-15 minutos que evalúa:

- Nivel de conocimientos por materia
- Estilo de aprendizaje preferido
- Intereses personales

**Beneficio clave**: Recomendaciones personalizadas desde el primer día

---

### 🎯 Módulo 3: Aprendizaje Adaptativo

#### [HU-004: Rutas de Aprendizaje Personalizadas](./HU-004-ruta-adaptativa.md)

**Prioridad**: CRÍTICA | **Estimación**: 13 SP

Sistema inteligente que:

- Adapta la dificultad en tiempo real
- Detecta cuando un alumno está atascado
- Desbloquea contenidos progresivamente
- Mantiene al alumno en su "zona de desarrollo próximo"

**Beneficio clave**: Aprender sin aburrirse ni frustrarse, a su propio ritmo

---

#### [HU-005: Retroalimentación Inteligente](./HU-005-feedback-alumno.md)

**Prioridad**: ALTA | **Estimación**: 8 SP

Asistente virtual que:

- Da pistas progresivas cuando el alumno se equivoca
- Explica conceptos con lenguaje apropiado para niños
- Identifica patrones de error
- Chatbot tutor disponible 24/7

**Beneficio clave**: Ayuda inmediata sin esperar al profesor

---

### 📊 Módulo 4: Monitoreo y Análisis

#### [HU-006: Panel de Control para Profesores](./HU-006-dashboard-profesores.md)

**Prioridad**: ALTA | **Estimación**: 10 SP

Dashboard que muestra:

- Progreso de todos los alumnos con semáforo visual 🟢🟡🔴
- Alertas automáticas de alumnos en riesgo
- Herramientas de intervención rápida
- Análisis por materia y concepto

**Beneficio clave**: Reducción del 60% en tiempo de monitoreo manual

---

#### [HU-007: Panel Ejecutivo para Directores](./HU-007-dashboard-ejecutivo.md)

**Prioridad**: MEDIA-ALTA | **Estimación**: 8 SP

Dashboard ejecutivo con:

- 6 KPIs principales (adopción, progreso, retención, ROI)
- Identificación automática de oportunidades de mejora
- Comparación con períodos anteriores
- Generación de reportes ejecutivos en PowerPoint/PDF

**Beneficio clave**: Decisiones 50% más rápidas basadas en datos reales

---

### 📤 Módulo 5: Exportación y Reportes

#### [HU-008: Exportación de Datos y Reportes](./HU-008-exportacion-datos.md)

**Prioridad**: MEDIA | **Estimación**: 5 SP

Sistema de exportación que permite:

- Exportar datos en Excel, CSV, JSON, PDF
- Asistente paso a paso para personalizar reportes
- Reportes automáticos programados (semanal/mensual)
- Protección automática de datos personales

**Beneficio clave**: Reducción del 80% en tiempo de generación de reportes

---

## 📊 Resumen de Story Points

| Historia  | Prioridad  | Story Points | Días Estimados |
| --------- | ---------- | ------------ | -------------- |
| HU-001    | CRÍTICA    | 13           | 10             |
| HU-002    | CRÍTICA    | 8            | 6              |
| HU-003    | ALTA       | 8            | 6              |
| HU-004    | CRÍTICA    | 13           | 10             |
| HU-005    | ALTA       | 8            | 6              |
| HU-006    | ALTA       | 10           | 8              |
| HU-007    | MEDIA-ALTA | 8            | 6              |
| HU-008    | MEDIA      | 5            | 4              |
| **TOTAL** | -          | **73**       | **56 días**    |

---

## 🎯 Roadmap de Implementación

### Sprint 1-2 (Semanas 1-4): Fundamentos

- ✅ HU-001: Login y autenticación
- ✅ HU-002: Registro de usuarios

### Sprint 3-4 (Semanas 5-8): Personalización

- ✅ HU-003: Encuesta inicial
- ✅ HU-004: Rutas adaptativas

### Sprint 5 (Semanas 9-10): Inteligencia

- ✅ HU-005: Retroalimentación con IA

### Sprint 6 (Semanas 11-12): Dashboards

- ✅ HU-006: Dashboard profesores
- ✅ HU-007: Dashboard ejecutivo
- ✅ HU-008: Exportación de datos

---

## 📈 Valor de Negocio

### Para Alumnos

- 📚 Aprendizaje personalizado a su ritmo
- 🎮 Gamificación que mantiene la motivación
- 🤖 Tutor virtual disponible 24/7
- ✨ Experiencia sin frustración

### Para Profesores

- ⏱️ 60% menos tiempo en monitoreo manual
- 🚨 Alertas tempranas de alumnos en riesgo
- 📊 Datos concretos para intervenciones
- 🎯 Enfoque en alumnos que más lo necesitan

### Para Directores

- 💰 ROI demostrable: $520K vs $180K inversión (289%)
- 📈 30% mejora en retención de alumnos
- ⚡ 50% más velocidad en decisiones estratégicas
- 🏆 Identificación de 5-10 oportunidades por trimestre

### Para Padres

- 👀 Transparencia total del progreso
- 📱 Notificaciones sobre avances importantes
- ✅ Control sobre datos de menores de 13 años
- 🤝 Comunicación directa con profesores

---

## 🔒 Cumplimiento Normativo

### COPPA (Children's Online Privacy Protection Act)

- ✅ **100% de alumnos <13 años requieren consentimiento parental**
- ✅ Minimización de datos recolectados
- ✅ Derecho de los padres a revisar/eliminar datos
- ✅ No venta de información de menores

### GDPR (General Data Protection Regulation)

- ✅ Derecho al olvido
- ✅ Portabilidad de datos
- ✅ Consentimiento explícito y claro

### FERPA (Family Educational Rights and Privacy Act)

- ✅ Protección de registros educativos
- ✅ Acceso controlado solo a personal autorizado

---

## 📚 Documentación Técnica

Para desarrolladores y personal técnico, consultar la documentación detallada en:

📂 **[/evidencias-tecnicas](../evidencias-tecnicas/README.md)**

Incluye:

- Arquitecturas de sistema
- Diagramas de flujo
- Modelos de datos
- Algoritmos de ML/IA
- Especificaciones de APIs
- Guías de implementación

---

## ✨ Características Destacadas

### 🤖 Inteligencia Artificial

- **GPT-4** para retroalimentación personalizada
- **Random Forest** para predicción de churn
- **Knowledge Tracing** para seguimiento de aprendizaje
- **LSTM** para predicción de rendimiento

### 📊 Analytics Avanzado

- Dashboards en tiempo real
- Alertas predictivas automáticas
- Benchmarking institucional
- Cálculo automático de ROI

### 🎮 Gamificación

- Sistema de puntos y estrellas
- Desbloqueo progresivo de contenidos
- Celebraciones visuales de logros
- Mapa de aprendizaje tipo "aventura"

### 🔐 Seguridad Robusta

- Autenticación JWT + OAuth 2.0
- Rate limiting anti-abuso
- Cifrado de datos sensibles
- Auditoría completa de accesos

---

## 🎯 Métricas de Éxito

| Métrica                   | Objetivo  | Impacto                 |
| ------------------------- | --------- | ----------------------- |
| Adopción de plataforma    | >90%      | ✅ Uso masivo           |
| Tiempo de sesión promedio | 25-30 min | ✅ Engagement alto      |
| Tasa de retención         | >94%      | ✅ Satisfacción         |
| Progreso promedio         | >70%      | ✅ Efectividad          |
| Satisfacción usuarios     | >8.5/10   | ✅ Experiencia positiva |
| ROI institucional         | >200%     | ✅ Valor financiero     |

---

## 📞 Soporte

Para dudas sobre estas historias de usuario:

- **Product Owner**: po@edtech.com
- **Scrum Master**: sm@edtech.com
- **Equipo de Desarrollo**: dev@edtech.com

---

**Versión**: 1.0  
**Fecha**: 09/11/2025  
**Audiencia**: Product Owners, Stakeholders, Equipos no técnicos  
**Complemento técnico**: Ver [/evidencias-tecnicas](../evidencias-tecnicas/README.md)
