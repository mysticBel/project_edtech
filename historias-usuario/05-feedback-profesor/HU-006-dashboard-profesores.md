# HU-006: Dashboard de Insights y Alertas para Profesores

## 📋 METADATOS

- **ID**: HU-006
- **Épica**: Feedback y Retroalimentación
- **Prioridad**: ALTA
- **Estimación**: 10 Story Points
- **Sprint**: 5
- **Stakeholders**: Profesores, Coordinadores Académicos, Directores
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario

**¿Quién?** Profesor a cargo de 30-120 alumnos  
**¿Qué?** Dashboard con insights accionables sobre progreso, alertas automáticas de alumnos en riesgo y recomendaciones de intervención  
**¿Por qué?** Para identificar rápidamente quién necesita ayuda, tomar decisiones pedagógicas basadas en datos y reducir tiempo de seguimiento manual en 60%

**Ambigüedades detectadas**:

- ¿Qué nivel de granularidad? (Individual vs grupal)
- ¿Con qué frecuencia se actualizan las alertas?
- ¿El sistema sugiere intervenciones o solo alerta?
- ¿Se puede exportar información para reportes administrativos?

### Perspectiva Técnica

**Implementable**: ✅ Sí con analytics + IA  
**Restricciones**:

- Procesamiento de datos en tiempo real con latencia <5 segundos
- Motor de alertas basado en reglas + ML para predicción de riesgo
- Dashboard responsive con visualizaciones interactivas (Chart.js/D3.js)
- Exportación de reportes en PDF/CSV

### Perspectiva de Negocio

**Valor medible**:

- Reducción 60% en tiempo de seguimiento manual por profesor
- Incremento 40% en detección temprana de alumnos en riesgo
- Mejora 45% en efectividad de intervenciones pedagógicas
- Reducción 30% en tasa de deserción por intervención oportuna

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** profesor a cargo de 50 alumnos de primaria  
**Quiero** ver en un dashboard visual el progreso de cada alumno, alertas en rojo de quiénes están atascados y sugerencias concretas de qué hacer  
**Para** poder intervenir rápidamente sin perder horas revisando actividades una por una

#### Criterios de Aceptación UX:

1. **DADO** que accedo al dashboard de mis alumnos  
   **CUANDO** veo la vista general  
   **ENTONCES** veo mapa de calor con código de colores: verde (bien), amarillo (atención), rojo (intervención urgente)

2. **DADO** que hay alertas pendientes  
   **CUANDO** entro al dashboard  
   **ENTONCES** veo notificaciones priorizadas: "3 alumnos necesitan atención urgente" con nombres y razón

3. **DADO** que hago clic en un alumno en riesgo  
   **CUANDO** veo su perfil  
   **ENTONCES** veo: área de dificultad, intentos fallidos, tiempo sin actividad + botón "Enviar mensaje de apoyo"

4. **DADO** que quiero hacer reporte mensual  
   **CUANDO** hago clic en "Exportar"  
   **ENTONCES** descargo PDF con estadísticas agregadas y lista de alumnos destacados/en riesgo

5. **DADO** que uso móvil  
   **CUANDO** accedo al dashboard  
   **ENTONCES** veo vista simplificada con alertas principales y acceso rápido a contactar alumnos

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** sistema de analytics educativos  
**Quiero** procesar datos de actividad en tiempo real y generar alertas predictivas con ML  
**Para** detectar alumnos en riesgo 5 días antes de que abandonen con precisión ≥75%

#### Criterios de Aceptación Técnicos:

1. **DADO** que se implementa motor de alertas  
   **CUANDO** se analizan patrones de actividad  
   **ENTONCES** se generan alertas categorizadas: inactividad, dificultad recurrente, regresión de rendimiento

2. **DADO** que se usa ML predictivo  
   **CUANDO** se detectan señales de riesgo (inactividad >3 días, accuracy <50% en 5 actividades)  
   **ENTONCES** se predice probabilidad de abandono con precisión ≥75% y se alerta al profesor

