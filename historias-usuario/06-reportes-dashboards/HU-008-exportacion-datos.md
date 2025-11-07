# HU-008: Exportación Avanzada de Datos y Reportes Personalizados

## 📋 METADATOS

- **ID**: HU-008
- **Épica**: Reportes y Analytics Institucionales
- **Prioridad**: MEDIA
- **Estimación**: 5 Story Points
- **Sprint**: 6
- **Stakeholders**: Administradores, Coordinadores, Investigadores Educativos
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario

**¿Quién?** Administrador que necesita análisis específicos o integración con otras herramientas  
**¿Qué?** Capacidad de exportar datos en múltiples formatos (Excel, CSV, JSON) con filtros personalizados y programar reportes automáticos  
**¿Por qué?** Para análisis externos en Excel, integración con sistemas de gestión, auditorías, investigación educativa

**Ambigüedades detectadas**:

- ¿Qué nivel de granularidad en exportación? (agregado vs detallado)
- ¿Se puede exportar datos de alumnos individuales? (implicaciones GDPR/FERPA)
- ¿Qué frecuencia de reportes automáticos? (diario, semanal, mensual)
- ¿Se integra con Google Sheets/Excel Online?

### Perspectiva Técnica

**Implementable**: ✅ Sí  
**Restricciones**:

- Exportaciones pesadas (10K+ registros) requieren procesamiento asíncrono
- GDPR/FERPA: datos personales solo con permisos
- Rate limiting para evitar abusos
- Formatos: Excel (.xlsx), CSV, JSON, PDF

### Perspectiva de Negocio

**Valor medible**:

- Reducción 80% en tiempo de generación de reportes personalizados
- Facilita auditorías de calidad educativa
- Permite investigación con datos reales
- Integración con ERPs existentes

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** coordinador académico con conocimientos básicos de Excel  
**Quiero** exportar datos con un asistente visual paso a paso (1. Seleccionar período, 2. Elegir métricas, 3. Aplicar filtros, 4. Descargar)  
**Para** crear análisis personalizados en Excel sin necesitar soporte técnico

#### Criterios de Aceptación UX:

1. **DADO** que quiero exportar datos  
   **CUANDO** hago clic en "Exportar"  
   **ENTONCES** veo wizard de 4 pasos con preview de datos

2. **DADO** que selecciono filtros  
   **CUANDO** aplico "Solo Matemáticas, último mes"  
   **ENTONCES** veo contador: "Se exportarán 1,234 registros"

3. **DADO** que descargo Excel  
   **CUANDO** abro el archivo  
   **ENTONCES** veo datos formateados con gráficos automáticos incluidos

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** sistema de exportación  
**Quiero** procesar 10K+ registros de forma asíncrona con streaming  
**Para** no bloquear el servidor y entregar archivos pesados en <60 segundos

#### Criterios de Aceptación Técnicos:

1. **DADO** que se exportan >5K registros  
   **CUANDO** usuario solicita exportación  
   **ENTONCES** se procesa en background job y se envía email con link de descarga

2. **DADO** que se genera archivo  
   **CUANDO** se escribe a disco  
   **ENTONCES** se usa streaming para no cargar todo en RAM

3. **DADO** que se protege privacidad  
   **CUANDO** se exportan datos de alumnos  
   **ENTONCES** se anonimiza o requiere permisos explícitos

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** director de investigación educativa  
**Quiero** acceso a datos granulares con API REST  
**Para** realizar estudios longitudinales y publicar papers sobre efectividad de IA en educación

#### Criterios de Aceptación de Negocio:

1. **DADO** que necesito datos para investigación  
   **CUANDO** solicito acceso a API  
   **ENTONCES** obtengo token con datos anonimizados de 500+ alumnos

2. **DADO** que publico estudio  
   **CUANDO** cito la plataforma  
   **ENTONCES** genera marketing orgánico valorado en $50K

**KPIs**:

