# HU-004: Rutas de Aprendizaje Personalizadas

## 1. Identificador

**HU-004**

---

## 2. Título

Generar rutas de aprendizaje personalizadas que se adapten al progreso de cada alumno

---

## 3. Descripción

**Como** alumno de primaria (8-12 años)  
**Quiero** que la plataforma me muestre actividades que sean perfectas para mi nivel  
**Para** aprender a mi propio ritmo, sin aburrirme ni frustrarme

---

## 4. Contexto Técnico

- Cada alumno tiene un nivel diferente y aprende a su propia velocidad
- El sistema debe detectar si un tema es muy fácil o muy difícil
- Las actividades deben aumentar de dificultad gradualmente
- El sistema debe identificar cuando un alumno está atascado y necesita ayuda diferente

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Vista de ruta personalizada

- El alumno ve su "Mapa de Aprendizaje" al entrar a una materia
- El mapa muestra los temas como estaciones de un viaje
- Los temas completados tienen una ✅ marca verde
- El tema actual tiene una 🔵 marca azul brillante
- Los temas futuros están en gris con candado 🔒

### ✅ Criterio 2: Selección automática de actividades

- Al entrar a un tema, el sistema muestra 3-5 actividades recomendadas
- Las actividades están ordenadas de más fácil a más difícil
- El sistema sugiere: "Te recomendamos empezar con esta actividad"
- El alumno puede elegir cualquier actividad desbloqueada

### ✅ Criterio 3: Adaptación en tiempo real

- Si el alumno resuelve 3 actividades seguidas correctamente y rápido, el sistema dice: "¡Vas muy bien! Vamos a intentar algo más desafiante"
- Si el alumno falla 2 actividades seguidas, el sistema dice: "Vamos a practicar un poco más con ejercicios más sencillos"
- La dificultad se ajusta automáticamente sin que el alumno tenga que hacer nada

### ✅ Criterio 4: Detección de temas problemáticos

- Si el alumno intenta el mismo tipo de ejercicio 4 veces y sigue fallando, el sistema:
  - Ofrece un video explicativo del tema
  - Sugiere ejercicios de repaso de temas anteriores relacionados
  - Muestra ejemplos resueltos paso a paso
  - Notifica al profesor: "Juan necesita ayuda con fracciones"

### ✅ Criterio 5: Desbloqueo de temas avanzados

- Los temas nuevos se desbloquean cuando el alumno domina los temas anteriores
- El sistema muestra: "Has desbloqueado: Divisiones con dos cifras 🎉"
- El alumno puede ver cuánto le falta para desbloquear el siguiente tema
- Si un alumno demuestra conocimiento avanzado, puede saltar temas básicos

### ✅ Criterio 6: Variedad de ejercicios

- El sistema no repite el mismo tipo de ejercicio más de 2 veces seguidas
- Alterna entre: problemas matemáticos, juegos, videos, lecturas, desafíos
- Considera los intereses del alumno (de la encuesta inicial) para elegir ejemplos

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El mapa de aprendizaje debe verse como un viaje o aventura
- Usar gamificación: estrellas, medallas, barras de progreso
- Celebrar logros con animaciones y mensajes motivadores
- Mantener siempre visible cuánto progreso lleva el alumno

### Inteligencia Adaptativa

- El sistema analiza múltiples factores: precisión, velocidad, patrones de error
- Ajusta la dificultad en tiempo real usando algoritmos de aprendizaje adaptativo
- Identifica conceptos relacionados (prerrequisitos) automáticamente
- Predice cuándo un alumno está a punto de frustrarse o aburrirse

### Performance

- Las recomendaciones deben aparecer en menos de 1 segundo
- El sistema debe manejar 1,000 alumnos con rutas diferentes simultáneamente
- Los cambios de nivel deben ser fluidos y sin demoras perceptibles

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión
- **HU-002**: Registro de usuarios
- **HU-003**: Encuesta inicial (necesita conocer el nivel inicial del alumno)

### Bloquea a

- **HU-005**: Retroalimentación inteligente (usa la información de la ruta adaptativa)
- **HU-006**: Dashboard de profesores (muestra el progreso en las rutas)

---

## 8. Prioridad / Estimación

**Prioridad**: CRÍTICA  
**Estimación**: 13 Story Points / 10 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-rutas-adaptativas.md`
- Ver algoritmo de adaptación: `/evidencias-tecnicas/algoritmo-adaptacion-dificultad.md`
- Ver mapa de conocimientos: `/evidencias-tecnicas/grafo-conocimientos.md`

### Referencias Educativas

- Teoría de la Zona de Desarrollo Próximo (Vygotsky)
- Knowledge Tracing (Seguimiento de conocimiento)
- Item Response Theory (Teoría de respuesta al ítem)

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 85% de las actividades recomendadas son del nivel apropiado para el alumno
- ✅ El tiempo que un alumno se queda atascado en un tema se reduce en 40%
- ✅ El 90% de los alumnos completan al menos 3 actividades por sesión
- ✅ La tasa de abandono de actividades disminuye en 50%
- ✅ El 80% de los alumnos reportan que las actividades "no son ni muy fáciles ni muy difíciles"

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