3. **DADO** que se procesan métricas  
   **CUANDO** se calcula progreso de grupo  
   **ENTONCES** se generan insights: "El 35% de tu grupo está atascado en fracciones" con latencia <5 seg

4. **DADO** que se escala a 500 profesores  
   **CUANDO** todos acceden simultáneamente  
   **ENTONCES** dashboard se carga en <3 segundos usando cache y queries optimizadas

5. **DADO** que se audita calidad  
   **CUANDO** se revisan alertas generadas  
   **ENTONCES** >85% de alertas resultan en intervención efectiva (no falsos positivos)

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** coordinador académico  
**Quiero** una herramienta que reduzca el tiempo de seguimiento de profesores en 60% y mejore detección de riesgo en 40%  
**Para** aumentar retención de alumnos en 30% y optimizar recursos docentes, con ROI de $180K/año

#### Criterios de Aceptación de Negocio:

1. **DADO** que se mide impacto  
   **CUANDO** se compara pre/post implementación  
   **ENTONCES** profesores ahorran 10h/semana en seguimiento manual (60% reducción)

2. **DADO** que se valida efectividad de alertas  
   **CUANDO** se detecta alumno en riesgo  
   **ENTONCES** intervención en <24h aumenta probabilidad de retención en 45%

3. **DADO** que se busca adopción  
   **CUANDO** pasan 2 semanas del lanzamiento  
   **ENTONCES** >90% de profesores usan dashboard semanalmente

4. **DADO** que se generan insights estratégicos  
   **CUANDO** se agregan datos de todos los cursos  
   **ENTONCES** se identifican conceptos problemáticos a nivel institucional para mejorar curriculum

5. **DADO** que se demuestra valor  
   **CUANDO** se presenta a stakeholders  
   **ENTONCES** se evidencia: -30% deserción, +20% satisfacción docente, $180K ROI

**KPIs**:

- Tiempo de seguimiento: -60% (de 15h/semana a 6h/semana)
- Detección temprana de riesgo: +40%
- Efectividad de intervenciones: +45%
- Reducción de deserción: -30%

---

## 🎯 VERSIÓN FINAL SINTETIZADA

**Matriz de Decisión**:

- Valor de negocio (30%): Versión C = 10/10
- Factibilidad técnica (25%): Versión B = 8/10
- Experiencia de usuario (25%): Versión A = 9/10
- Esfuerzo de implementación (20%): Versión A+B = 7/10
  **Puntuación final**: 8.6/10

---

## 📝 HISTORIA REFINADA FINAL

**Como** profesor de matemáticas a cargo de 50 alumnos de primaria (8-12 años)  
**Quiero** acceder a un dashboard que me muestre en tiempo real el progreso de cada alumno, alertas automáticas de quiénes están en riesgo (inactividad >3 días, dificultad recurrente) y recomendaciones concretas de intervención  
**Para** reducir mi tiempo de seguimiento manual en 60% (de 15h a 6h/semana), detectar problemas 5 días antes con precisión ≥75% e intervenir oportunamente, mejorando retención en 30%

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Vista General del Dashboard con Mapa de Calor

**DADO** que soy profesor "Juan Pérez" con 50 alumnos asignados  
**Y** accedo a mi dashboard desde desktop  
**CUANDO** cargo la página principal  
**ENTONCES**:

- Veo título: "Dashboard de Matemáticas - Grupo 3°A (50 alumnos)"
- **Sección 1: Resumen Rápido** (cards en fila superior):
  - 📊 Promedio de progreso del grupo: 68% (con flecha ↑ +5% vs semana pasada)
  - ⚠️ Alertas activas: 7 alumnos necesitan atención
  - 🎯 Actividad reciente: 35 alumnos activos en últimas 24h
  - 📈 Tendencia: "Mejorando" con mini gráfico de línea
