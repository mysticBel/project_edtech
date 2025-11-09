# Índice General de Evidencias Técnicas

## 📚 Documentación del Proyecto EdTech

Este directorio contiene toda la documentación técnica, diagramas, arquitecturas y especificaciones del sistema educativo adaptativo para alumnos de primaria (8-12 años).

---

## 📂 Estructura de Documentación

### 🔐 Autenticación y Seguridad

1. **[arquitectura-login.md](./arquitectura-login.md)**

   - Stack tecnológico completo
   - Modelo de datos (usuarios, sesiones, OAuth)
   - Flujos de autenticación (email, OAuth, 2FA)
   - Implementación de seguridad (JWT, bcrypt, rate limiting)
   - Cumplimiento COPPA para menores de 13 años

2. **[diagramas-login.md](./diagramas-login.md)**

   - Diagrama de flujo: Login email/password
   - Diagrama de secuencia: OAuth (Google/Microsoft)
   - Diagrama de flujo: Verificación 2FA
   - Diagrama de flujo: Manejo de sesiones
   - Diagrama de secuencia: Consentimiento parental COPPA
   - Diagrama de flujo: Bloqueo por intentos fallidos

3. **[seguridad-login.md](./seguridad-login.md)**
   - Amenazas y contramedidas
   - Best practices OWASP
   - Auditoría y compliance

### 👤 Registro y Onboarding

4. **[arquitectura-registro.md](./arquitectura-registro.md)**

   - Flujos de registro por tipo de usuario
   - Validación de emails
   - Sistema anti-bots
   - Integración con sistema de emails

5. **[proceso-coppa.md](./proceso-coppa.md)**
   - Requisitos legales COPPA
   - Flujo detallado de consentimiento parental
   - Templates de emails
   - Almacenamiento de evidencias

### 📝 Evaluación Inicial

6. **[arquitectura-encuesta.md](./arquitectura-encuesta.md)**

   - Sistema de preguntas adaptativas
   - Banco de preguntas por materia
   - Algoritmo de clasificación de nivel

7. **[algoritmo-evaluacion-nivel.md](./algoritmo-evaluacion-nivel.md)**
   - Teoría de Respuesta al Ítem (IRT)
   - Cálculo de nivel: Básico, Intermedio, Avanzado
   - Ajuste de dificultad en tiempo real

### 🎯 Aprendizaje Adaptativo

8. **[arquitectura-rutas-adaptativas.md](./arquitectura-rutas-adaptativas.md)**

   - Grafo de conocimientos (Neo4j)
   - Motor de recomendaciones
   - Sistema de desbloqueo de contenidos

9. **[algoritmo-adaptacion-dificultad.md](./algoritmo-adaptacion-dificultad.md)**

   - Knowledge Tracing
   - Zona de Desarrollo Próximo (ZPD)
   - Ajuste dinámico de dificultad

10. **[grafo-conocimientos.md](./grafo-conocimientos.md)**
    - Estructura de nodos y relaciones
    - Dependencias entre conceptos
    - Rutas de aprendizaje óptimas

### 💬 Retroalimentación Inteligente

11. **[arquitectura-feedback.md](./arquitectura-feedback.md)**

    - Integración con GPT-4
    - Sistema de pistas progresivas
    - Clasificación automática de errores

12. **[algoritmo-deteccion-errores.md](./algoritmo-deteccion-errores.md)**

    - Taxonomía de errores matemáticos
    - Patrones de error comunes
    - Estrategias de remediación

13. **[chatbot-tutor-virtual.md](./chatbot-tutor-virtual.md)**
    - Arquitectura del chatbot
    - Prompts para GPT-4
    - Filtros de seguridad (Perspective API)

### 📊 Dashboards y Reportes

14. **[arquitectura-dashboard-profesores.md](./arquitectura-dashboard-profesores.md)**

    - Métricas en tiempo real
    - Sistema de alertas predictivas
    - Herramientas de intervención

15. **[algoritmo-alertas-predictivas.md](./algoritmo-alertas-predictivas.md)**

    - Random Forest para predicción de churn
    - Detección de alumnos en riesgo
    - Triggers de notificación

16. **[arquitectura-dashboard-ejecutivo.md](./arquitectura-dashboard-ejecutivo.md)**

    - KPIs institucionales
    - Data warehouse y ETL
    - Sistema de benchmarking

17. **[formula-calculo-roi.md](./formula-calculo-roi.md)**
    - Metodología de cálculo de ROI
    - Factores de valor generado
    - Validación con CFO

### 📤 Exportación y Reportes

18. **[arquitectura-exportacion.md](./arquitectura-exportacion.md)**

    - Generación de archivos Excel/CSV/JSON/PDF
    - Procesamiento asíncrono para grandes volúmenes
    - Sistema de reportes programados

