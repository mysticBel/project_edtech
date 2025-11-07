# HU-004: Generación de Ruta de Aprendizaje Adaptativa con IA

## 📋 METADATOS

- **ID**: HU-004
- **Épica**: Reforzamiento Adaptativo con IA
- **Prioridad**: CRÍTICA
- **Estimación**: 13 Story Points
- **Sprint**: 3-4
- **Stakeholders**: Alumnos, Profesores, Data Scientists, Director Académico
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario

**¿Quién?** Alumno con perfil definido (post-encuesta inicial)  
**¿Qué?** Sistema que recomienda actividades, ejercicios y contenidos personalizados que se adaptan en tiempo real a su progreso  
**¿Por qué?** Para aprender a su ritmo óptimo, reforzar áreas débiles y avanzar sin frustrarse, mejorando retención del conocimiento en 40%

**Ambigüedades detectadas**:

- ¿Cómo se determina la dificultad de cada actividad?
- ¿Qué pasa si el alumno falla repetidamente?
- ¿Se puede saltar actividades o seguir un camino diferente?
- ¿Cómo se balancea refuerzo de debilidades vs exploración de fortalezas?

### Perspectiva Técnica

**Implementable**: ✅ Sí con IA avanzada  
**Restricciones**:

- Algoritmo de recomendación basado en Reinforcement Learning (RL) o Knowledge Tracing
- Motor de reglas + ML híbrido para escalabilidad
- Sistema de pre-requisitos y grafos de conocimiento
- Procesamiento en tiempo real con latencia <1 segundo

### Perspectiva de Negocio

**Valor medible**:

- Incremento 40% en retención de conocimiento (medido en evaluaciones)
- Reducción 50% en tiempo para alcanzar objetivos de aprendizaje
- Incremento 60% en satisfacción del alumno (vs contenido estático)
- Reducción 30% en tasa de abandono

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** alumno con mi perfil de aprendizaje definido  
**Quiero** ver una ruta de aprendizaje visual con actividades recomendadas que se adaptan automáticamente a mis logros  
**Para** saber exactamente qué estudiar a continuación, sentirme motivado con mi progreso y no frustrarme con contenido demasiado difícil o fácil

#### Criterios de Aceptación UX:

1. **DADO** que accedo a "Mi Ruta de Aprendizaje"  
   **CUANDO** veo el dashboard  
   **ENTONCES** veo un mapa interactivo con nodos (actividades) conectados, código de colores: verde (completado), amarillo (en progreso), gris (bloqueado), azul (disponible)

2. **DADO** que completo una actividad con ≥80% de aciertos  
   **CUANDO** finalizo  
   **ENTONCES** veo celebración animada ("¡Excelente!"), el nodo se marca verde y se desbloquean 2-3 actividades nuevas con transición visual

3. **DADO** que fallo una actividad con <60% de aciertos  
   **CUANDO** termino  
   **ENTONCES** veo mensaje motivacional ("¡Buen intento! Vamos a reforzar esto") y se recomienda contenido de repaso antes de reintentar

4. **DADO** que quiero cambiar de tema  
   **CUANDO** hago clic en "Explorar otros temas"  
   **ENTONCES** veo rutas alternativas sugeridas según mis intereses y fortalezas

5. **DADO** que estoy atascado  
   **CUANDO** paso >5 días sin completar actividades  
   **ENTONCES** recibo notificación con actividad más fácil o recurso de ayuda (video, tutor virtual)

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** motor de adaptación inteligente  
**Quiero** implementar algoritmo de Knowledge Tracing (Deep Knowledge Tracing - DKT) para predecir probabilidad de éxito y seleccionar actividad óptima  
**Para** maximizar aprendizaje con mínimo número de ejercicios (eficiencia de 35% vs rutas estáticas)

#### Criterios de Aceptación Técnicos:

1. **DADO** que se implementa DKT con LSTM  
   **CUANDO** el alumno completa ejercicio N  
   **ENTONCES** el modelo predice P(éxito) para cada concepto con precisión ≥75%

2. **DADO** que se selecciona siguiente actividad  
   **CUANDO** se ejecuta algoritmo de recomendación  
   **ENTONCES** se elige actividad que maximiza Expected Learning Gain (ELG) con cálculo <500ms

3. **DADO** que se construye grafo de conocimiento  
   **CUANDO** se mapean conceptos y pre-requisitos  
   **ENTONCES** se modela como DAG (Directed Acyclic Graph) con 500+ nodos de conceptos y 2000+ relaciones