- **Sección 2: Mapa de Calor de Alumnos** (grid 10x5):
  - Cada alumno = card con:
    - Foto/Avatar
    - Nombre: "María García"
    - Color de fondo:
      - 🟢 Verde: Progreso >75%, activo en 24h
      - 🟡 Amarillo: Progreso 50-75% o inactivo 2-3 días
      - 🔴 Rojo: Progreso <50% o inactivo >3 días o dificultad recurrente
    - Badge si hay alerta: 🚨 "Atención"
- **Sección 3: Filtros rápidos**:
  - [Todos] [Solo alertas] [Inactivos] [Bajo rendimiento] [Destacados]
- El dashboard carga en <3 segundos con datos en tiempo real

### Escenario 2: Alertas Priorizadas y Accionables

**DADO** que hay 7 alumnos con alertas activas  
**CUANDO** hago clic en "Alertas activas: 7"  
**ENTONCES**:

- Veo panel lateral con lista priorizada:

  **🔴 URGENTE (2 alumnos)**

  1. **Pedro Martínez** - Inactivo 7 días

     - Última actividad: 2025-10-30
     - Riesgo de abandono: 85% (predicción ML)
     - **Acción sugerida**: "Contactar urgente por email/WhatsApp"
     - Botones: [Enviar mensaje] [Llamar] [Marcar como gestionado]

  2. **Ana López** - Falló 8 actividades consecutivas en "Fracciones"
     - Accuracy: 35% (últimas 10 actividades)
     - **Acción sugerida**: "Asignar sesión de tutoría personalizada"
     - Botones: [Agendar tutoría] [Enviar recursos de apoyo]

  **🟡 ATENCIÓN (5 alumnos)** 3. **Luis Torres** - Progreso lento (solo 15% en 2 semanas)

  - Tiempo por actividad: 2.5x promedio del grupo
  - **Acción sugerida**: "Revisar si necesita ajuste de nivel"
  - Botones: [Ver perfil detallado] [Contactar]

  [...más alumnos]

- Cada alerta muestra:
  - Tipo de alerta (inactividad, bajo rendimiento, dificultad recurrente)
  - Datos específicos (días inactivo, % accuracy, concepto problemático)
  - Predicción de riesgo si aplica
  - Acción sugerida concreta
  - Botones de acción rápida

### Escenario 3: Perfil Detallado de Alumno en Riesgo

**DADO** que hago clic en alumno "Ana López" (alerta roja: dificultad recurrente)  
**CUANDO** se abre su perfil detallado  
**ENTONCES**:

- **Sección 1: Información General**
  - Nombre: Ana López
  - Perfil de aprendizaje: Auditivo-Social
  - Nivel actual: Intermedio (7/10 en general, 5/10 en fracciones)
- **Sección 2: Alerta Activa**
  - 🔴 "Dificultad recurrente en Fracciones"
  - Detalles: "Ha fallado 8 de 10 últimas actividades con accuracy promedio 35%"
  - Riesgo: "Medio-Alto de frustración y potencial abandono del tema"
- **Sección 3: Análisis de Desempeño**
  - Gráfico de línea: Accuracy en últimas 20 actividades (tendencia descendente)
  - Gráfico de barras: Tiempo promedio por actividad vs promedio del grupo
  - Tabla de conceptos:
    ```
    Concepto                 | Intentos | Accuracy | Estado
    -------------------------+----------+----------+--------
    Suma de fracciones      | 5        | 60%      | 🟡 En proceso
    Simplificación          | 8        | 35%      | 🔴 Dificultad
    Fracciones equivalentes | 3        | 80%      | 🟢 Dominado
    ```
- **Sección 4: Actividad Reciente**
  - Última actividad: "Ejercicios de simplificación" - 4/10 correcto (hace 6 horas)
  - Patrón de error: "Olvida simplificar al máximo común divisor"
  - Tiempo de sesión: 45 minutos (indica esfuerzo, no falta de interés)
