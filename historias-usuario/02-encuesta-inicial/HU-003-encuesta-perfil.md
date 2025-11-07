# HU-003: Encuesta Inicial de Evaluación de Perfil del Alumno

## 📋 METADATOS
- **ID**: HU-003
- **Épica**: Personalización y Adaptación
- **Prioridad**: CRÍTICA
- **Estimación**: 8 Story Points
- **Sprint**: 2
- **Stakeholders**: Alumnos, Profesores, Psicopedagogos, Director Académico
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario
**¿Quién?** Alumno nuevo de primaria (8-12 años) realizando primera evaluación  
**¿Qué?** Encuesta diagnóstica gamificada de 15-20 preguntas en 10-15 minutos  
**¿Por qué?** Para identificar su perfil de aprendizaje, conocimientos previos y áreas de mejora, permitiendo adaptación del contenido

**Ambigüedades detectadas**:
- ¿La encuesta es obligatoria o opcional?
- ¿Se puede pausar y retomar en otro momento?
- ¿Qué dimensiones evalúa (cognitivo, emocional, estilos de aprendizaje)?
- ¿Los resultados son visibles para el alumno inmediatamente?

### Perspectiva Técnica
**Implementable**: ✅ Sí con IA  
**Restricciones**:
- Algoritmo de machine learning para clasificación de perfiles (Random Forest/Neural Network)
- Base de datos de preguntas categorizadas por dimensión
- Adaptive testing: siguientes preguntas dependen de respuestas previas
- Almacenamiento de respuestas para análisis longitudinal

### Perspectiva de Negocio
**Valor medible**:
- Incremento 45% en engagement por contenido personalizado
- Reducción 35% en frustración de alumnos con contenido inadecuado
- Mejora 30% en rendimiento académico en primeros 3 meses
- 100% de alumnos perfilados en primera semana

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** alumno nuevo en la plataforma  
**Quiero** completar una encuesta interactiva y visualmente atractiva de 15 preguntas  
**Para** que el sistema conozca cómo aprendo mejor y me recomiende contenido adecuado a mi nivel

#### Criterios de Aceptación UX:
1. **DADO** que soy alumno nuevo verificado  
   **CUANDO** inicio sesión por primera vez  
   **ENTONCES** veo modal de bienvenida: "Ayúdanos a conocerte mejor" con preview de encuesta

2. **DADO** que estoy en la encuesta  
   **CUANDO** respondo cada pregunta  
   **ENTONCES** veo barra de progreso, animaciones de transición suaves y feedback positivo ("¡Bien hecho!")

3. **DADO** que completo la encuesta  
   **CUANDO** envío la última respuesta  
   **ENTONCES** veo resultados visuales: gráfico de radar con 5 dimensiones + recomendaciones personalizadas

4. **DADO** que quiero pausar  
   **CUANDO** cierro la encuesta a mitad  
   **ENTONCES** se guarda mi progreso y puedo retomar desde donde lo dejé

5. **DADO** que uso móvil  
   **CUANDO** accedo a la encuesta  
   **ENTONCES** las preguntas se muestran de una en una, con swipe para avanzar

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** motor de adaptación inteligente  
**Quiero** aplicar Computerized Adaptive Testing (CAT) basado en Item Response Theory  
**Para** determinar el perfil del alumno con precisión ≥85% usando mínimo número de preguntas (10-12)

#### Criterios de Aceptación Técnicos:
1. **DADO** que se implementa CAT  
   **CUANDO** el alumno responde pregunta N  
   **ENTONCES** el algoritmo selecciona pregunta N+1 con máxima información basada en respuestas previas

2. **DADO** que se calculan resultados  
   **CUANDO** se procesan las respuestas  
   **ENTONCES** se ejecuta modelo ML (Random Forest preentrenado) con inferencia <500ms

3. **DADO** que se almacenan datos  
   **CUANDO** se completa encuesta  
   **ENTONCES** se guardan: respuestas raw, scores por dimensión, perfil asignado, timestamp, tiempo por pregunta

4. **DADO** que se valida calidad  
   **CUANDO** se detectan patrones sospechosos (todas las respuestas iguales, tiempo <30 segundos total)  
   **ENTONCES** se marca para revisión manual y se solicita re-tomar