4. **DADO** que se detecta mastery de concepto  
   **CUANDO** alumno logra ≥3 ejercicios consecutivos con ≥85% acierto  
   **ENTONCES** se marca concepto como dominado (mastery=true) y se avanza a siguiente nivel

5. **DADO** que se escala a 10,000 alumnos  
   **CUANDO** todos acceden simultáneamente  
   **ENTONCES** inferencia de ML se ejecuta en <1 segundo usando cache y batch processing

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** institución educativa  
**Quiero** un sistema de rutas adaptativas que acelere el aprendizaje 40% y reduzca costos de tutorías en 50%  
**Para** ofrecer educación personalizada escalable y demostrar resultados medibles a stakeholders

#### Criterios de Aceptación de Negocio:

1. **DADO** que se miden resultados de aprendizaje  
   **CUANDO** se comparan alumnos con ruta adaptativa vs estática (A/B test)  
   **ENTONCES** grupo adaptativo logra +40% retención, +50% velocidad, +60% satisfacción

2. **DADO** que se busca escalabilidad  
   **CUANDO** crece la base de alumnos  
   **ENTONCES** el sistema mantiene personalización sin contratar más tutores (ROI: $200K ahorro anual en tutorías)

3. **DADO** que se valida efectividad pedagógica  
   **CUANDO** pasan 6 meses de uso  
   **ENTONCES** se publica informe con métricas: tiempo promedio a dominio, curva de aprendizaje, distribución de dificultades

4. **DADO** que se necesitan insights para profesores  
   **CUANDO** un alumno progresa en su ruta  
   **ENTONCES** profesor recibe alertas automáticas: "María está atascada en ecuaciones cuadráticas desde hace 3 días" con sugerencias

5. **DADO** que se busca diferenciación competitiva  
   **CUANDO** se marketing la plataforma  
   **ENTONCES** se usa "IA que personaliza el aprendizaje" como USP principal

**KPIs**:

- Tiempo a dominio: -50% vs método tradicional
- Retención de conocimiento: +40% (medido en evaluaciones 30 días después)
- Satisfacción del alumno: >8.5/10
- Ahorro en costos de tutoría: $200K/año

---

## 🎯 VERSIÓN FINAL SINTETIZADA

**Matriz de Decisión**:

- Valor de negocio (30%): Versión C = 10/10
- Factibilidad técnica (25%): Versión B = 7/10 (DKT complejo)
- Experiencia de usuario (25%): Versión A = 9/10
- Esfuerzo de implementación (20%): Híbrido Reglas+ML = 6/10
  **Puntuación final**: 8.3/10

**Decisión**: Implementar **sistema híbrido** (Reglas + ML) para MVP, evolucionar a DKT en Fase 2

---

## 📝 HISTORIA REFINADA FINAL

**Como** alumno con perfil de aprendizaje Visual-Kinestésico nivel intermedio en matemáticas  
**Quiero** acceder a una ruta de aprendizaje personalizada que me recomiende ejercicios, videos y actividades que se adapten automáticamente según mis aciertos/fallos en tiempo real  
**Para** dominar los conceptos de álgebra en 50% menos tiempo que con método tradicional, con retención 40% superior y satisfacción >8.5/10

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Visualización Inicial de Ruta Personalizada

**DADO** que soy alumno "María" con perfil:

- Estilo: Visual-Kinestésico
- Nivel Matemáticas: 7/10
- Nivel Álgebra: 6/10 (área de mejora identificada)
- Fortaleza: Geometría 8.5/10  
  **Y** he completado la encuesta inicial (HU-003)  
  **CUANDO** accedo por primera vez a "Mi Ruta de Aprendizaje"  
  **ENTONCES**:
- Veo título: "Tu ruta personalizada en Álgebra 🎯"
- Visualización: Mapa de nodos interactivo con 3 niveles visibles
- **Nivel 1 (Disponibles ahora)**:
  - 🎥 Video: "Introducción a ecuaciones lineales" (5 min)
  - ✏️ Ejercicios: "Resuelve ecuaciones simples" (10 ejercicios, dificultad 3/10)
  - 🎮 Actividad interactiva: "Balancea la ecuación" (juego drag-and-drop)
