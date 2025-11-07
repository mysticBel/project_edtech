# HU-001: Login Básico de Usuario

## 📋 METADATOS
- **ID**: HU-001
- **Épica**: Autenticación y Seguridad
- **Prioridad**: CRÍTICA
- **Estimación**: 5 Story Points
- **Sprint**: 1
- **Stakeholders**: Alumnos, Profesores, Administradores
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario
**¿Quién?** Usuarios de la plataforma (alumnos, profesores, administradores)  
**¿Qué?** Acceso seguro y rápido a la plataforma educativa  
**¿Por qué?** Para acceder a contenidos personalizados y funcionalidades según su rol

**Ambigüedades detectadas**: 
- ¿Se requiere autenticación multifactor?
- ¿Cuál es el tiempo máximo aceptable de inicio de sesión?
- ¿Hay diferentes flujos según el rol?

### Perspectiva Técnica
**Implementable**: ✅ Sí  
**Restricciones**:
- Debe cumplir con GDPR/LOPD para datos educativos
- Integración con sistemas de gestión académica existentes
- Soporte para SSO (Single Sign-On) institucional

### Perspectiva de Negocio
**Valor medible**:
- Reducción 40% en tickets de soporte por problemas de acceso
- Incremento 25% en tasa de adopción de la plataforma
- Disminución 60% en tiempo promedio de inicio de sesión

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** usuario de la plataforma educativa (alumno, profesor o administrador)  
**Quiero** iniciar sesión de forma rápida y segura con mi email/usuario y contraseña  
**Para** acceder a mis contenidos personalizados y herramientas en menos de 3 segundos

#### Criterios de Aceptación UX:
1. **DADO** que soy un usuario registrado  
   **CUANDO** ingreso mis credenciales correctas  
   **ENTONCES** accedo al dashboard en ≤3 segundos con mensaje de bienvenida personalizado

2. **DADO** que intento iniciar sesión  
   **CUANDO** ingreso credenciales incorrectas  
   **ENTONCES** veo mensaje de error claro sin revelar qué campo es incorrecto (seguridad)

3. **DADO** que olvidé mi contraseña  
   **CUANDO** hago clic en "Olvidé mi contraseña"  
   **ENTONCES** recibo un enlace de recuperación por email en ≤2 minutos

4. **DADO** que tengo habilitado "Recordarme"  
   **CUANDO** cierro y reabro el navegador en el mismo dispositivo  
   **ENTONCES** permanezco autenticado por 30 días

5. **DADO** que accedo desde un dispositivo móvil  
   **CUANDO** inicio sesión  
   **ENTONCES** la interfaz se adapta responsivamente con todos los elementos accesibles

**Accessibility**: WCAG 2.1 AA - Soporte para lectores de pantalla, contraste mínimo 4.5:1

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** usuario autenticado  
**Quiero** un sistema de login robusto con gestión de sesiones JWT  
**Para** garantizar seguridad y escalabilidad del sistema

#### Criterios de Aceptación Técnicos:
1. **DADO** que se implementa autenticación  
   **CUANDO** un usuario inicia sesión exitosamente  
   **ENTONCES** se genera un JWT con expiración de 8 horas y refresh token de 30 días

2. **DADO** que hay múltiples intentos fallidos  
   **CUANDO** se registran 5 intentos en 15 minutos  
   **ENTONCES** la cuenta se bloquea temporalmente por 30 minutos

3. **DADO** que se validan credenciales  
   **CUANDO** se recibe la solicitud  
   **ENTONCES** la contraseña se compara usando bcrypt con salt de 10 rounds (≤500ms)

4. **DADO** que hay sesiones activas  
   **CUANDO** el token expira  
   **ENTONCES** se refresca automáticamente usando refresh token sin interrumpir la UX

5. **DADO** que se audita seguridad  
   **CUANDO** ocurre cualquier evento de autenticación  
   **ENTONCES** se registra en logs con IP, timestamp, user-agent y resultado

**Constraints técnicos**: 
- Base de datos: PostgreSQL 14+ con índices en email/username
- Cache: Redis para gestión de sesiones y rate limiting
- API: RESTful con rate limit 100 req/min por IP

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** institución educativa  
**Quiero** un sistema de login que soporte SSO institucional y roles diferenciados  
**Para** maximizar adopción (>85%) y reducir costos de soporte en 40%