- Reducción de tiempo en reportes personalizados: -80%
- Exportaciones exitosas: >95%
- Estudios publicados usando datos: 2-3 por año

---

## 🎯 VERSIÓN FINAL SINTETIZADA

**Matriz de Decisión**:

- Valor de negocio (30%): Versión C = 8/10
- Factibilidad técnica (25%): Versión B = 9/10
- Experiencia de usuario (25%): Versión A = 9/10
- Esfuerzo de implementación (20%): Versión A+B = 8/10
  **Puntuación final**: 8.5/10

---

## 📝 HISTORIA REFINADA FINAL

**Como** administrador o coordinador académico  
**Quiero** exportar datos de la plataforma en formatos estándar (Excel, CSV, JSON) aplicando filtros personalizados (período, materia, nivel), con procesamiento asíncrono para grandes volúmenes, y capacidad de programar reportes automáticos semanales/mensuales  
**Para** reducir 80% el tiempo de generación de reportes personalizados, facilitar auditorías y análisis externos en Excel, e integrar con sistemas institucionales

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Exportación Guiada con Wizard Visual

**DADO** que soy Coordinadora "María López" sin conocimientos técnicos avanzados  
**Y** accedo al dashboard principal  
**CUANDO** hago clic en botón "Exportar Datos" (esquina superior derecha)  
**ENTONCES**:

- Se abre modal full-screen con wizard de 4 pasos:

**PASO 1: Seleccionar Datos**

- Título: "¿Qué datos deseas exportar?"
- Opciones (radio buttons):
  - ⭕ **Datos de alumnos** (progreso, actividades, calificaciones)
  - ⭕ **Datos de profesores** (actividad, intervenciones)
  - ⭕ **Métricas agregadas** (KPIs institucionales)
  - ⭕ **Reportes de actividades** (ejercicios, resultados)
- Botón: [Siguiente →]

**PASO 2: Configurar Filtros**

- Si seleccioné "Datos de alumnos":
  - **Período**: [Rango de fechas] Del: [01/09/2025] Al: [30/11/2025]
  - **Nivel educativo**: [x] Todos [ ] Básico [ ] Intermedio [ ] Avanzado
  - **Materia**: [Todas ▼] (opciones: Matemáticas, Lengua, etc.)
  - **Métricas a incluir**:
    - [x] ID del alumno (anonimizado)
    - [x] Progreso (%)
    - [x] Actividades completadas
    - [x] Accuracy promedio
    - [x] Tiempo total invertido
    - [ ] Datos personales (requiere permisos especiales ⚠️)
- **Vista previa**: "Se exportarán ~1,234 registros"
- Botones: [← Atrás] [Siguiente →]

**PASO 3: Elegir Formato**

- Título: "¿En qué formato?"
- Opciones:
  - ⭕ **Excel (.xlsx)** - "Incluye gráficos automáticos" ⭐ Recomendado
  - ⭕ **CSV (.csv)** - "Para importar a otras herramientas"
  - ⭕ **JSON (.json)** - "Para desarrolladores/integraciones"
  - ⭕ **PDF (.pdf)** - "Informe visual para impresión"
- **Opciones avanzadas** (checkbox):
  - [x] Incluir gráficos automáticos (solo Excel/PDF)
  - [x] Incluir resumen ejecutivo en primera hoja (solo Excel)
  - [ ] Incluir datos sin procesar (raw data)
- Botones: [← Atrás] [Exportar]

**PASO 4: Confirmación y Descarga**

- Si <5K registros:
  - Progreso: "Generando archivo... 80%"
  - Descarga automática después de 5-10 segundos
- Si >5K registros:
  - Mensaje: "⏳ Tu archivo está siendo procesado. Recibirás un email en <5 minutos con el link de descarga."
  - Botón: [Cerrar]

### Escenario 2: Exportación de Datos de Alumnos (Excel con Gráficos)

**DADO** que completé el wizard seleccionando:

- Datos: "Datos de alumnos"
- Filtros: "Matemáticas, último trimestre, 180 alumnos"
- Formato: "Excel con gráficos"  
  **CUANDO** descargo el archivo "Alumnos_Matematicas_Q4_2025.xlsx"  
  **ENTONCES**:
- **Hoja 1: Resumen Ejecutivo**

  - Período: 01/09/2025 - 30/11/2025
  - Materia: Matemáticas
  - Total alumnos: 180
  - Progreso promedio: 68%
  - Actividades completadas: 4,320 (promedio 24/alumno)
  - Gráfico de pastel: Distribución por nivel de progreso
  - Gráfico de barras: Top 10 alumnos por progreso

- **Hoja 2: Datos Detallados**

  - Tabla con columnas:
    | ID Alumno | Nivel | Progreso (%) | Actividades | Accuracy | Tiempo (horas) | Última Actividad |
    |-----------|-------|--------------|-------------|----------|----------------|------------------|
    | ALU-001 | Inter | 72% | 28 | 85% | 12.5 | 2025-11-30 |
    | ALU-002 | Básico| 65% | 22 | 78% | 10.2 | 2025-11-29 |
    | ... | ... | ... | ... | ... | ... | ... |
  - Tabla tiene autofilters habilitados
  - Formato condicional: Progreso >80% = verde, <60% = rojo

- **Hoja 3: Gráficos Adicionales**
  - Gráfico de línea: Evolución del progreso promedio por semana
  - Gráfico de dispersión: Accuracy vs Tiempo invertido
  - Gráfico de barras: Actividades completadas por concepto

### Escenario 3: Exportación CSV para Integración con ERP

**DADO** que necesito importar datos al sistema ERP institucional  
**CUANDO** exporto en formato CSV con filtros: "Todos los alumnos, último mes, solo métricas clave"  
**ENTONCES**:

- Descargo "Alumnos_Metricas_Nov2025.csv" con estructura:
  ```csv
  alumno_id,nombre,email,nivel,progreso_pct,actividades,accuracy_pct,tiempo_horas,fecha_ultima
  ALU-001,Juan Pérez,juan@inst.edu,Intermedio,72,28,85,12.5,2025-11-30
  ALU-002,Ana García,ana@inst.edu,Básico,65,22,78,10.2,2025-11-29
  ...
  ```
- Campos separados por coma
- Encoding UTF-8 con BOM (para compatibilidad con Excel)
- Primera fila = encabezados
- Formato de fechas: YYYY-MM-DD (ISO 8601)
- Se puede importar directamente al ERP sin transformaciones

### Escenario 4: Exportación JSON para API/Desarrollo

**DADO** que soy desarrollador integrando la plataforma con sistema externo  
**CUANDO** exporto en formato JSON  
**ENTONCES**:

- Descargo "Alumnos_API_Nov2025.json" con estructura:
  ```json
  {
    "metadata": {
      "export_date": "2025-11-30T14:30:00Z",
      "period": {
        "start": "2025-09-01",
        "end": "2025-11-30"
      },
      "filters": {
        "subject": "Matemáticas",
        "level": "all"
      },
      "total_records": 180
    },
    "data": [
      {
        "student_id": "ALU-001",
        "level": "Intermedio",
        "progress_pct": 72,
        "activities_completed": 28,
        "accuracy_pct": 85,
        "time_hours": 12.5,
        "last_activity": "2025-11-30"
      },
      {
        "student_id": "ALU-002",
        "level": "Básico",
        "progress_pct": 65,
        "activities_completed": 22,
        "accuracy_pct": 78,
        "time_hours": 10.2,
        "last_activity": "2025-11-29"
      }
    ]
  }
  ```
- Formato válido según JSON Schema
- Campos con snake_case (convención API)
- Fechas en ISO 8601

### Escenario 5: Exportación Pesada (>5K Registros) con Procesamiento Asíncrono

**DADO** que quiero exportar datos de 12K alumnos (todos los niveles, todo el año)  
**CUANDO** hago clic en "Exportar"  
**ENTONCES**:

- Veo mensaje inmediato:

  ```
  ⏳ Procesando Exportación

  Tu archivo está siendo generado en segundo plano.
  Tamaño estimado: ~12,000 registros (~15 MB)
  Tiempo estimado: 3-5 minutos

  Recibirás un email a maria.lopez@instituto.edu con el link de descarga.

  [Cerrar]
  ```

- **En backend**:

  - Se crea job en cola (Redis Queue o Celery)
  - Se procesa en worker dedicado
  - Se genera archivo con streaming (no carga todo en RAM)
  - Se sube a almacenamiento temporal (AWS S3 o local)
  - Link expira en 48 horas

- **Email recibido** (3 minutos después):

  ```
  Asunto: Tu exportación de datos está lista

  Hola María,

  Tu exportación de datos de alumnos está lista para descargar.

  Período: 01/01/2025 - 30/11/2025
  Registros: 12,345
  Formato: Excel (.xlsx)
  Tamaño: 14.8 MB

  [Descargar archivo] (válido por 48 horas)

  Si no solicitaste esta exportación, ignora este email.
  ```

### Escenario 6: Reportes Automáticos Programados

**DADO** que quiero recibir reporte semanal automático  
**CUANDO** accedo a "Configurar Reportes Automáticos"  
**ENTONCES**:

- Veo pantalla de configuración:

**Mis Reportes Programados** (lista existentes):

- 📊 Reporte Semanal Matemáticas | Cada lunes 8:00 AM | Activo | [Editar] [Desactivar]

**Crear Nuevo Reporte**:

- **Nombre**: [Reporte Mensual Completo_______________]
- **Datos**: [Métricas agregadas ▼]
- **Filtros**:
  - Período: [Último mes ▼]
  - Materia: [Todas ▼]
- **Formato**: [Excel con gráficos ▼]
- **Frecuencia**:
  - ⭕ Diario a las [08:00]
  - ⭕ Semanal cada [Lunes ▼] a las [08:00]
  - ⭕ Mensual el día [1 ▼] a las [08:00]
- **Destinatarios**:
  - [x] maria.lopez@instituto.edu
  - [ ] Agregar más destinatarios
- Botones: [Crear reporte] [Cancelar]

- Al crear:
  - Confirmación: "✅ Reporte creado. Recibirás el primer envío el próximo lunes 8:00 AM"
  - Se ejecuta automáticamente según programación

### Escenario 7: Control de Privacidad y Permisos

**DADO** que intento exportar "Datos personales de alumnos" (nombres, emails)  
**CUANDO** marco la opción "Incluir datos personales"  
**ENTONCES**:

- Veo advertencia:

  ```
  ⚠️ Datos Personales Sensibles

  Estás a punto de exportar información personal protegida por GDPR/FERPA:
  - Nombres completos
  - Emails
  - Fechas de nacimiento

  Esta acción requiere:
  1. Justificación legítima (auditoría, investigación aprobada)
  2. Consentimiento de los afectados (si aplica)
  3. Registro en auditoría

  ¿Motivo de la exportación?
  [Auditoría de calidad educativa__________] (obligatorio)

  [ ] Confirmo que tengo autorización legal para exportar estos datos

  [Continuar] [Cancelar]
  ```

- Si continúo:

  - Se registra en log de auditoría:
    - Usuario: maria.lopez@instituto.edu
    - Timestamp: 2025-11-30 14:30:15
    - Motivo: "Auditoría de calidad educativa"
    - Registros exportados: 180
    - IP: 192.168.1.50

- Si NO tengo permisos:
  - Error: "❌ No tienes permisos para exportar datos personales. Contacta al administrador."

### Escenario 8: Exportación con Anonimización Automática

**DADO** que exporto datos de alumnos sin permisos especiales  
**CUANDO** se genera el archivo  
**ENTONCES**:

- Los datos se anonimizan automáticamente:
  - Nombres → IDs anonimizados: "ALU-001", "ALU-002"
  - Emails → Hasheados: "hash_a1b2c3d4"
  - Fechas de nacimiento → Solo edad: "10 años"
- Aviso en archivo Excel:
  ```
  NOTA: Los datos personales han sido anonimizados para proteger la privacidad.
  Si necesitas datos completos, solicita permisos especiales al administrador.
  ```

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas

1. **Librerías de Exportación**

   - Excel: ExcelJS (Node.js) o openpyxl (Python)
   - CSV: Built-in libraries
   - JSON: Built-in libraries
   - PDF: Puppeteer o jsPDF

2. **Procesamiento Asíncrono**

   - Queue: Redis Queue, Bull, Celery
   - Workers: Dedicados para exports pesados
   - Storage: AWS S3 o filesystem local con cleanup automático

3. **Email**

   - SendGrid o AWS SES para envío de links
   - Templates de email con branding institucional

4. **APIs**
   - POST /api/v1/admin/exports/create
   - GET /api/v1/admin/exports/:id/status
   - GET /api/v1/admin/exports/:id/download
   - POST /api/v1/admin/scheduled-reports/create

### Dependencias de Negocio

1. **Legal**

   - Política de exportación de datos (aprobada por legal)
   - Consentimientos para datos personales
   - Retención de archivos exportados (48h)

2. **Procesos**
   - Workflow de aprobación para datos sensibles
   - Auditoría trimestral de exportaciones

### Dependencias de Datos

1. **Todas las HUs anteriores** (fuentes de datos)
2. **Sistema de permisos** (control de acceso)

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Exportación de Datos Sensibles sin Autorización

**Descripción**: Usuario exporta datos personales violando GDPR/FERPA  
**Probabilidad**: Media | **Impacto**: Crítico  
**Mitigación**:

- **Anonimización por defecto**: Datos personales ocultos sin permisos
- **Advertencias claras**: Modal de confirmación con implicaciones legales
- **Auditoría completa**: Log de todas las exportaciones con datos sensibles
- **Revisión periódica**: Legal revisa exportaciones trimestralmente
- **Formación**: Capacitación sobre GDPR/FERPA a administradores
- **Meta**: 0 violaciones de privacidad

### Riesgo 2: Performance Degradada por Exportaciones Pesadas

**Descripción**: Exportaciones de 10K+ registros bloquean servidor  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:

- **Procesamiento asíncrono**: Exports >5K en background
- **Streaming**: No cargar todo en RAM
- **Rate limiting**: Max 3 exportaciones simultáneas por usuario
- **Timeout**: Matar jobs que toman >15 minutos
- **Monitoreo**: Alertas si queue crece >10 jobs
- **Meta**: <60 seg para 10K registros

### Riesgo 3: Archivos Exportados Permanecen en Servidor

**Descripción**: Acumulación de archivos exportados llena disco  
**Probabilidad**: Alta | **Impacto**: Medio  
**Mitigación**:

- **Cleanup automático**: Archivos expiran en 48 horas
- **Almacenamiento externo**: S3 con lifecycle policies
- **Compresión**: .zip para archivos >10 MB
- **Alerta de capacidad**: Si disco >80% lleno
- **Meta**: <100 MB de archivos temporales

### Riesgo 4: Formato de Exportación Incompatible con Sistema Externo

**Descripción**: CSV/JSON no se puede importar a ERP por formato incorrecto  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:

- **Formatos estándar**: ISO 8601 para fechas, UTF-8 para textos
- **Validación**: Testear importación a sistemas populares (SAP, Moodle)
- **Documentación**: Esquema de datos en docs
- **Preview**: Vista previa de primeras 10 filas antes de exportar
- **Meta**: >95% de exportaciones exitosamente importadas

### Riesgo 5: Reportes Automáticos Generan Spam

**Descripción**: Reportes semanales no se leen, acumulan en inbox  
**Probabilidad**: Media | **Impacto**: Bajo  
**Mitigación**:

- **Límite de reportes**: Max 5 reportes programados por usuario
- **Opción de pausa**: "Pausar por 1 mes" sin eliminar configuración
- **Tracking de apertura**: Si no se abre en 3 semanas, sugerir desactivar
- **Unsubscribe fácil**: Link en cada email
- **Meta**: >60% de reportes se abren

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (5 Story Points = ~40 horas)

1. **Backend - Lógica de Exportación** (8h)

   - Queries con filtros dinámicos
   - Generación de Excel con gráficos (ExcelJS)
   - Generación de CSV, JSON, PDF

2. **Backend - Procesamiento Asíncrono** (6h)

   - Queue con Redis
   - Workers dedicados
   - Almacenamiento temporal (S3 o local)

3. **Backend - Reportes Programados** (4h)

   - Cron jobs o scheduler (node-cron)
   - CRUD de configuraciones
   - Envío de emails con links

4. **Backend - Control de Privacidad** (4h)

   - Anonimización automática
   - Sistema de permisos
   - Logs de auditoría

5. **Frontend - Wizard de Exportación** (8h)

   - Modal con 4 pasos
   - Filtros dinámicos
   - Preview de datos

6. **Frontend - Gestión de Reportes Programados** (4h)

   - CRUD de reportes
   - Lista de reportes activos

7. **Testing** (4h)

   - Unit tests de generadores
   - Integration tests de workers
   - Performance testing con 10K registros

8. **Documentación** (2h)
   - Manual de exportaciones
   - Esquema de datos

**Variación estimada**: ±25% (30-50 horas)

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**

  - ✅ Independent: Funciona independiente
  - ✅ Negotiable: Formatos y frecuencias configurables
  - ✅ Valuable: -80% tiempo en reportes personalizados
  - ✅ Estimable: 5 SP = 40h
  - ✅ Small: Completable en 1 sprint
  - ✅ Testable: 8 escenarios

- [x] **Criterios de aceptación son testeables**

  - GIVEN/WHEN/THEN detallados
  - Métricas: <60 seg para 10K, >95% importaciones exitosas

- [x] **Dependencias están documentadas**

  - Técnicas: ExcelJS, queues, S3
  - Legal: Políticas de privacidad

- [x] **Riesgos están identificados y mitigados**

  - 5 riesgos con mitigaciones

- [x] **Estimación está dentro del rango esperado**

  - 5 SP por complejidad moderada

- [ ] **Stakeholders han validado la propuesta** (Pendiente)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas

- **Tiempo de exportación**: <60 seg para 10K registros
- **Tasa de éxito**: >95%
- **Uptime de workers**: >99%

### Métricas de Negocio

- **Reducción de tiempo en reportes personalizados**: -80%
- **Exportaciones mensuales**: >100
- **Reportes programados activos**: >20

### Métricas de Usuario

- **Satisfacción**: >8.5/10
- **Reportes automáticos abiertos**: >60%

### Métricas de Seguridad

- **Violaciones de privacidad**: 0
- **Auditorías aprobadas**: 100%

---

## 📝 NOTAS ADICIONALES

### Formatos Soportados

- **Excel (.xlsx)**: Con gráficos, formato condicional, múltiples hojas
- **CSV (.csv)**: UTF-8 con BOM, separador coma
- **JSON (.json)**: Estructura con metadata + data
- **PDF (.pdf)**: Reporte visual con gráficos

### Límites Técnicos

- Exportación síncrona: Max 5K registros
- Exportación asíncrona: Max 100K registros
- Reportes programados: Max 5 por usuario
- Archivos temporales: Expiración 48 horas

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha      | Versión | Cambios          | Autor   |
| ---------- | ------- | ---------------- | ------- |
| 2025-11-06 | 1.0     | Creación inicial | BA Team |

---

**Estado**: ✅ READY FOR DEVELOPMENT  
**Aprobado por**: [Pendiente]  
**Fecha de aprobación**: [Pendiente]
