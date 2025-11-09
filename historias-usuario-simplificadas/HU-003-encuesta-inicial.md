# HU-003: Encuesta Inicial para Conocer al Alumno

## 1. Identificador

**HU-003**

---

## 2. Título

Realizar una encuesta inicial para entender el nivel y estilo de aprendizaje del alumno

---

## 3. Descripción

**Como** alumno de primaria (8-12 años) recién registrado  
**Quiero** responder una encuesta divertida sobre mis conocimientos y forma de aprender  
**Para** que la plataforma me recomiende actividades perfectas para mí

---

## 4. Contexto Técnico

- La encuesta debe ser amigable para niños de 8-12 años
- El sistema analiza las respuestas para determinar el nivel inicial del alumno
- Las recomendaciones futuras se basan en esta evaluación inicial
- El proceso debe ser opcional pero altamente recomendado

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Presentación de la encuesta

- Al primer inicio de sesión, el alumno ve un mensaje amigable: "¡Hola! Vamos a conocernos mejor"
- El sistema explica que la encuesta toma 10-15 minutos
- El alumno puede decidir: "Hacerla ahora" o "Hacerla después"
- Si elige "después", puede acceder a ella desde su perfil cuando quiera

### ✅ Criterio 2: Sección 1 - Información básica

- El alumno indica: su grado escolar (3°, 4°, 5°, 6° de primaria)
- Sus materias favoritas (puede elegir varias)
- Sus materias que le cuestan más trabajo
- Cómo prefiere aprender: leyendo, viendo videos, haciendo ejercicios, jugando

### ✅ Criterio 3: Sección 2 - Evaluación de conocimientos por materia

- El sistema muestra 8-10 preguntas sencillas de cada materia principal (Matemáticas, Lengua, Ciencias)
- Las preguntas son de opción múltiple y adaptadas para primaria
- Si el alumno responde bien, las siguientes preguntas son un poco más difíciles
- Si responde mal, las siguientes son más fáciles
- El alumno ve su progreso: "Pregunta 3 de 10"

### ✅ Criterio 4: Sección 3 - Intereses personales

- El alumno indica sus pasatiempos (deportes, arte, música, lectura, videojuegos, etc.)
- Puede escribir qué le gustaría aprender
- Estas respuestas ayudan a personalizar ejemplos y ejercicios

### ✅ Criterio 5: Resultados inmediatos

- Al terminar, el alumno ve un resumen visual: "Tu nivel es Intermedio en Matemáticas"
- El sistema muestra un gráfico de barras con su nivel en cada materia
- El sistema recomienda: "Te sugerimos empezar con estos temas"
- El alumno puede ver actividades recomendadas inmediatamente

### ✅ Criterio 6: Guardar progreso

- Si el alumno cierra la encuesta a la mitad, se guarda su progreso
- Puede continuarla después desde donde la dejó
- El sistema recuerda: "Te quedaste en la pregunta 5 de Matemáticas"

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El diseño debe ser colorido y motivador para niños
- Las instrucciones deben ser claras y con ejemplos visuales
- Incluir iconos y emojis para hacer la experiencia más amigable
- Mostrar progreso constantemente para mantener la motivación

### Inteligencia y Adaptación

- El sistema usa las respuestas para clasificar al alumno en niveles: Básico, Intermedio o Avanzado
- Las preguntas se adaptan en tiempo real según las respuestas
- El análisis considera no solo respuestas correctas, sino también el tiempo que toma responder
- Los resultados se usan para crear la ruta de aprendizaje personalizada

### Performance

- La encuesta debe cargarse en menos de 2 segundos
- Las preguntas deben aparecer instantáneamente al avanzar
- El sistema debe procesar las respuestas y mostrar resultados en menos de 5 segundos

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión
- **HU-002**: Registro de usuarios (el alumno debe estar registrado)

### Bloquea a

- **HU-004**: Rutas de aprendizaje adaptativo (necesita conocer el nivel del alumno)
- **HU-005**: Retroalimentación personalizada (necesita el perfil del alumno)

---

## 8. Prioridad / Estimación

**Prioridad**: ALTA  
**Estimación**: 8 Story Points / 6 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-encuesta.md`
- Ver diagramas de flujo: `/evidencias-tecnicas/diagramas-encuesta.md`
- Ver algoritmo de evaluación: `/evidencias-tecnicas/algoritmo-evaluacion-nivel.md`

### Referencias Educativas

- Taxonomía de Bloom para clasificación de preguntas
- Teoría de Aprendizaje Adaptativo
- Principios de gamificación para niños

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 80% de los alumnos completan la encuesta en su primer inicio de sesión
- ✅ El tiempo promedio de completado es 10-15 minutos
- ✅ El 90% de las evaluaciones de nivel coinciden con la evaluación del profesor
- ✅ El 85% de los alumnos encuentran las preguntas claras y entretenidas
- ✅ El 95% de los alumnos reciben recomendaciones personalizadas correctas

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