5. **DADO** que se requiere escalabilidad  
   **CUANDO** 100 alumnos hacen encuesta simultáneamente  
   **ENTONCES** el sistema mantiene latencia <1 segundo por pregunta sin degradación

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** director académico  
**Quiero** una evaluación inicial que identifique brechas de conocimiento y estilos de aprendizaje  
**Para** personalizar rutas educativas, mejorar resultados en 30% y reducir deserción en 25%

#### Criterios de Aceptación de Negocio:
1. **DADO** que se evalúan dimensiones múltiples  
   **CUANDO** se diseña la encuesta  
   **ENTONCES** se incluyen 5 dimensiones: conocimientos previos, estilo de aprendizaje, motivación, habilidades metacognitivas, inteligencias múltiples

2. **DADO** que se generan insights accionables  
   **CUANDO** el alumno completa la encuesta  
   **ENTONCES** el profesor recibe reporte con: perfil del alumno, áreas fuertes/débiles, recomendaciones pedagógicas específicas

3. **DADO** que se mide efectividad  
   **CUANDO** pasan 3 meses de uso  
   **ENTONCES** se comparan resultados académicos de alumnos perfilados vs no perfilados (A/B testing)

4. **DADO** que se busca adopción masiva  
   **CUANDO** se lanza la funcionalidad  
   **ENTONCES** ≥90% de alumnos completan encuesta en primera semana (con gamificación: badges, leaderboard opcional)

5. **DADO** que se valida científicamente  
   **CUANDO** se diseñan preguntas  
   **ENTONCES** se basan en marcos validados: VARK (visual/auditivo/kinestésico), Kolb, Howard Gardner

**KPIs**:
- Tasa de completitud: >90% en 7 días
- Precisión del perfilado: >85% (validado con evaluaciones posteriores)
- Mejora en rendimiento: +30% en notas promedio en 3 meses
- Satisfacción del alumno con recomendaciones: >8/10

---

## 🎯 VERSIÓN FINAL SINTETIZADA

**Matriz de Decisión**:
- Valor de negocio (30%): Versión C = 9/10
- Factibilidad técnica (25%): Versión B = 7/10 (CAT complejo)
- Experiencia de usuario (25%): Versión A = 9/10
- Esfuerzo de implementación (20%): Versión A = 7/10
**Puntuación final**: 8.2/10

---

## 📝 HISTORIA REFINADA FINAL

**Como** alumno nuevo en la plataforma educativa (primaria, 8-12 años, primer ingreso post-registro)  
**Quiero** completar una encuesta interactiva y gamificada de 15-18 preguntas adaptativas en 10-12 minutos  
**Para** que el sistema identifique mi perfil de aprendizaje multidimensional (conocimientos, estilo, motivación) y personalice el contenido, mejorando mi rendimiento en 30% en los primeros 3 meses

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Inicio de Encuesta en Primer Login
**DADO** que soy un alumno nuevo que acaba de verificar mi email  
**Y** inicio sesión por primera vez en la plataforma desde desktop  
**CUANDO** accedo al dashboard  
**ENTONCES**:
- Veo modal de bienvenida con título: "¡Hola [Nombre]! Conozcámonos mejor 🚀"
- Se muestra preview: "15 preguntas divertidas • 10-12 minutos • Ayúdanos a personalizar tu experiencia"
- Botones: [Empezar ahora] [Hacerlo más tarde]
- Si hago clic en "Más tarde" → Modal se cierra, aparece recordatorio en banner superior
- Si hago clic en "Empezar ahora" → Carga primera pregunta con transición animada

### Escenario 2: Flujo de Preguntas Adaptativas con Feedback Visual
**DADO** que estoy en la encuesta (pregunta 3 de 15)  
**CUANDO** leo la pregunta: "¿Cómo prefieres aprender matemáticas?"  
**Y** veo 4 opciones:
- A) Viendo videos explicativos 🎥
- B) Resolviendo ejercicios prácticos ✏️
- C) Escuchando explicaciones del profesor 🎧
- D) Trabajando en grupo con compañeros 👥  
**Y** selecciono opción B  
**ENTONCES**:
- Opción B se resalta con animación de check verde
- Aparece mensaje motivacional aleatorio: "¡Genial! A ti te gusta la práctica" (2 segundos)
- Barra de progreso avanza de 13% a 20% con animación fluida
- Siguiente pregunta carga automáticamente en 1.5 segundos
- Se registra: pregunta_id, respuesta, timestamp, tiempo_respuesta (para análisis)