#### Criterios de Aceptación de Negocio:
1. **DADO** que la institución usa Google Workspace/Microsoft 365  
   **CUANDO** un usuario elige "Login con SSO"  
   **ENTONCES** se autentica usando OAuth2 sin crear contraseña adicional

2. **DADO** que un usuario inicia sesión  
   **CUANDO** la autenticación es exitosa  
   **ENTONCES** se redirige al dashboard específico de su rol (alumno/profesor/admin)

3. **DADO** que se miden métricas de adopción  
   **CUANDO** se implementa la funcionalidad  
   **ENTONCES** se trackean: logins exitosos, tiempo promedio, tasa de error, uso de SSO

4. **DADO** que hay problemas de acceso  
   **CUANDO** un usuario no puede iniciar sesión  
   **ENTONCES** se ofrece chat de soporte en vivo con respuesta ≤2 minutos

5. **DADO** que se busca ROI  
   **CUANDO** se comparan métricas pre/post implementación  
   **ENTONCES** se reduce en 40% tickets de "no puedo acceder" en los primeros 3 meses

**KPIs**:
- Tasa de adopción: >85% en primer mes
- NPS de experiencia de login: >8/10
- Costos de soporte: -40% en 90 días

---

## 🎯 VERSIÓN FINAL SINTETIZADA (Post-Evaluación)

**Matriz de Decisión**:
- Valor de negocio (30%): Versión C = 9/10
- Factibilidad técnica (25%): Versión B = 8/10
- Experiencia de usuario (25%): Versión A = 9/10
- Esfuerzo de implementación (20%): Versión B = 7/10
**Puntuación final**: 8.35/10

---

## 📝 HISTORIA REFINADA FINAL

**Como** usuario de la plataforma educativa (alumno de primaria 8-12 años, profesor o administrador)  
**Quiero** iniciar sesión de forma segura mediante email/contraseña o SSO institucional  
**Para** acceder a mi espacio personalizado en menos de 3 segundos y comenzar mis actividades educativas, reduciendo fricción de acceso en 60%

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Login Exitoso Estándar
**DADO** que soy un usuario registrado con email "alumno@escuela.edu" y contraseña válida  
**Y** accedo desde Chrome 120+ en desktop  
**CUANDO** ingreso mis credenciales correctas y presiono "Iniciar Sesión"  
**ENTONCES**:
- Se validan credenciales en ≤500ms
- Se genera JWT con expiración 8h
- Soy redirigido al dashboard según mi rol en ≤3 segundos
- Veo mensaje "¡Bienvenido/a de nuevo, [Nombre]!"
- Se registra el evento en audit log con timestamp, IP, dispositivo

### Escenario 2: Login Fallido con Rate Limiting
**DADO** que intento iniciar sesión con credenciales incorrectas  
**CUANDO** fallo 5 intentos en 15 minutos desde la misma IP  
**ENTONCES**:
- La cuenta se bloquea temporalmente por 30 minutos
- Veo mensaje: "Demasiados intentos. Por favor, intenta en 30 minutos o recupera tu contraseña"
- Se envía email de alerta de seguridad al usuario
- Se registra evento de seguridad con nivel "WARNING"

### Escenario 3: Login con SSO (Google Workspace)
**DADO** que mi institución tiene configurado Google Workspace SSO  
**Y** hago clic en "Iniciar sesión con Google"  
**CUANDO** completo la autenticación OAuth2 en Google  
**ENTONCES**:
- Se crea/actualiza el perfil con datos de Google (nombre, email, foto)
- Se asigna el rol automáticamente según dominio (@estudiantes.edu = alumno)
- Accedo al dashboard en ≤4 segundos
- No se requiere verificación de email adicional

### Escenario 4: Recuperación de Contraseña
**DADO** que olvidé mi contraseña  
**CUANDO** hago clic en "Olvidé mi contraseña" e ingreso mi email  
**ENTONCES**:
- Recibo email con enlace de recuperación en ≤2 minutos
- El enlace expira en 1 hora
- Puedo establecer nueva contraseña con requisitos: mín 8 caracteres, 1 mayúscula, 1 número
- Se invalidan todas las sesiones activas al cambiar contraseña

### Escenario 5: Casos Límite - Conexión Lenta
**DADO** que tengo conexión 3G (≤1 Mbps)  
**CUANDO** intento iniciar sesión  
**ENTONCES**:
- Veo indicador de carga claro ("Iniciando sesión...")
- La operación completa en ≤10 segundos o muestra timeout amigable
- Puedo reintentar sin perder datos ingresados