- **Nivel 2 (Bloqueados)**: "Ecuaciones con dos incógnitas", "Sistemas de ecuaciones"
- **Nivel 3 (Bloqueados)**: "Ecuaciones cuadráticas"
- Indicadores:
  - "Progreso: 0/25 actividades completadas"
  - "Tiempo estimado hasta dominio: 6-8 horas (distribuidas en 2-3 semanas)"
  - "Próxima meta: Completa 3 ejercicios de nivel 1"

### Escenario 2: Adaptación Dinámica tras Éxito en Actividad

**DADO** que estoy en actividad "Resuelve ecuaciones simples" (10 ejercicios, dificultad 3/10)  
**CUANDO** completo los 10 ejercicios con resultados:

- Ejercicio 1-5: 5/5 correcto
- Ejercicio 6-10: 5/5 correcto
- Tiempo promedio: 45 segundos por ejercicio
- Resultado total: 10/10 (100% acierto)  
  **ENTONCES**:
- Veo celebración: Animación de confetti + "¡Perfecto! 10/10 🎉"
- Mensaje: "Pareces tener esto dominado. Vamos a subir el nivel"
- **Backend ejecuta**:
  ```python
  # Algoritmo de adaptación (Simplificado)
  if accuracy >= 0.90 and avg_time < expected_time * 1.2:
      confidence_score = 0.95  # Alta confianza en dominio
      next_difficulty = current_difficulty + 2  # Salta 2 niveles
      unlock_concepts = ["ecuaciones_con_fracciones", "ecuaciones_con_paréntesis"]
  ```
- **Resultado**:
  - Concepto "ecuaciones_lineales_básicas" marcado como dominado (mastery=true)
  - Se desbloquean:
    - Ejercicios de nivel 5/10 (salta nivel 4): "Ecuaciones con fracciones"
    - Actividad opcional: "Desafío rápido: 5 ecuaciones avanzadas en 3 minutos"
  - Notificación: "Desbloqueaste contenido avanzado 🚀"
  - Se actualiza: "Progreso: 1/25 (4%) • Tiempo estimado: 5-7 horas"

### Escenario 3: Adaptación Dinámica tras Dificultad/Fallo

**DADO** que estoy en actividad "Ecuaciones con fracciones" (dificultad 5/10)  
**CUANDO** completo 10 ejercicios con resultados:

- Ejercicio 1-3: 2/3 correcto
- Ejercicio 4-6: 1/3 correcto (fallo en simplificación)
- Ejercicio 7-10: 2/4 correcto
- Resultado total: 5/10 (50% acierto)  
  **ENTONCES**:
- Veo mensaje empático: "¡Buen intento! Las fracciones pueden ser complicadas 💪"
- Aparece modal: "Detectamos que necesitas refuerzo en:"
  - ❌ Simplificación de fracciones
  - ❌ Operaciones con denominadores diferentes
- **Backend ejecuta**:
  ```python
  if accuracy < 0.60:
      identify_error_patterns()  # Analiza qué tipo de errores
      # Resultado: 60% errores en simplificación
      recommend_remedial_content = [
          "video_repaso_fracciones",
          "ejercicios_simplificacion_basica",
          "tutor_virtual_fracciones"
      ]
      next_difficulty = max(current_difficulty - 2, 1)  # Baja 2 niveles
  ```
- **Resultado**:
  - Se desbloquea contenido de repaso:
    - 🎥 "Repaso: Cómo simplificar fracciones" (3 min)
    - ✏️ "Práctica: Simplifica 15 fracciones" (nivel 2/10)
    - 🤖 Botón: "Habla con el tutor virtual" (chatbot con IA)
  - Mensaje: "Completa estas actividades de repaso y podrás reintentar"
  - Botón "Reintentar ahora" deshabilitado hasta completar 1 actividad de repaso
  - Se actualiza DB: `struggling_concepts = ["simplificacion_fracciones"]`

### Escenario 4: Recomendación Basada en Patrón de Aprendizaje

**DADO** que he completado 5 actividades en los últimos 3 días con patrón:

- 3 actividades de álgebra: Promedio 85% acierto
- 2 actividades de geometría (exploración): Promedio 95% acierto
- Tiempo total en plataforma: 4 horas  
  **CUANDO** el sistema analiza mi comportamiento  
  **ENTONCES**:
- **Motor de recomendación detecta**:
  - Fortaleza en geometría (mi perfil ya lo indicaba)
  - Buen progreso en álgebra
  - Alta motivación (sesiones frecuentes)