### Escenario 3: Pregunta Adaptativa Basada en Respuesta Previa
**DADO** que respondí "Nivel intermedio" en pregunta sobre álgebra  
**CUANDO** el sistema selecciona la siguiente pregunta  
**ENTONCES**:
- Si respondí "bajo" en álgebra → Siguiente pregunta es de nivel básico en geometría
- Si respondí "alto" en álgebra → Siguiente pregunta es de nivel avanzado o tema diferente
- La adaptación se hace usando algoritmo basado en:
  ```
  Peso de respuesta actual + historial de 3 preguntas previas
  → Selección de pregunta con dificultad ajustada ±1 nivel
  ```
- La pregunta se obtiene de banco de 200 preguntas categorizadas por:
  - Dimensión (conocimiento, estilo, motivación, metacognición, inteligencias)
  - Materia (matemáticas, lengua, ciencias, sociales)
  - Dificultad (1-5)

### Escenario 4: Pausa y Retoma de Encuesta
**DADO** que estoy en pregunta 7 de 15  
**CUANDO** cierro la ventana/tab o hago clic en "Guardar y continuar después"  
**ENTONCES**:
- Se guarda progreso en DB: `survey_progress` con user_id, respuestas hasta ahora, última pregunta
- Al volver a iniciar sesión → Veo banner: "Tienes una encuesta pendiente (7/15 completadas) [Continuar]"
- Si hago clic en Continuar → Retomo desde pregunta 8
- Progreso se mantiene por 7 días, después se expira y debo re-iniciar

### Escenario 5: Finalización y Generación de Perfil con IA
**DADO** que completo la pregunta 15 (última)  
**CUANDO** presiono "Enviar respuestas"  
**ENTONCES**:
- Veo pantalla de carga: "Analizando tus respuestas... 🧠" con animación (duración real: 1-2 segundos)
- Backend ejecuta:
  1. Validación de respuestas completas
  2. Cálculo de scores por dimensión usando modelo ML (Random Forest)
  3. Asignación de perfil principal: "Aprendiz Visual-Kinestésico" (1 de 8 perfiles posibles)
  4. Generación de sub-perfiles: nivel conocimientos, motivación, metacognición
- Se genera registro en tabla `student_profiles`:
  ```json
  {
    "user_id": 12345,
    "profile_type": "visual_kinesthetic",
    "dimensions": {
      "learning_style": {"visual": 0.75, "auditory": 0.30, "kinesthetic": 0.65},
      "knowledge_level": {"math": 7.5, "language": 8.0, "science": 6.5},
      "motivation": 0.82,
      "metacognition": 0.68,
      "intelligences": {"logical": 0.70, "spatial": 0.85, "interpersonal": 0.60}
    },
    "confidence_score": 0.87,
    "completed_at": "2025-11-06T10:30:00Z"
  }
  ```

### Escenario 6: Visualización de Resultados Personalizados
**DADO** que el perfil ha sido generado exitosamente  
**CUANDO** veo la pantalla de resultados  
**ENTONCES**:
- Título: "¡Listo! Conoce tu perfil de aprendizaje 🎯"
- **Sección 1: Perfil Principal**
  - Badge visual: "Aprendiz Visual-Kinestéstico" con ícono
  - Descripción: "Aprendes mejor viendo ejemplos y haciendo ejercicios prácticos"
- **Sección 2: Gráfico de Radar Interactivo**
  - 5 ejes: Visual, Auditivo, Kinestésico, Lógico-Matemático, Social
  - Valores en escala 0-10
  - Al hacer hover en cada eje → Tooltip con explicación
- **Sección 3: Fortalezas y Áreas de Mejora**
  - ✅ Fortalezas: "Excelente en geometría, alta motivación"
  - 🎯 Áreas de mejora: "Refuerza álgebra, desarrolla habilidades de lectura comprensiva"
- **Sección 4: Recomendaciones Personalizadas**
  - "Te recomendamos empezar con el módulo: 'Introducción a Ecuaciones' (nivel intermedio)"
  - "Prueba ejercicios interactivos y videos cortos"
- **Sección 5: Próximos Pasos**
  - Botón primario: [Ir a mi ruta de aprendizaje personalizada]
  - Botón secundario: [Ver recomendaciones de profesores]
- **Sección 6: Opciones**
  - [Compartir resultados con mi profesor]
  - [Descargar informe PDF]
  - [Retomar encuesta en el futuro] (opcional cada 3 meses para re-perfilar)