### Escenario 6: Persistencia de Sesión
**DADO** que marqué "Recordarme en este dispositivo"  
**CUANDO** cierro el navegador y lo reabro en 7 días  
**ENTONCES**:
- Permanezco autenticado automáticamente
- Se refresca el token JWT en background
- Si paso 30 días inactivo, se requiere reautenticación

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas
1. **Servicio de Autenticación**
   - JWT library (jsonwebtoken ^9.0.0)
   - Bcrypt para hashing (bcrypt ^5.1.0)
   - Passport.js para estrategias de auth

2. **Base de Datos**
   - Tabla `users` con campos: id, email, password_hash, role, created_at, last_login
   - Índices en: email (UNIQUE), username (UNIQUE), last_login

3. **Servicios de Terceros**
   - Google OAuth2 API para SSO
   - SendGrid/AWS SES para emails transaccionales
   - Redis para gestión de sesiones y rate limiting

4. **APIs Internas**
   - POST /api/v1/auth/login
   - POST /api/v1/auth/refresh
   - POST /api/v1/auth/logout
   - POST /api/v1/auth/forgot-password
   - POST /api/v1/auth/reset-password

### Dependencias de Negocio
1. **Pre-requisitos**
   - Contratos firmados con proveedores SSO (Google, Microsoft)
   - Política de privacidad y términos de servicio actualizados
   - Consentimiento de tratamiento de datos educativos (FERPA/GDPR)

2. **Procesos**
   - Flujo de onboarding de usuarios nuevos (HU-002)
   - Proceso de asignación automática de roles
   - Workflow de verificación de email institucional

### Dependencias de Datos
1. **Fuentes de Datos**
   - Sistema de gestión académica (SIS) para roles y permisos
   - Directorio LDAP/Active Directory institucional
   - Base de datos de usuarios legacy (si aplica migración)

2. **Transformaciones**
   - Normalización de emails (lowercase, trim)
   - Mapeo de roles externos a roles internos
   - Sincronización de datos de perfil desde SSO

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Alta Latencia en Autenticación SSO
**Descripción**: Proveedores SSO pueden tener latencia >5 segundos, afectando UX  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:
- Implementar timeout de 8 segundos con mensaje claro
- Ofrecer fallback a login tradicional
- Cachear respuestas de validación de tokens por 5 minutos
- Monitorear SLA de proveedores SSO (uptime >99.5%)

### Riesgo 2: Ataques de Fuerza Bruta
**Descripción**: Intentos masivos de login pueden comprometer cuentas  
**Probabilidad**: Alta | **Impacto**: Crítico  
**Mitigación**:
- Rate limiting: 5 intentos por IP cada 15 min, 10 intentos por cuenta cada hora
- Implementar CAPTCHA después de 3 intentos fallidos
- Bloqueo temporal escalonado: 30 min → 2h → 24h
- Alertas automáticas a SOC para patrones sospechosos
- Monitoreo con fail2ban o AWS WAF

### Riesgo 3: Pérdida de Sesión por Expiración de Token
**Descripción**: Usuarios pierden trabajo al expirar token durante uso activo  
**Probabilidad**: Media | **Impacto**: Medio  
**Mitigación**:
- Implementar refresh token automático en background
- Guardar estado de formularios en localStorage
- Mostrar advertencia 5 min antes de expiración
- Extender sesión automáticamente si hay actividad en últimos 30 min

### Riesgo 4: Problemas de Compatibilidad con Navegadores Legacy
**Descripción**: Escuelas con equipos antiguos (IE11, Chrome <80)  
**Probabilidad**: Baja | **Impacto**: Medio  
**Mitigación**:
- Polyfills para navegadores antiguos
- Detección de navegador con mensaje de actualización recomendada
- Versión simplificada de login para navegadores no soportados
- Documentación de requisitos mínimos del sistema

### Riesgo 5: GDPR/FERPA Compliance
**Descripción**: Incumplimiento de regulaciones de datos educativos  
**Probabilidad**: Baja | **Impacto**: Crítico  
**Mitigación**:
- Audit legal previo al lanzamiento
- Consentimiento explícito para menores de 16 años
- Derecho al olvido implementado (GDPR Art. 17)
- Cifrado end-to-end para credenciales
- Logs de acceso con retención de 2 años

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (5 Story Points = ~40 horas)
1. **Backend - Autenticación JWT** (8h)
   - Implementar endpoints de login/logout
   - Generación y validación de tokens
   - Rate limiting con Redis