- **Backend ejecuta algoritmo híbrido**:
  ```python
  # Regla 70/30: 70% refuerzo de objetivo principal, 30% exploración
  recommendations = {
      "primary": ["ecuaciones_sistemas", "problemas_aplicados_algebra"],  # 70%
      "exploration": ["geometria_analitica", "funciones_lineales_graficas"]  # 30%
  }
  ```
- **Resultado en UI**:
  - Sección principal: "Continúa con Álgebra" → 2 actividades siguientes
  - Sección secundaria: "Explora Geometría Analítica (recomendado para ti)" → 1 actividad
  - Banner: "Estás haciendo un gran progreso. ¡Sigue así! Racha: 3 días 🔥"

### Escenario 5: Sistema de Pre-requisitos y Bloqueos Inteligentes

**DADO** que he dominado "Ecuaciones lineales básicas"  
**Y** NO he dominado "Operaciones con fracciones"  
**CUANDO** intento acceder a "Ecuaciones cuadráticas con fracciones"  
**ENTONCES**:

- Veo que el nodo está bloqueado con candado 🔒
- Tooltip al hacer hover: "Requiere dominar:"
  - ✅ Ecuaciones lineales básicas
  - ❌ Operaciones con fracciones (en progreso: 40%)
- Botón: "Ir a Operaciones con fracciones"
- Explicación: "Este tema necesita que sepas fracciones para entenderlo bien"
- El grafo de conocimiento define:
  ```
  "ecuaciones_cuadraticas_fracciones": {
      "prerequisites": ["ecuaciones_lineales_basicas", "operaciones_fracciones"],
      "prerequisite_threshold": 0.80  # Requiere 80% mastery
  }
  ```

### Escenario 6: Detección de Zona de Desarrollo Próximo (ZDP)

**DADO** que el sistema ha recopilado mis datos de desempeño:

- Conceptos dominados: 12
- Nivel de dominio promedio: 7.5/10
- Velocidad de aprendizaje: Rápida (completo actividades 30% más rápido que promedio)  
  **CUANDO** el algoritmo de ZDP se ejecuta  
  **ENTONCES**:
- **Backend calcula**:
  ```python
  current_mastery_level = 7.5
  optimal_challenge_level = current_mastery_level + 1.5  # ZDP de Vygotsky
  # Resultado: Recomendar actividades de dificultad 8-9/10
  ```
- **Resultado**:
  - Se priorizan actividades con dificultad 8-9/10 (ni muy fáciles ni imposibles)
  - Se evitan actividades de nivel 3-5 (ya dominadas)
  - Se posponen actividades de nivel 10/10 (aún muy difíciles)
  - Mensaje motivacional: "Estás listo para desafíos mayores 🚀"

### Escenario 7: Re-calibración Periódica del Perfil

**DADO** que he completado 25 actividades en 2 semanas  
**Y** mis resultados muestran cambio significativo:

- Inicial: Nivel álgebra 6/10
- Actual: Nivel álgebra 8.5/10 (mejora de 2.5 puntos)
- Estilo de aprendizaje: Ahora muestro más preferencia por ejercicios que por videos  
  **CUANDO** el sistema ejecuta re-calibración automática  
  **ENTONCES**:
- Se actualiza perfil:
  ```json
  "profile_updates": {
      "knowledge_level": {
          "algebra": 8.5,  // Era 6.0
      },
      "learning_style_weights": {
          "video": 0.60,  // Era 0.75
          "exercises": 0.85  // Era 0.65
      },
      "learning_speed": "fast"  // Era "medium"
  }
  ```
- Notificación al alumno: "¡Actualización de perfil! Has mejorado mucho en álgebra 📈"
- Gráfico antes/después con celebración
- Botón: "Ver mi nuevo perfil"
- Las futuras recomendaciones priorizan más ejercicios que videos

### Escenario 8: Intervención Automática por Inactividad

**DADO** que no he accedido a la plataforma en 5 días  
**Y** tenía una racha de 7 días activos previa  
**CUANDO** el sistema detecta inactividad prolongada  
**ENTONCES**:

- **Backend ejecuta workflow de reenganche**:
  - Día 5: Email con asunto: "Te extrañamos 😢 Continúa tu ruta en Álgebra"
  - Día 7: Notificación push: "María, ¡retoma tu racha! Solo 1 ejercicio para volver"
  - Día 10: Asignación de actividad ultra-fácil (gamificación): "Desafío de regreso: 3 preguntas rápidas"