19. **[proceso-anonimizacion.md](./proceso-anonimizacion.md)**
    - Técnicas de anonimización
    - Cumplimiento GDPR/FERPA
    - Auditoría de exportaciones

---

## 🏗️ Arquitectura Global del Sistema

```
┌────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   React     │  │  Dashboard  │  │   Mobile    │        │
│  │   Web App   │  │  Profesores │  │  App (PWA)  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                      CAPA DE API REST                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Node.js + Express.js + TypeScript          │  │
│  │  - Authentication Service                            │  │
│  │  - User Management Service                           │  │
│  │  - Learning Path Service                             │  │
│  │  - Feedback Service (GPT-4)                          │  │
│  │  - Analytics Service                                 │  │
│  │  - Export Service                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┬────────────────┐
            ▼               ▼               ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │    Redis     │  │    Neo4j     │  │   OpenAI     │
│  (Usuarios,  │  │  (Sesiones,  │  │   (Grafo de  │  │   GPT-4 API  │
│  Actividades)│  │   Cache)     │  │ Conocimiento)│  │  (Feedback)  │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🛠️ Stack Tecnológico Completo

### Backend

- **Runtime**: Node.js 18+ LTS
- **Lenguaje**: TypeScript 5+
- **Framework**: Express.js 4.x
- **ORM**: Sequelize / TypeORM
- **Validación**: Joi / Zod
- **Testing**: Jest + Supertest

### Frontend

- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts / Chart.js
- **HTTP**: Axios

### Bases de Datos

- **Relacional**: PostgreSQL 14+
- **Cache**: Redis 7+
- **Grafo**: Neo4j 5+

### Inteligencia Artificial

- **LLM**: OpenAI GPT-4
- **ML Models**:
  - Scikit-learn (Python): Random Forest, LSTM
  - TensorFlow.js (opcional para frontend)

### Infraestructura

- **Containerización**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud**: AWS / Azure (recomendado)
- **Monitoring**: Prometheus + Grafana
- **Logs**: Winston + ELK Stack

### Seguridad

- **Autenticación**: JWT + OAuth 2.0
- **Hashing**: bcrypt
- **Rate Limiting**: express-rate-limit
- **CORS**: cors middleware
- **Helmet**: Helmet.js

---

## 📊 Métricas Clave del Sistema

### Performance

- Tiempo de carga de página: <2 segundos
- Tiempo de respuesta API: <500ms (p95)
- Tiempo de generación de feedback: <3 segundos
- Throughput: 1,000 requests/segundo

### Escalabilidad

- Usuarios concurrentes: 10,000+
- Alumnos por institución: hasta 100,000
- Actividades por segundo: 500+

### Disponibilidad

- Uptime: 99.9%
- Recovery Time Objective (RTO): <1 hora
- Recovery Point Objective (RPO): <15 minutos

---

## 🔒 Cumplimiento Normativo

### COPPA (Children's Online Privacy Protection Act)

- ✅ Consentimiento parental verificable para <13 años
- ✅ Minimización de datos recolectados
- ✅ No venta de datos de menores
- ✅ Derecho de los padres a revisar/eliminar datos

### GDPR (General Data Protection Regulation)

- ✅ Derecho al olvido
- ✅ Portabilidad de datos
- ✅ Consentimiento explícito
- ✅ Notificación de brechas de seguridad

### FERPA (Family Educational Rights and Privacy Act)

- ✅ Protección de registros educativos
- ✅ Acceso controlado solo a personal autorizado
- ✅ Consentimiento para compartir información

---

## 📚 Referencias Académicas

### Teorías Educativas

- Vygotsky, L. (1978). _Mind in Society: Development of Higher Psychological Processes_
- Bloom, B. S. (1956). _Taxonomy of Educational Objectives_
- Bruner, J. (1966). _Toward a Theory of Instruction_

### Machine Learning en Educación

- Corbett, A. T., & Anderson, J. R. (1995). _Knowledge Tracing: Modeling the Acquisition of Procedural Knowledge_
- Piech, C., et al. (2015). _Deep Knowledge Tracing_

### Learning Analytics

- Ferguson, R. (2012). _Learning Analytics: Drivers, Developments and Challenges_
- Siemens, G., & Long, P. (2011). _Penetrating the Fog: Analytics in Learning and Education_

---

## 📞 Contacto del Equipo Técnico

Para dudas o aclaraciones sobre esta documentación:

- **Arquitectura**: arquitectura@edtech.com
- **Seguridad**: security@edtech.com
- **Soporte**: support@edtech.com

---

**Versión del Documento**: 1.0  
**Última actualización**: 09/11/2025  
**Próxima revisión**: 09/02/2026