2. **Backend - Integración SSO** (6h)
   - Configurar Google OAuth2
   - Mapeo de roles y permisos
   - Sincronización de datos de perfil

3. **Frontend - UI de Login** (6h)
   - Formulario responsive
   - Validación en cliente
   - Mensajes de error/éxito

4. **Seguridad** (5h)
   - Implementar bcrypt
   - CAPTCHA tras intentos fallidos
   - Logging de eventos de seguridad

5. **Recuperación de Contraseña** (4h)
   - Endpoint de forgot-password
   - Templates de email
   - Validación de tokens de recuperación

6. **Testing** (8h)
   - Unit tests (cobertura >80%)
   - Integration tests para flujos completos
   - Security testing (OWASP Top 10)

7. **Documentación** (3h)
   - API docs (OpenAPI/Swagger)
   - Manual de usuario
   - Runbook para ops

**Variación estimada**: ±15% (34-46 horas)

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**
  - ✅ Independent: No depende de otras HUs para funcionar
  - ✅ Negotiable: Se pueden ajustar detalles de implementación
  - ✅ Valuable: Valor claro para usuarios y negocio
  - ✅ Estimable: 5 SP con breakdown detallado
  - ✅ Small: Completable en 1 sprint
  - ✅ Testable: Criterios de aceptación claros y medibles

- [x] **Criterios de aceptación son testeables**
  - Todos tienen formato GIVEN/WHEN/THEN
  - Incluyen valores numéricos específicos (3 seg, 5 intentos, etc.)
  - Contemplan casos felices, errores y límite

- [x] **Dependencias están documentadas**
  - Técnicas: JWT, Redis, OAuth2, APIs
  - Negocio: Contratos, políticas, consentimientos
  - Datos: SIS, LDAP, perfiles

- [x] **Riesgos están identificados y mitigados**
  - 5 riesgos principales con probabilidad/impacto
  - Plan de mitigación específico para cada uno
  - Responsables asignables

- [x] **Estimación está dentro del rango esperado**
  - 5 SP = 40h ±15%
  - Breakdown detallado por tarea
  - Incluye testing y documentación

- [ ] **Stakeholders han validado la propuesta** (Pendiente de reunión)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas
- **Tiempo de respuesta login**: <500ms (p95)
- **Disponibilidad**: >99.9% uptime
- **Tasa de error**: <0.5% de intentos fallidos por bugs
- **Cobertura de tests**: >80%

### Métricas de Negocio
- **Tasa de adopción**: >85% de usuarios activos en 30 días
- **Reducción de tickets de soporte**: -40% en "problemas de acceso"
- **NPS de experiencia de login**: >8/10
- **Tasa de conversión SSO**: >60% de usuarios eligen SSO vs credenciales

### Métricas de Usuario
- **Tiempo promedio de login**: <3 segundos
- **Tasa de abandono en login**: <5%
- **Usuarios que marcan "Recordarme"**: >70%
- **Satisfacción de UX**: >4.2/5 en encuestas post-login

---

## 📝 NOTAS ADICIONALES

### Consideraciones de Accesibilidad (WCAG 2.1 AA)
- Labels asociados a inputs con `for`/`id`
- Navegación completa por teclado (Tab order lógico)
- Anuncios de lectores de pantalla para errores
- Contraste mínimo 4.5:1 en todos los textos
- Soporte para zoom hasta 200% sin pérdida de funcionalidad

### Internacionalización (i18n)
- Soporte inicial: Español, Inglés
- Mensajes de error localizados
- Formato de fecha/hora según locale
- Preparado para expansión a otros idiomas

### Monitoreo y Observabilidad
- **Logs**: ELK Stack o CloudWatch
- **Métricas**: Prometheus + Grafana
- **Alertas**: PagerDuty para incidentes críticos
- **Dashboards**: Tiempo de login, tasa de error, uso de SSO

### Deuda Técnica Identificada
- Migración futura a OAuth2 PKCE para mayor seguridad
- Implementar WebAuthn para login biométrico
- Añadir autenticación multifactor (MFA) opcional

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha | Versión | Cambios | Autor |
|-------|---------|---------|-------|
| 2025-11-06 | 1.0 | Creación inicial con análisis multi-perspectiva | BA Team |
| TBD | 1.1 | Incorporar feedback de stakeholders | TBD |

---

**Estado**: ✅ READY FOR DEVELOPMENT  
**Aprobado por**: [Pendiente]  
**Fecha de aprobación**: [Pendiente]