- Al volver:
  - Modal: "¡Bienvenida de vuelta! Preparamos algo fácil para retomar"
  - Se recomienda actividad de repaso (dificultad -1 de lo que dejaste)
  - Incentivo: "Completa 1 actividad hoy y gana badge 'Regreso Triunfal'"

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas

1. **Machine Learning Infrastructure** (Fase 1: Reglas, Fase 2: ML avanzado)

   - **Fase 1 (MVP)**: Sistema de reglas basado en umbrales
     - Accuracy >= 0.85 → Subir dificultad +1-2 niveles
     - Accuracy < 0.60 → Bajar dificultad, recomendar repaso
   - **Fase 2**: Modelo de Reinforcement Learning o Deep Knowledge Tracing
     - Framework: TensorFlow/PyTorch
     - Dataset: ≥20,000 interacciones alumno-actividad

2. **Grafo de Conocimiento**

   - Base de datos de grafos: Neo4j o PostgreSQL con JSON
   - 500+ nodos de conceptos (e.g., "ecuaciones_lineales", "fracciones")
   - 2000+ relaciones: "requires", "related_to", "difficulty_level"

3. **Motor de Recomendación**

   - Algoritmo: Híbrido (Reglas + Collaborative Filtering simple)
   - Cache: Redis para recomendaciones precalculadas
   - Latencia objetivo: <500ms

4. **APIs Internas**
   - GET /api/v1/learning-paths/:userId (obtiene ruta personalizada)
   - POST /api/v1/activities/:activityId/complete (registra completitud)
   - GET /api/v1/recommendations/:userId (obtiene siguiente actividad)
   - POST /api/v1/profiles/:userId/recalibrate (re-calibración de perfil)

### Dependencias de Negocio

1. **Pre-requisitos**

   - Banco de ≥500 actividades curadas y metadateadas:
     - Dificultad (1-10)
     - Conceptos que refuerza
     - Tipo (video, ejercicio, juego, lectura)
     - Duración estimada
   - Validación pedagógica de pre-requisitos y secuencias

2. **Procesos**
   - Workflow de creación de contenido adaptativo
   - Proceso de QA para actividades (revisión por profesores)
   - Protocolo de actualización de grafos de conocimiento

### Dependencias de Datos

