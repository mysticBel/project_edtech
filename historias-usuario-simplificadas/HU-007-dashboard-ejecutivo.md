# HU-007: Panel Ejecutivo para Directores

## 1. Identificador

**HU-007**

---

## 2. Título

Proporcionar a directores un panel con métricas clave para tomar decisiones estratégicas

---

## 3. Descripción

**Como** director académico o coordinador  
**Quiero** ver las métricas más importantes de toda la institución en un solo lugar  
**Para** tomar decisiones informadas, identificar oportunidades de mejora y demostrar resultados

---

## 4. Contexto Técnico

- Los directores necesitan información agregada de múltiples grupos y profesores
- Las métricas deben ser fáciles de entender sin conocimientos técnicos
- El sistema debe permitir comparar períodos y generar reportes para presentaciones
- Los datos deben actualizarse regularmente sin intervención manual

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Vista principal con indicadores clave

- Al entrar, el director ve 6 tarjetas grandes con las métricas principales:

  1. **Adopción de la Plataforma**

     - 92% de alumnos activos (462 de 500)
     - Flecha verde ↑ +5% vs mes anterior

  2. **Progreso Promedio**

     - 68% de avance general
     - Flecha verde ↑ +3% vs mes anterior

  3. **Retención de Alumnos**

     - 94% de alumnos continúan activos
     - Flecha verde ↑ +2% vs año anterior

  4. **Satisfacción Promedio**

     - 8.3 de 10 puntos
     - Basado en encuestas a 350 alumnos

  5. **Actividad de Profesores**

     - 95% de profesores usan la plataforma semanalmente
     - 12 horas promedio de uso por semana

  6. **Retorno de Inversión (ROI)**
     - $520,000 valor generado al año
     - vs $180,000 de inversión = 289% ROI

### ✅ Criterio 2: Alertas estratégicas

- El dashboard muestra alertas importantes en la parte superior:
  - 🔴 "15% de alumnos en riesgo en Matemáticas - Ver detalles"
  - 🟡 "Alta demanda de contenido de Física - Considerar expansión"
  - 🟢 "Retención mejoró 30% este año - Felicitaciones al equipo"

### ✅ Criterio 3: Análisis por materia

- El director puede ver una tabla con todas las materias:
  - Cuántos alumnos estudian cada materia
  - Progreso promedio por materia
  - Nivel de satisfacción
  - Cuáles materias necesitan atención (código de colores)

### ✅ Criterio 4: Comparación con períodos anteriores

- El director puede seleccionar: "Comparar con mes anterior" o "Comparar con año anterior"
- Todas las métricas se actualizan mostrando:
  - El valor actual
  - El valor del período anterior
  - El porcentaje de cambio con flechas ↑↓

### ✅ Criterio 5: Identificación de oportunidades

- El sistema genera automáticamente insights como:
  - "30% de alumnos atascados en Fracciones → Recomendación: Organizar taller de refuerzo"
  - "Profesor Ana Martínez tiene 95% de retención vs 88% promedio → Replicar sus prácticas"
  - "Alta demanda de contenido avanzado de Física → Oportunidad de crear curso premium"

### ✅ Criterio 6: Generación de reportes ejecutivos

- El director hace clic en "Generar Presentación Ejecutiva"
- Elige qué incluir:
  - Resumen ejecutivo
  - Métricas principales
  - Tendencias
  - Análisis por materia
  - ROI financiero
- El sistema genera un archivo PowerPoint o PDF listo para presentar
- El reporte se descarga en menos de 30 segundos

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El diseño debe ser profesional y limpio
- Usar gráficos visuales fáciles de interpretar
- Código de colores consistente (verde=bien, amarillo=atención, rojo=urgente)
- Permitir exportar cualquier gráfico como imagen

### Procesamiento de Datos

- Los datos se actualizan automáticamente cada hora
- El sistema calcula automáticamente tendencias y comparaciones
- Las proyecciones financieras (ROI) se calculan con fórmulas validadas
- Los reportes se generan de forma asíncrona para no bloquear la interfaz

### Performance

- El dashboard debe cargar en menos de 3 segundos
- Los reportes deben generarse en menos de 30 segundos
- Debe funcionar con instituciones de hasta 10,000 alumnos

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión
- **HU-002**: Registro de usuarios
- **HU-003**: Encuesta inicial
- **HU-004**: Rutas adaptativas
- **HU-005**: Retroalimentación
- **HU-006**: Dashboard de profesores (fuente de datos agregados)

### Bloquea a

- **HU-008**: Exportación de datos (complementa los reportes)

---

## 8. Prioridad / Estimación

**Prioridad**: MEDIA-ALTA  
**Estimación**: 8 Story Points / 6 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-dashboard-ejecutivo.md`
- Ver cálculo de ROI: `/evidencias-tecnicas/formula-calculo-roi.md`
- Ver generación de reportes: `/evidencias-tecnicas/sistema-generacion-reportes.md`

### Referencias de Negocio

- Balanced Scorecard (Cuadro de mando integral)
- Key Performance Indicators (KPIs) educativos
- Return on Investment (ROI) en tecnología educativa

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El tiempo de generación de reportes ejecutivos se reduce en 70%
- ✅ La velocidad de toma de decisiones estratégicas aumenta en 50%
- ✅ Se identifican 5-10 oportunidades de mejora por trimestre
- ✅ El 90% de los directores consultan el dashboard al menos semanalmente
- ✅ El ROI calculado por el sistema coincide en 90%+ con análisis manual

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