- **Sección 5: Recomendaciones de Intervención (generadas por IA)**
  - ✅ "Asignar mini-curso de repaso: 'Simplificación paso a paso' (15 min)"
  - ✅ "Agendar sesión de tutoría 1-a-1 para explicar MCD"
  - ✅ "Dado su perfil Auditivo-Social, recomendar trabajo con compañero"
  - ✅ "Enviar mensaje motivacional: 'Veo que estás esforzándote mucho. Las fracciones son complicadas. Podemos trabajarlas juntos.'"
- **Sección 6: Acciones Rápidas**
  - [Enviar mensaje personalizado] (pre-rellenado con template)
  - [Agendar tutoría] (integración con calendario)
  - [Asignar contenido de repaso] (selección de recursos)
  - [Contactar padre/tutor] (si menor de 16)
  - [Marcar alerta como gestionada]

### Escenario 4: Análisis Agregado del Grupo

**DADO** que quiero ver cómo va mi grupo en general  
**CUANDO** hago clic en tab "Análisis de Grupo"  
**ENTONCES**:

- **Sección 1: Estadísticas Generales**

  - Alumnos activos en última semana: 42/50 (84%)
  - Progreso promedio: 68% (+5% vs semana pasada ↑)
  - Accuracy promedio: 75%
  - Tiempo promedio en plataforma: 3.2h/semana

- **Sección 2: Distribución de Rendimiento**

  - Gráfico de barras:
    ```
    Alto rendimiento (>85%):  12 alumnos (24%)
    Rendimiento medio (65-85%): 28 alumnos (56%)
    Bajo rendimiento (<65%):  10 alumnos (20%)
    ```

- **Sección 3: Conceptos Problemáticos (Insights accionables)**

  - 🔴 "35% del grupo está atascado en Simplificación de fracciones"
    - Recomendación: "Considera clase grupal de repaso"
    - Botón: [Ver quiénes están atascados] → Lista de 17 alumnos
  - 🟡 "20% tiene dificultad con Ecuaciones cuadráticas"
  - 🟢 "85% domina Ecuaciones lineales"

- **Sección 4: Comparativa con Otros Grupos** (si aplica)

  - Tu grupo vs promedio institucional:
    - Progreso: 68% (tú) vs 65% (promedio) ✅
    - Retención: 95% (tú) vs 88% (promedio) ✅
    - Actividad semanal: 3.2h (tú) vs 2.8h (promedio) ✅

- **Sección 5: Tendencias Temporales**
  - Gráfico de línea (últimos 30 días):
    - Alumnos activos por día
    - Accuracy promedio por semana
    - Tiempo de uso por semana

### Escenario 5: Generación y Exportación de Reportes

**DADO** que necesito hacer reporte mensual para coordinación académica  
**CUANDO** hago clic en "Exportar Reporte"  
**ENTONCES**:

- Veo modal con opciones:

  - **Tipo de reporte**:
    - [ ] Resumen ejecutivo (1 página)
    - [x] Reporte completo (3-5 páginas)
    - [ ] Reporte individual por alumno
  - **Período**: [Último mes ▼]
  - **Formato**: [PDF ▼] [CSV] [Excel]
  - **Incluir**:
    - [x] Estadísticas generales
    - [x] Lista de alumnos destacados
    - [x] Lista de alumnos en riesgo
    - [x] Conceptos problemáticos
    - [ ] Gráficos detallados
  - Botón: [Generar reporte]

- Al hacer clic:
  - Veo progreso: "Generando reporte... 60%"
  - Descarga automática de PDF "Reporte_3A_Matematicas_Nov2025.pdf" con:
    - Portada con logo institucional
    - Resumen ejecutivo (1 párrafo)
    - Sección 1: Estadísticas generales con gráficos
    - Sección 2: Análisis de progreso (tabla con 50 alumnos)
    - Sección 3: Alumnos destacados (top 10 con notas)
    - Sección 4: Alumnos en riesgo (lista de 7 con alertas)
    - Sección 5: Recomendaciones generales
    - Firma digital y fecha de generación