### Escenario 7: Casos Límite - Respuestas Inconsistentes o Sospechosas
**DADO** que el sistema detecta patrón sospechoso en respuestas  
**CUANDO** analiza que:
- Todas las respuestas son la opción "A" (no variación)
- Tiempo total <2 minutos (promedio esperado: 10-12 min)
- Respuestas contradictorias: dice "nivel bajo" pero luego resuelve correctamente problemas avanzados  
**ENTONCES**:
- Se marca el perfil con flag: `needs_review = true`
- Se asigna perfil provisional "Sin definir"
- Alumno ve mensaje: "Tus respuestas parecen apresuradas. Para una mejor experiencia, te recomendamos retomar la encuesta con más calma"
- Botón: [Retomar encuesta ahora] [Continuar sin perfilar]
- Si continúa sin perfilar → Accede a contenido genérico (sin personalización)
- Notificación a profesor: "Alumno [Nombre] no completó evaluación inicial correctamente"

### Escenario 8: Validación de Perfil con Primera Actividad
**DADO** que el alumno completó la encuesta y recibió perfil: "Visual-Kinestésico, nivel intermedio en matemáticas"  
**CUANDO** realiza su primera actividad recomendada: "Ejercicio de ecuaciones lineales"  
**Y** obtiene resultado: 9/10 correcto en 15 minutos  
**ENTONCES**:
- El sistema valida que el perfil es coherente (alta precisión)
- Se actualiza campo: `profile_validation_score = 0.90`
- Si el resultado fuera muy bajo (3/10):
  - Se activa re-perfilado automático
  - Se ajusta nivel a "básico"
  - Notificación a alumno: "Ajustamos tu nivel para que sea más cómodo"

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas
1. **Machine Learning Infrastructure**
   - Modelo de clasificación de perfiles (Random Forest o Red Neuronal)
   - Framework: Scikit-learn o TensorFlow Lite
   - Dataset de entrenamiento: ≥5000 evaluaciones históricas validadas
   - Servidor de inferencia: Python + FastAPI o TensorFlow Serving

2. **Base de Datos**
   - Tabla `survey_questions` con 200+ preguntas categorizadas
   - Tabla `student_profiles` con estructura JSON para dimensiones
   - Tabla `survey_responses` para auditoría y análisis longitudinal
   - Índices en: user_id, completed_at, profile_type

3. **Servicios de Terceros**
   - Librería de visualización: Chart.js o D3.js para gráfico de radar
   - PDF generation: jsPDF o Puppeteer para informes descargables

4. **APIs Internas**
   - GET /api/v1/surveys/initial (obtiene encuesta adaptativa)
   - POST /api/v1/surveys/initial/responses (guarda respuesta)
   - POST /api/v1/surveys/initial/complete (finaliza y genera perfil)
   - GET /api/v1/profiles/:userId (obtiene perfil del alumno)

### Dependencias de Negocio
1. **Pre-requisitos**
   - Validación científica de preguntas por psicopedagogos
   - Marco teórico aprobado: VARK, Kolb, Gardner
   - Consentimiento de uso de datos para ML (GDPR/FERPA)

2. **Procesos**
   - Protocolo de actualización de banco de preguntas (trimestral)
   - Proceso de re-entrenamiento de modelo ML con nuevos datos (semestral)
   - Workflow de revisión manual para perfiles marcados como sospechosos

### Dependencias de Datos
1. **Fuentes de Datos**
   - Evaluaciones diagnósticas históricas del SIS (si disponibles)
   - Resultados académicos previos de alumnos (para entrenamiento de ML)
   - Taxonomía de estilos de aprendizaje (base de conocimiento)

2. **Transformaciones**
   - Normalización de respuestas a escala 0-1
   - Mapping de respuestas a vectores de características para ML
   - Agregación de scores por dimensión con pesos configurables

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Baja Tasa de Completitud de Encuesta
**Descripción**: Alumnos abandonan encuesta por aburrimiento o longitud percibida  
**Probabilidad**: Alta | **Impacto**: Crítico  
**Mitigación**:
- **Gamificación**: Badges "Explorador", "Conocedor", animaciones, mensajes motivacionales
- **Progreso visible**: Barra con % y "Solo faltan 5 preguntas"
- **Tiempo estimado**: "Quedan ~5 minutos" actualizado dinámicamente
- **Incentivos**: Desbloquear contenido premium tras completar
- **A/B Testing**: Probar 15 vs 20 preguntas para encontrar óptimo
- **Meta**: >90% completitud en 7 días

