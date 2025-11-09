# HU-005: Retroalimentación Inteligente para Alumnos

## 1. Identificador

**HU-005**

---

## 2. Título

Proporcionar retroalimentación inmediata y personalizada cuando el alumno resuelve actividades

---

## 3. Descripción

**Como** alumno de primaria (8-12 años)  
**Quiero** recibir ayuda inmediata cuando me equivoco en un ejercicio  
**Para** entender mis errores y aprender a resolver los problemas correctamente

---

## 4. Contexto Técnico

- La retroalimentación debe ser inmediata (al momento de responder)
- Debe ser educativa, no solo decir "correcto" o "incorrecto"
- Debe adaptarse según el tipo de error que comete el alumno
- Debe motivar al alumno a seguir intentando sin frustrarse

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Retroalimentación inmediata al responder

- Cuando el alumno responde correctamente:
  - Ve un mensaje positivo: "¡Excelente! Lo hiciste perfecto 🎉"
  - Gana puntos o estrellas visibles
  - Aparece una breve animación de celebración
- Cuando el alumno responde incorrectamente:
  - Ve un mensaje motivador: "Casi lo logras, inténtalo de nuevo 💪"
  - El sistema NO muestra la respuesta correcta de inmediato
  - Ofrece una pista o sugerencia

### ✅ Criterio 2: Pistas progresivas según intentos

- **Primer intento fallido**: Pista sutil
  - Ejemplo en suma: "Recuerda revisar si llevaste correctamente las unidades"
- **Segundo intento fallido**: Pista más directa
  - Ejemplo en suma: "Empieza sumando 7 + 5. ¿Cuánto te da?"
- **Tercer intento fallido**: Explicación paso a paso
  - El sistema muestra cómo resolver el problema paso a paso
  - Ofrece un ejercicio similar más sencillo
  - Sugiere: "¿Quieres ver un video explicativo?"

### ✅ Criterio 3: Identificación de tipo de error

- Si el alumno comete siempre el mismo tipo de error, el sistema lo detecta
- Ejemplos:
  - "Veo que confundes multiplicación con suma. Vamos a repasar la diferencia"
  - "Parece que necesitas practicar más las tablas de multiplicar"
- Ofrece ejercicios específicos para ese tipo de error

### ✅ Criterio 4: Explicaciones adaptadas al nivel

- Las explicaciones usan lenguaje apropiado para primaria (8-12 años)
- Incluyen ejemplos con objetos concretos: manzanas, dulces, juguetes
- Usan imágenes y diagramas cuando sea posible
- Evitan términos muy técnicos

### ✅ Criterio 5: Tutor virtual disponible

- El alumno puede hacer clic en "Necesito ayuda" en cualquier momento
- Aparece un tutor virtual (chatbot) que pregunta: "¿En qué parte te atascaste?"
- El tutor responde preguntas con explicaciones sencillas
- Si el alumno sigue sin entender, el tutor notifica al profesor

### ✅ Criterio 6: Retroalimentación positiva y motivadora

- Todos los mensajes son positivos y alentadores
- El sistema NUNCA usa lenguaje negativo o desalentador
- Celebra el esfuerzo, no solo los aciertos
- Ejemplos: "¡Buen intento!", "Vas por buen camino", "Sigue así"

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- Los mensajes deben aparecer en menos de 1 segundo
- Usar colores y emojis para hacer los mensajes más amigables
- Las animaciones deben ser cortas (máximo 2 segundos)
- El alumno siempre debe saber qué hacer a continuación

### Inteligencia Artificial

- El sistema usa IA para generar explicaciones personalizadas
- Analiza el historial de errores del alumno
- Adapta el lenguaje según la edad y nivel del alumno
- Detecta patrones de error comunes

### Performance

- La retroalimentación debe aparecer en menos de 1 segundo
- El tutor virtual debe responder en menos de 3 segundos
- El sistema debe funcionar con 1,000 alumnos simultáneos

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión
- **HU-002**: Registro de usuarios
- **HU-003**: Encuesta inicial
- **HU-004**: Rutas adaptativas (para conocer el nivel del alumno)

### Bloquea a

- **HU-006**: Dashboard de profesores (incluye resumen de errores comunes)

---

## 8. Prioridad / Estimación

**Prioridad**: ALTA  
**Estimación**: 8 Story Points / 6 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-feedback.md`
- Ver algoritmo de clasificación de errores: `/evidencias-tecnicas/algoritmo-deteccion-errores.md`
- Ver tutor virtual: `/evidencias-tecnicas/chatbot-tutor-virtual.md`

### Referencias Educativas

- Taxonomía de errores matemáticos
- Principios de retroalimentación formativa
- Teoría del aprendizaje por andamiaje (Scaffolding)

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 90% de las retroalimentaciones aparecen en menos de 1 segundo
- ✅ El 75% de los alumnos resuelven correctamente después de recibir la primera pista
- ✅ El 85% de los alumnos reportan que las explicaciones les ayudan a entender
- ✅ La tasa de abandono de ejercicios disminuye en 40%
- ✅ El 70% de las preguntas al tutor virtual se resuelven sin intervención del profesor

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