### Escenario 6: Alertas Predictivas con Machine Learning

**DADO** que el sistema analiza patrones de actividad de alumno "Carlos Ruiz"  
**Y** detecta señales: inactividad 3 días, última accuracy 55%, tiempo en sesiones -40% vs su promedio  
**CUANDO** el modelo de ML ejecuta predicción  
**ENTONCES**:

- **Backend ejecuta**:

  ```python
  risk_signals = {
      "inactivity_days": 3,
      "last_accuracy": 0.55,
      "session_time_drop": 0.40,
      "failed_attempts": 4,
      "engagement_score": 0.45  # Calculado
  }

  # Modelo de Random Forest entrenado
  churn_probability = ml_model.predict(risk_signals)
  # Resultado: 0.68 (68% probabilidad de abandono en próximos 7 días)

  if churn_probability > 0.60:
      create_alert(
          user_id=carlos_ruiz,
          type="predictive_churn",
          severity="high",
          message="Riesgo de abandono: 68%",
          suggested_action="Contactar en próximas 24h"
      )
  ```

- **Resultado en Dashboard del Profesor**:

  - Nueva alerta 🔴: "Carlos Ruiz - Riesgo de abandono: 68%"
  - Detalles: "El modelo predice probabilidad de abandono en próximos 7 días"
  - Señales detectadas:
    - Inactividad: 3 días (último acceso: 2025-11-03)
    - Rendimiento en descenso: 55% accuracy (era 78%)
    - Engagement bajo: Sesiones más cortas (-40%)
  - **Acción sugerida**: "Contactar HOY por WhatsApp/email. Ofrecer apoyo."
  - Botones: [Contactar ahora] [Ver perfil completo]

- Notificación push al profesor: "1 nuevo alumno en riesgo alto: Carlos Ruiz"

### Escenario 7: Intervención Rápida desde Dashboard

**DADO** que veo alerta de "Pedro Martínez - Inactivo 7 días"  
**CUANDO** hago clic en botón "Enviar mensaje"  
**ENTONCES**:

- Se abre modal de mensaje con template pre-rellenado:

  ```
  Para: Pedro Martínez (pedro.martinez@estudiantes.edu)
  Asunto: Te extrañamos en clase de Matemáticas

  Hola Pedro,

  He notado que no has accedido a la plataforma en los últimos 7 días.
  ¿Todo bien? ¿Hay algo en lo que pueda ayudarte?

  Recuerda que estamos trabajando en Fracciones esta semana. Si tienes
  alguna dificultad, estoy aquí para apoyarte.

  Podemos agendar una sesión de tutoría si lo necesitas.

  ¡Espero saber de ti pronto!

  Prof. Juan Pérez
  ```

- Puedo editar el mensaje
- Opciones adicionales:
  - [x] Enviar copia a padre/tutor (si menor de 16)
  - [ ] Marcar como "Intervención realizada"
- Botón: [Enviar mensaje]
- Al enviar:
  - Confirmación: "Mensaje enviado a Pedro Martínez"
  - Alerta se actualiza: "Intervención realizada el 2025-11-06 por Prof. Juan Pérez"
  - Se crea registro en timeline del alumno

### Escenario 8: Notificaciones Proactivas para Profesor

**DADO** que el sistema detecta nuevas alertas mientras no estoy en el dashboard  
**CUANDO** son las 8:00 AM del lunes  
**ENTONCES**:

- Recibo email diario con resumen:

  ```
  Asunto: Dashboard Semanal - 3 nuevas alertas en 3°A Matemáticas

  Buenos días Prof. Juan,

  Resumen de tu grupo 3°A Matemáticas (50 alumnos):

  🔴 ALERTAS NUEVAS (3):
  - Pedro Martínez: Inactivo 7 días (Riesgo alto)
  - Ana López: Dificultad en Fracciones (8 fallos consecutivos)
  - Carlos Ruiz: Riesgo de abandono 68% (Predicción ML)

  📊 PROGRESO SEMANAL:
  - 42 alumnos activos (84%)
  - Progreso promedio: 68% (+5% vs semana pasada)
  - Concepto problemático: Simplificación de fracciones (35% del grupo)

  🎯 ACCIÓN RECOMENDADA:
  - Contactar a Pedro, Ana y Carlos HOY
  - Considerar clase grupal de repaso de Fracciones

  [Ver dashboard completo]
  ```

- Si tengo notificaciones push habilitadas:
  - Notificación en móvil: "3 alumnos necesitan atención urgente en 3°A"

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas

1. **Analytics y Procesamiento de Datos**

   - Data warehouse: PostgreSQL con agregaciones pre-calculadas
   - Cache: Redis para métricas en tiempo real
   - Cola de procesamiento: RabbitMQ para cálculos asíncronos

2. **Machine Learning**

   - Modelo predictivo de churn: Random Forest entrenado con ≥10K alumnos históricos
   - Features: inactividad, accuracy, engagement, tiempo de sesión
   - Re-entrenamiento mensual

3. **Visualizaciones**

   - Librería de gráficos: Chart.js o Recharts
   - Mapa de calor: Custom component con React
   - Exportación PDF: Puppeteer o jsPDF

4. **APIs Internas**
   - GET /api/v1/teachers/:teacherId/dashboard (métricas del grupo)
   - GET /api/v1/teachers/:teacherId/alerts (alertas activas)
   - GET /api/v1/students/:studentId/detailed-profile (perfil alumno)
   - POST /api/v1/teachers/export-report (generación de reportes)
   - POST /api/v1/teachers/send-message (enviar mensaje a alumno)

### Dependencias de Negocio

1. **Pre-requisitos**

   - Definición de umbrales de alerta (consenso con equipo pedagógico)
   - Protocolo de intervención para cada tipo de alerta
   - Política de privacidad para compartir datos de alumnos con profesores

2. **Procesos**
   - Workflow de gestión de alertas (quién, cuándo, cómo)
   - Proceso de seguimiento de intervenciones
   - Protocolo de escalación a coordinación/psicopedagogía

### Dependencias de Datos

1. **Fuentes de Datos**

   - Actividad de alumnos: completitud, accuracy, tiempo (HU-004, HU-005)
   - Perfiles de alumnos (HU-003)
   - Interacciones: mensajes, tutorías agendadas

2. **Transformaciones**
   - Cálculo de engagement score: f(actividad, tiempo, frecuencia)
   - Agregación de métricas por grupo: promedios, percentiles
   - Clasificación de alertas: urgente, atención, info

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Fatiga de Alertas (Alert Fatigue)

**Descripción**: Profesores reciben tantas alertas que las ignoran o se abruman  
**Probabilidad**: Alta | **Impacto**: Crítico  
**Mitigación**:

- **Priorización inteligente**: Solo alertas accionables (urgente, atención)
- **Agrupación**: "3 alumnos atascados en Fracciones" en vez de 3 alertas separadas
- **Límite diario**: Máximo 5 alertas urgentes por día, resto agrupadas en resumen semanal
- **Configuración personalizable**: Profesor puede ajustar sensibilidad
- **Snooze**: Opción de posponer alerta 24h si ya gestionada
- **Meta**: <10% de alertas ignoradas

### Riesgo 2: Falsos Positivos en Predicción de Riesgo (<70% Precisión)

**Descripción**: Modelo predice abandono pero alumno no está en riesgo real  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:

- **Validación histórica**: Testear modelo con datos históricos (precision ≥75%)
- **Múltiples señales**: No alertar por una sola métrica, combinar inactividad + rendimiento + engagement
- **Umbral conservador**: Solo alertar si probabilidad >60%
- **Feedback loop**: Registrar si alerta resultó en intervención efectiva → Reentrenar modelo
- **Transparencia**: Mostrar al profesor "Confianza: 68%" para que tome decisión informada
- **Meta**: >75% de alertas predictivas resultan en intervención necesaria