1. **Fuentes de Datos**

   - Resultados de encuesta inicial (HU-003) → Perfil base
   - Interacciones históricas: actividades completadas, accuracy, tiempo
   - Taxonomía de conceptos educativos (e.g., Bloom's Taxonomy)

2. **Transformaciones**
   - Cálculo de mastery score por concepto:
     ```python
     mastery = (accuracy * 0.5) + (consistency * 0.3) + (speed * 0.2)
     # consistency = stddev baja en últimas N actividades
     # speed = tiempo relativo al promedio esperado
     ```

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Algoritmo Atora al Alumno en Nivel Muy Fácil o Muy Difícil

**Descripción**: Alumno queda stuck en loop de actividades muy fáciles (aburrimiento) o muy difíciles (frustración)  
**Probabilidad**: Alta | **Impacto**: Crítico  
**Mitigación**:

- **Detección de loops**: Si hace >5 actividades del mismo nivel sin cambio → Intervención automática
- **Escaladores manuales**: Botón "Esto es muy fácil/difícil" que el alumno puede usar
- **Variedad forzada**: Cada 3 actividades, introducir 1 de tipo diferente (si hace muchos ejercicios → video)
- **Revisión humana**: Alertas a profesores si alumno está >7 días en mismo concepto
- **A/B Testing**: Probar diferentes umbrales de adaptación
- **Meta**: <5% de alumnos reportan frustración por nivel inadecuado

### Riesgo 2: Modelo de ML con Baja Precisión de Predicción (<70%)

**Descripción**: Recomendaciones no mejoran significativamente vs rutas estáticas  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:

- **Baseline híbrido**: Usar reglas simples en MVP, ML solo cuando hay suficientes datos (≥50 interacciones por alumno)
- **Validación continua**: Comparar P(éxito predicho) vs éxito real, ajustar si divergencia >15%
- **Fallback**: Si predicción falla → Usar recomendación por similaridad (collaborative filtering)
- **Re-entrenamiento**: Cada mes con nuevos datos
- **Meta**: Precisión >75% en predicción de éxito en actividad

### Riesgo 3: Falta de Contenido Suficiente para Personalización

**Descripción**: Pocas actividades por concepto/nivel → Recomendaciones repetitivas  
**Probabilidad**: Alta | **Impacto**: Alto  
**Mitigación**:

- **Plan de contenido**: Mínimo 10 actividades variadas por concepto crítico
- **Generación asistida por IA**: Usar GPT-4 para crear variaciones de ejercicios
- **Contenido de terceros**: Integrar con Khan Academy, Coursera (API)
- **Crowdsourcing**: Permitir a profesores subir actividades
- **Roadmap**: Incrementar banco en 100 actividades/mes
- **Meta**: Cobertura de 95% de conceptos con ≥5 actividades cada uno en 6 meses

### Riesgo 4: Sesgo del Algoritmo que Limita Exploración

**Descripción**: Algoritmo solo recomienda áreas débiles, alumno no explora fortalezas/nuevos temas  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:

- **Regla 70/30**: 70% refuerzo de áreas débiles, 30% exploración de fortalezas/curiosidades
- **"Momentos de exploración"**: Cada 5 actividades de refuerzo → 1 actividad libre elegida por alumno
- **Diversificación**: Penalizar repetición excesiva del mismo tipo de actividad
- **Feedback del alumno**: Encuesta cada 2 semanas: "¿Las recomendaciones son variadas?"
- **Meta**: >80% alumnos sienten que "aprenden lo que necesitan Y exploran cosas nuevas"

### Riesgo 5: Desmotivación por Falta de Progreso Visible

**Descripción**: Alumno no ve avance tangible, se desanima  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:

- **Visualización de progreso**: Barra de progreso, % completitud, gráficos de evolución
- **Gamificación**: XP, niveles, badges ("Maestro de Ecuaciones"), leaderboard opcional
- **Celebraciones**: Animaciones en hitos (cada 5 actividades, cada concepto dominado)
- **Comparación con yo pasado**: "Hace 1 mes tenías nivel 6, ahora 8.5" (no comparar con otros)
- **Micro-metas**: "Hoy completa 1 actividad" en lugar de "Domina álgebra" (abrumador)
- **Meta**: >85% alumnos dicen "Siento que estoy progresando"

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (13 Story Points = ~104 horas)

1. **Diseño de Grafo de Conocimiento** (10h)

   - Mapeo de 500+ conceptos y relaciones de pre-requisitos
   - Validación con equipo pedagógico
   - Modelado en Neo4j o PostgreSQL JSON

2. **Backend - Motor de Recomendación (Reglas)** (12h)

   - Algoritmo de selección basado en accuracy, tiempo, mastery
   - Lógica de adaptación dinámica (subir/bajar dificultad)
   - Sistema de pre-requisitos y bloqueos

3. **Backend - Cálculo de Mastery y ZDP** (8h)

   - Algoritmo de mastery score
   - Implementación de Zona de Desarrollo Próximo
   - Re-calibración periódica de perfil

4. **Backend - Detección de Patrones y Alertas** (6h)

   - Detección de loops de frustración/aburrimiento
   - Alertas a profesores
   - Workflow de reenganche por inactividad

5. **Backend - APIs y Persistencia** (8h)

   - Endpoints de rutas de aprendizaje
   - Guardado de interacciones (tabla `activity_completions`)
   - Cache de recomendaciones en Redis

6. **Frontend - Visualización de Ruta (Mapa de Nodos)** (15h)

   - Interfaz de grafo interactivo (D3.js o React Flow)
   - Código de colores, animaciones de desbloqueo
   - Responsive para móvil

7. **Frontend - Dashboard de Progreso** (8h)

   - Barra de progreso, estadísticas
   - Gráficos de evolución (Chart.js)
   - Sección de recomendaciones

8. **Gamificación y Motivación** (8h)

   - Sistema de XP y niveles
   - Badges y celebraciones animadas
   - Rachas y recordatorios

9. **Content Management** (10h)

   - Herramienta para profesores/admin para subir actividades
   - Metadateado: dificultad, conceptos, tipo
   - QA de actividades

10. **ML - Modelo Básico (Collaborative Filtering)** (8h)

    - Implementación de CF simple para Fase 1
    - Preparación de infraestructura para DKT (Fase 2)
    - Evaluación de precisión

11. **Testing** (8h)

    - Unit tests de algoritmos
    - Integration tests de flujos
    - A/B testing setup para comparar rutas adaptativas vs estáticas

12. **Documentación** (3h)
    - Documentación de algoritmos
    - Guía para profesores de interpretación de alertas

**Variación estimada**: ±30% (73-135 horas) por complejidad de ML y contenido

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**

  - ✅ Independent: Depende de HU-003 pero funciona independiente después
  - ✅ Negotiable: Algoritmo puede ser reglas → ML evolutivamente
  - ✅ Valuable: +40% retención, -50% tiempo a dominio, $200K ahorro
  - ✅ Estimable: 13 SP = 104h (alta complejidad)
  - ⚠️ Small: Requiere 2 sprints, pero es core funcionalidad
  - ✅ Testable: 8 escenarios con métricas específicas + A/B testing

- [x] **Criterios de aceptación son testeables**

  - GIVEN/WHEN/THEN detallados
  - Métricas: 100% acierto → sube dificultad, <60% → baja + repaso
  - Casos límite: loops, inactividad, falta de contenido

- [x] **Dependencias están documentadas**

  - Técnicas: Grafo Neo4j, Redis, ML framework
  - Negocio: 500+ actividades curadas
  - Datos: Perfil de HU-003, interacciones

- [x] **Riesgos están identificados y mitigados**

  - 5 riesgos críticos con mitigaciones
  - Foco en loops, precisión ML, contenido, sesgo

- [x] **Estimación está dentro del rango esperado**

  - 13 SP justificados por complejidad de grafo + ML + UX

- [ ] **Stakeholders han validado la propuesta** (Pendiente: Data Scientists, Pedagogos)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas

- **Latencia de recomendación**: <500ms (p95)
- **Precisión de predicción de éxito**: >75%
- **Cobertura de conceptos**: >95% con ≥5 actividades
- **Disponibilidad**: >99.9%

### Métricas de Negocio

- **Tiempo a dominio de concepto**: -50% vs método tradicional
- **Retención de conocimiento**: +40% (evaluaciones 30 días post)
- **Ahorro en tutorías**: $200K/año
- **Diferenciación competitiva**: "IA personalizada" en top 3 features valorados

### Métricas de Usuario

- **Satisfacción con recomendaciones**: >8.5/10
- **Percepción de progreso**: >85% dicen "Siento que avanzo"
- **Engagement**: +60% tiempo en plataforma vs rutas estáticas
- **Frustración**: <5% reportan nivel inadecuado

### Métricas de Aprendizaje

- **Mastery rate**: >80% de alumnos dominan conceptos objetivo en tiempo estimado
- **Tasa de completitud de actividades**: >75%
- **Distribución de dificultades**: 70% en ZDP (nivel +1-2 del dominio actual)

---

## 📝 NOTAS ADICIONALES

### Algoritmo de Adaptación Simplificado (MVP)

```python
def get_next_activity(user_id, last_activity_result):
    profile = get_user_profile(user_id)
    current_concept = get_current_concept(user_id)

    # Calcular mastery del concepto actual
    mastery = calculate_mastery(user_id, current_concept)

    if mastery >= 0.85:  # Dominio alcanzado
        unlock_next_concepts(user_id, current_concept)
        return get_activity_from_next_level(user_id)

    elif last_activity_result.accuracy >= 0.85:
        # Subir dificultad gradualmente
        return get_activity(concept=current_concept,
                            difficulty=last_activity_result.difficulty + 1)

    elif last_activity_result.accuracy < 0.60:
        # Bajar dificultad y agregar repaso
        remedial = get_remedial_content(current_concept)
        return remedial

    else:
        # Mantener nivel similar
        return get_similar_activity(last_activity_result)
```

### Roadmap de Evolución ML

- **Sprint 3-4 (MVP)**: Sistema de reglas + Collaborative Filtering básico
- **Sprint 7-8**: Implementar modelo de Reinforcement Learning simple
- **Año 1**: Deep Knowledge Tracing (DKT) con LSTM si hay ≥20K interacciones
- **Año 2**: Multi-Armed Bandit para optimización de secuencias

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha      | Versión | Cambios                                        | Autor   |
| ---------- | ------- | ---------------------------------------------- | ------- |
| 2025-11-06 | 1.0     | Creación inicial con enfoque híbrido Reglas+ML | BA Team |

---

**Estado**: ✅ READY FOR TECHNICAL REVIEW  
**Aprobado por**: [Pendiente: Data Science Lead, Director Académico]  
**Fecha de aprobación**: [Pendiente]
