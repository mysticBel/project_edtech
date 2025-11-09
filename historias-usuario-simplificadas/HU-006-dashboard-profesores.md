# HU-006: Panel de Control para Profesores

## 1. Identificador

**HU-006**

---

## 2. Título

Proporcionar a los profesores un panel para monitorear el progreso de sus alumnos

---

## 3. Descripción

**Como** profesor de primaria  
**Quiero** ver el progreso de todos mis alumnos en una sola pantalla  
**Para** identificar quiénes necesitan ayuda extra y tomar decisiones pedagógicas informadas

---

## 4. Contexto Técnico

- Los profesores pueden tener grupos de 20-40 alumnos
- Necesitan ver información resumida y también detalles específicos
- El sistema debe alertar automáticamente sobre alumnos en riesgo
- La información debe actualizarse en tiempo real

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Vista general del grupo

- Al entrar al dashboard, el profesor ve tarjetas de resumen:
  - **Total de alumnos**: 35 alumnos en el grupo
  - **Alumnos activos hoy**: 28 alumnos (80%)
  - **Progreso promedio**: 68%
  - **Alumnos que necesitan atención**: 5 alumnos 🔴

### ✅ Criterio 2: Lista de alumnos con semáforo visual

- El profesor ve una tabla con todos sus alumnos:
  - **Verde** 🟢: Progreso excelente (>80%)
  - **Amarillo** 🟡: Progreso normal (60-80%)
  - **Rojo** 🔴: Necesita atención (<60% o no ha entrado en 3+ días)
- Para cada alumno se muestra:
  - Nombre
  - Última vez activo
  - Progreso general (%)
  - Materias con dificultad

### ✅ Criterio 3: Alertas inteligentes automáticas

- El sistema genera alertas cuando detecta:

  - "⚠️ Juan no ha entrado en 5 días"
  - "⚠️ María lleva 3 días atascada en fracciones"
  - "⚠️ Pedro ha fallado 8 ejercicios seguidos de división"
  - "✅ Ana ha completado todo el módulo de multiplicación"

- Las alertas aparecen destacadas en la parte superior
- El profesor puede marcar alertas como "Atendidas"

### ✅ Criterio 4: Vista detallada de un alumno

- Al hacer clic en un alumno, el profesor ve:
  - Gráfico de progreso por materia
  - Actividades completadas esta semana
  - Temas donde tiene más errores
  - Tiempo promedio de estudio por día
  - Comentarios o notas previas del profesor

### ✅ Criterio 5: Análisis por materia

- El profesor puede filtrar: "Ver solo Matemáticas"
- Ve un mapa de calor mostrando:
  - Qué temas dominan la mayoría (verde)
  - Qué temas son difíciles para muchos (rojo)
- Esto ayuda a planificar clases de refuerzo grupales

### ✅ Criterio 6: Herramientas de intervención rápida

- Desde el dashboard, el profesor puede:
  - Enviar un mensaje al alumno: "¡Buen trabajo esta semana!"
  - Asignar actividades específicas: "Juan, completa estos 5 ejercicios de fracciones"
  - Notificar a los padres: "María necesita apoyo en casa con las tablas"
  - Crear grupos de refuerzo: "Alumnos con dificultad en división"

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El dashboard debe ser simple e intuitivo
- Usar colores (semáforo) para comunicar visualmente
- Priorizar la información más importante arriba
- Permitir personalizar qué información ver

### Inteligencia y Automatización

- Las alertas se generan automáticamente usando algoritmos predictivos
- El sistema predice qué alumnos están en riesgo de abandonar
- Sugiere acciones concretas al profesor
- Aprende de las intervenciones exitosas del profesor

### Performance

- El dashboard debe cargar en menos de 2 segundos
- Los datos deben actualizarse automáticamente cada 5 minutos
- Debe funcionar con grupos de hasta 100 alumnos

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión
- **HU-002**: Registro de usuarios
- **HU-003**: Encuesta inicial
- **HU-004**: Rutas adaptativas (fuente de datos de progreso)
- **HU-005**: Retroalimentación (fuente de datos de errores)

### Bloquea a

- **HU-007**: Dashboard ejecutivo (nivel institucional)

---

## 8. Prioridad / Estimación

**Prioridad**: ALTA  
**Estimación**: 10 Story Points / 8 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-dashboard-profesores.md`
- Ver algoritmo de alertas: `/evidencias-tecnicas/algoritmo-alertas-predictivas.md`
- Ver diseño de interfaz: `/evidencias-tecnicas/mockups-dashboard-profesores.md`

### Referencias Educativas

- Learning Analytics (Analítica del aprendizaje)
- Early Warning Systems (Sistemas de alerta temprana)
- Educational Data Mining (Minería de datos educativos)

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 95% de los profesores usan el dashboard al menos 3 veces por semana
- ✅ El tiempo que los profesores dedican a monitoreo manual se reduce en 60%
- ✅ El 80% de las alertas resultan en intervenciones efectivas
- ✅ La identificación temprana de alumnos en riesgo aumenta en 70%
- ✅ La satisfacción de los profesores con la herramienta es >8.5/10

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