### Riesgo 3: Carga Cognitiva Excesiva en Dashboard

**Descripción**: Dashboard con demasiada información abruma al profesor  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:

- **Diseño minimalista**: Mostrar solo métricas clave en vista principal
- **Progressive disclosure**: Detalles disponibles en drill-down
- **Personalización**: Profesor puede ocultar secciones que no usa
- **Onboarding**: Tour guiado la primera vez
- **Versión móvil simplificada**: Solo alertas + acciones rápidas
- **Meta**: >85% profesores dicen "Es fácil de entender"

### Riesgo 4: Violación de Privacidad de Alumnos

**Descripción**: Dashboard expone información sensible sin controles adecuados  
**Probabilidad**: Baja | **Impacto**: Crítico  
**Mitigación**:

- **Acceso granular**: Profesor solo ve alumnos asignados a sus cursos
- **Logs de acceso**: Auditoría de quién accede a perfil de cada alumno
- **Consentimiento**: Alumnos/tutores aprueban compartir datos con profesores
- **Anonimización en reportes agregados**: No identificar alumnos específicos en comparativas institucionales
- **Capacitación**: Profesores firman compromiso de confidencialidad
- **Compliance**: FERPA/GDPR para datos educativos
- **Meta**: 0 incidentes de privacidad en primer año

### Riesgo 5: Dependencia Excesiva del Sistema, Menos Contacto Humano

**Descripción**: Profesores dependen solo de dashboard y no interactúan proactivamente con alumnos  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:

- **Enfoque augmentation, no replacement**: Dashboard complementa, no reemplaza, interacción
- **Recordatorios de contacto**: "Hace 2 semanas que no contactas a Pedro"
- **Métricas de interacción**: Trackear mensajes enviados, tutorías agendadas
- **Cultura institucional**: Capacitación sobre uso ético del dashboard
- **Incentivos**: Reconocer a profesores que usan dashboard Y mantienen alta interacción
- **Meta**: Incremento en contacto profesor-alumno (no disminución)

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (10 Story Points = ~80 horas)

1. **Backend - Data Pipeline y Agregaciones** (12h)

   - Queries optimizadas para métricas de grupo
   - Pre-cálculo de agregaciones (cron jobs)
   - Cache de métricas en Redis

2. **Backend - Motor de Alertas** (10h)

   - Lógica de generación de alertas (inactividad, bajo rendimiento, etc.)
   - Priorización y categorización
   - Sistema de notificaciones (email, push)

3. **Backend - Modelo ML Predictivo** (12h)

   - Obtención de dataset histórico (churn de alumnos)
   - Entrenamiento de Random Forest
   - Validación (precision, recall, F1)
   - Integración en pipeline de alertas

4. **Backend - APIs** (8h)

   - Endpoints de dashboard, alertas, perfiles
   - Generación de reportes PDF
   - Envío de mensajes a alumnos

5. **Frontend - Dashboard Principal** (12h)

   - Layout con cards de resumen
   - Mapa de calor de alumnos
   - Filtros y búsqueda

6. **Frontend - Panel de Alertas** (6h)

   - Lista priorizada de alertas
   - Acciones rápidas (contactar, agendar, asignar)

7. **Frontend - Perfil Detallado de Alumno** (8h)

   - Gráficos de desempeño
   - Recomendaciones de IA
   - Timeline de actividad

8. **Frontend - Análisis de Grupo y Reportes** (6h)

   - Estadísticas agregadas
   - Gráficos de distribución
   - Exportación de reportes

9. **Visualizaciones Interactivas** (4h)

   - Chart.js integration
   - Responsive design

10. **Testing** (6h)

    - Unit tests de modelo ML
    - Integration tests de flujos
    - Usability testing con 3 profesores