### Riesgo 2: Modelo de ML con Baja Precisión (<80%)
**Descripción**: Perfiles asignados no reflejan realmente el estilo de aprendizaje del alumno  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:
- **Validación cruzada**: K-fold validation (k=5) en dataset de entrenamiento
- **Métricas de calidad**: Precision, Recall, F1-score por clase de perfil
- **Re-entrenamiento periódico**: Cada 6 meses con nuevos datos validados
- **Validación en producción**: Comparar rendimiento académico post-perfilado
- **Feedback loop**: Permitir a alumnos/profesores reportar "Este perfil no me representa"
- **Fallback**: Si confianza <0.7 → Perfil "mixto" o re-evaluación
- **Meta**: Precisión ≥85% en ambiente de producción

### Riesgo 3: Sesgo en Preguntas o Algoritmo de ML
**Descripción**: Preguntas culturalmente sesgadas o algoritmo que favorece ciertos perfiles  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:
- **Revisión por comité diverso**: Psicopedagogos de diferentes contextos culturales
- **Análisis de fairness**: Verificar que distribución de perfiles no está desbalanceada por género, edad, región
- **Preguntas neutras**: Evitar referencias culturales específicas
- **Audit trail**: Documentar decisiones de diseño y categorizaciones
- **Revisión semestral**: Análisis de sesgo con métricas de equidad (demographic parity, equal opportunity)
- **Meta**: Distribución equilibrada de perfiles (ninguno >30% del total)

### Riesgo 4: Fricción por Encuesta Obligatoria en Onboarding
**Descripción**: Alumnos frustrados por "tener que" completar encuesta antes de acceder a contenido  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:
- **Opción "Más tarde"**: Permitir acceso al dashboard con funcionalidad limitada
- **Recordatorios progresivos**: Banner → Email día 3 → Notificación día 7
- **Explicación de valor**: "Esto nos ayuda a recomendarte lo mejor para ti"
- **Tiempo límite flexible**: No obligar, pero incentivar completar en 7 días
- **Testimonios**: "El 95% de alumnos dicen que las recomendaciones les ayudaron"
- **Meta**: <10% de alumnos que nunca completan la encuesta

### Riesgo 5: Privacidad y Uso Ético de Datos Sensibles
**Descripción**: Datos de perfiles de aprendizaje usados de forma no ética o compartidos sin consentimiento  
**Probabilidad**: Baja | **Impacto**: Crítico  
**Mitigación**:
- **Consentimiento explícito**: Alumno/tutor aprueba uso de datos para personalización
- **Anonimización**: Datos agregados para análisis estadístico sin identificar individuos
- **Control del usuario**: Opciones en configuración: "No compartir mi perfil con profesores"
- **Cifrado**: Datos de perfil encriptados en DB (AES-256)
- **Auditorías de seguridad**: Pentest trimestral
- **Política de retención**: Eliminar datos de perfiles de alumnos inactivos >2 años
- **Compliance**: GDPR Art. 22 (decisiones automatizadas), FERPA (datos educativos)

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (8 Story Points = ~64 horas)

1. **Diseño de Encuesta y Preguntas** (8h)
   - Creación de 200 preguntas categorizadas (con psicopedagogos)
   - Diseño de banco de preguntas en DB
   - Validación científica de marco teórico

2. **Backend - Lógica de Encuesta Adaptativa** (10h)
   - Algoritmo de selección de siguiente pregunta
   - Gestión de progreso y guardado parcial
   - Validación de respuestas

3. **Backend - Modelo de ML para Perfilado** (12h)
   - Obtención y limpieza de dataset de entrenamiento
   - Entrenamiento de modelo (Random Forest)
   - Evaluación y tuning de hiperparámetros
   - Exportación de modelo y setup de inferencia

4. **Backend - Endpoints de API** (5h)
   - GET/POST para encuesta
   - POST para completar y generar perfil
   - GET para obtener perfil

5. **Frontend - UI de Encuesta** (10h)
   - Interfaz responsive con animaciones
   - Barra de progreso
   - Manejo de estados: loading, error, success
   - Guardado automático de progreso

6. **Frontend - Visualización de Resultados** (8h)
   - Gráfico de radar interactivo
   - Dashboard de perfil
   - Descarga de PDF

7. **Gamificación y UX** (4h)
   - Animaciones y feedback visual
   - Mensajes motivacionales
   - Sistema de badges