11. **Documentación** (2h)
    - Manual de uso del dashboard
    - Guía de interpretación de alertas

**Variación estimada**: ±25% (60-100 horas)

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**

  - ✅ Independent: Funciona después de HU-003, HU-004, HU-005
  - ✅ Negotiable: Umbrales de alerta configurables
  - ✅ Valuable: -60% tiempo de seguimiento, +40% detección temprana
  - ✅ Estimable: 10 SP = 80h
  - ✅ Small: Completable en 1 sprint (ajustado)
  - ✅ Testable: 8 escenarios con métricas

- [x] **Criterios de aceptación son testeables**

  - GIVEN/WHEN/THEN detallados
  - Métricas: <3 seg carga, ≥75% precisión ML, >90% adopción
  - Casos límite: múltiples alertas, falsos positivos, privacidad

- [x] **Dependencias están documentadas**

  - Técnicas: Analytics pipeline, ML model, Chart.js
  - Negocio: Umbrales de alerta, protocolo de intervención
  - Datos: Actividad de alumnos, perfiles

- [x] **Riesgos están identificados y mitigados**

  - 5 riesgos con mitigaciones específicas
  - Foco en alert fatigue, precisión ML, privacidad

- [x] **Estimación está dentro del rango esperado**

  - 10 SP por complejidad de analytics + ML

- [ ] **Stakeholders han validado la propuesta** (Pendiente: Profesores, Coordinadores)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas

- **Tiempo de carga del dashboard**: <3 segundos (p95)
- **Precisión de alertas predictivas**: ≥75%
- **Disponibilidad**: >99.5%
- **Latencia de actualización de datos**: <5 segundos

### Métricas de Negocio

- **Reducción de tiempo de seguimiento**: -60% (de 15h a 6h/semana por profesor)
- **Detección temprana de riesgo**: +40% de alumnos identificados 5+ días antes
- **Mejora en efectividad de intervenciones**: +45%
- **Reducción de deserción**: -30%
- **ROI**: $180K/año

### Métricas de Usuario (Profesores)

- **Adopción**: >90% usan dashboard semanalmente
- **Satisfacción**: >8/10 con herramienta
- **Utilidad percibida**: >85% dicen "Me ahorra tiempo significativo"
- **Facilidad de uso**: >85% dicen "Es fácil de entender"

### Métricas de Calidad

- **Alertas accionables**: >85% resultan en intervención efectiva
- **Falsos positivos**: <25%
- **Reportes de privacidad**: 0 incidentes en primer año

---

## 📝 NOTAS ADICIONALES

### Definición de Umbrales de Alerta (Consensuado con Equipo Pedagógico)

| Tipo de Alerta          | Criterio                        | Severidad   | Acción Sugerida        |
| ----------------------- | ------------------------------- | ----------- | ---------------------- |
| Inactividad prolongada  | ≥5 días sin acceso              | 🔴 Urgente  | Contactar en 24h       |
| Bajo rendimiento        | Accuracy <60% en 5+ actividades | 🔴 Urgente  | Asignar tutoría        |
| Dificultad recurrente   | Fallar mismo concepto 3+ veces  | 🟡 Atención | Asignar repaso         |
| Regresión               | Accuracy baja ≥15% en 1 semana  | 🟡 Atención | Revisar causas         |
| Riesgo de abandono (ML) | Probabilidad >60%               | 🔴 Urgente  | Intervención inmediata |
| Progreso lento          | <30% completitud en 2 semanas   | 🟡 Atención | Ajustar nivel          |

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha      | Versión | Cambios          | Autor   |
| ---------- | ------- | ---------------- | ------- |
| 2025-11-06 | 1.0     | Creación inicial | BA Team |

---

**Estado**: ✅ READY FOR PROFESSOR REVIEW  
**Aprobado por**: [Pendiente: Profesores, Coordinadores Académicos]  
**Fecha de aprobación**: [Pendiente]