8. **Testing** (5h)
   - Unit tests (backend + ML model)
   - Integration tests de flujo completo
   - Validación de precisión del modelo

9. **Documentación** (2h)
   - API docs
   - Guía de interpretación de perfiles para profesores
   - Manual de mantenimiento del banco de preguntas

**Variación estimada**: ±25% (48-80 horas) debido a complejidad de ML

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**
  - ✅ Independent: Funciona después de HU-002 (registro)
  - ✅ Negotiable: Número de preguntas y dimensiones ajustables
  - ✅ Valuable: +30% rendimiento, +45% engagement
  - ✅ Estimable: 8 SP = 64h con breakdown detallado
  - ✅ Small: Completable en 1 sprint (con equipo ML)
  - ✅ Testable: 8 escenarios con métricas específicas

- [x] **Criterios de aceptación son testeables**
  - GIVEN/WHEN/THEN en todos los escenarios
  - Métricas: 10-12 min, >90% completitud, ≥85% precisión
  - Casos límite: respuestas sospechosas, pausas, validación

- [x] **Dependencias están documentadas**
  - Técnicas: ML framework, Chart.js, FastAPI
  - Negocio: Validación psicopedagógica, consentimientos
  - Datos: Dataset de entrenamiento, taxonomías

- [x] **Riesgos están identificados y mitigados**
  - 5 riesgos con mitigaciones específicas
  - Foco en sesgo, precisión, privacidad

- [x] **Estimación está dentro del rango esperado**
  - 8 SP = 64h ±25% (por complejidad ML)

- [ ] **Stakeholders han validado la propuesta** (Pendiente: Psicopedagogos, Director Académico)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas
- **Tiempo promedio de encuesta**: 10-12 minutos (p50)
- **Latencia de generación de perfil**: <2 segundos
- **Precisión del modelo**: ≥85% (validado con evaluaciones posteriores)
- **Disponibilidad**: >99.5% uptime

### Métricas de Negocio
- **Tasa de completitud**: >90% en 7 días
- **Mejora en rendimiento académico**: +30% en 3 meses (vs grupo control)
- **Incremento en engagement**: +45% en tiempo en plataforma
- **Reducción en deserción**: -25% en primer semestre

### Métricas de Usuario
- **NPS de encuesta**: >7/10
- **Satisfacción con recomendaciones**: >8/10 ("Las recomendaciones me ayudaron")
- **Alumnos que re-toman encuesta voluntariamente**: >30% a los 6 meses

### Métricas de Calidad de Datos
- **Perfiles validados con alta confianza (>0.8)**: >75%
- **Perfiles marcados para revisión**: <10%
- **Distribución equilibrada de perfiles**: Ninguno >30% del total

---

## 📝 NOTAS ADICIONALES

### Marco Teórico de Perfiles
**8 Perfiles Principales** (basados en combinación de VARK + Gardner):
1. **Visual-Lógico**: Aprende con diagramas, esquemas, análisis
2. **Visual-Kinestésico**: Prefiere videos, práctica hands-on
3. **Auditivo-Social**: Aprende escuchando y en grupo
4. **Auditivo-Intrapersonal**: Prefiere explicaciones verbales, reflexión individual
5. **Kinestésico-Lógico**: Aprende haciendo, experimentando, resolviendo problemas
6. **Kinestésico-Social**: Prefiere proyectos grupales, role-playing
7. **Lecto-escritor-Lógico**: Aprende leyendo, tomando notas estructuradas
8. **Mixto/Multimodal**: Sin preferencia dominante clara

### Dimensiones Evaluadas
1. **Estilos de Aprendizaje (VARK)**: Visual, Auditivo, Kinestésico, Lecto-escritor
2. **Conocimientos Previos**: Nivel por materia (matemáticas, lengua, ciencias)
3. **Motivación**: Intrínseca/extrínseca, orientación a metas
4. **Metacognición**: Planificación, monitoreo, autoevaluación
5. **Inteligencias Múltiples (Gardner)**: Lógico-matemática, lingüística, espacial, interpersonal, intrapersonal

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha | Versión | Cambios | Autor |
|-------|---------|---------|-------|
| 2025-11-06 | 1.0 | Creación inicial | BA Team |

---

**Estado**: ✅ READY FOR PSYCHOPEDAGOGICAL REVIEW  
**Aprobado por**: [Pendiente]  
**Fecha de aprobación**: [Pendiente]
