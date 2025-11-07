# HU-002: Registro de Nuevo Usuario

## 📋 METADATOS
- **ID**: HU-002
- **Épica**: Autenticación y Seguridad
- **Prioridad**: ALTA
- **Estimación**: 5 Story Points
- **Sprint**: 1
- **Stakeholders**: Alumnos, Profesores, Administradores del Sistema
- **Fecha Creación**: 2025-11-06

---

## 🎯 ANÁLISIS INICIAL MULTI-PERSPECTIVA

### Perspectiva del Usuario
**¿Quién?** Nuevos usuarios (estudiantes de primaria 8-12 años, profesores, padres)  
**¿Qué?** Proceso de registro simple y guiado en <5 minutos  
**¿Por qué?** Para crear una cuenta y comenzar a usar la plataforma educativa

**Ambigüedades detectadas**:
- ¿Menores de edad requieren consentimiento parental?
- ¿El registro es autocompleto o requiere aprobación institucional?
- ¿Qué datos mínimos son necesarios vs opcionales?

### Perspectiva Técnica
**Implementable**: ✅ Sí  
**Restricciones**:
- Cumplimiento COPPA (Children's Online Privacy Protection Act) - todos los estudiantes son menores de 13 años (primaria 8-12 años)
- Validación de email institucional para profesores
- Prevención de bots con CAPTCHA
- Límite de registros: 100/hora por IP

### Perspectiva de Negocio
**Valor medible**:
- Incremento 50% en nuevos registros completados (vs abandono)
- Reducción 30% en tiempo de onboarding
- Validación 100% de emails para evitar cuentas fake

---

## 🔄 GENERACIÓN DE ALTERNATIVAS

### VERSIÓN A - ENFOQUE CENTRADO EN USUARIO (UX)

**Como** nuevo usuario de la plataforma educativa  
**Quiero** registrarme de forma rápida con información mínima (email, nombre, contraseña)  
**Para** empezar a explorar la plataforma en menos de 3 minutos sin fricciones

#### Criterios de Aceptación UX:
1. **DADO** que soy un nuevo usuario  
   **CUANDO** accedo a "Crear cuenta"  
   **ENTONCES** veo un formulario con solo 4 campos: nombre completo, email, contraseña, rol

2. **DADO** que completo el formulario  
   **CUANDO** ingreso contraseña débil  
   **ENTONCES** veo indicador visual de fortaleza con sugerencias en tiempo real

3. **DADO** que envío el formulario  
   **CUANDO** el registro es exitoso  
   **ENTONCES** veo mensaje de confirmación y recibo email de verificación en ≤1 minuto

4. **DADO** que tengo email no verificado  
   **CUANDO** intento iniciar sesión  
   **ENTONCES** accedo con funcionalidad limitada + banner "Verifica tu email"

5. **DADO** que uso dispositivo móvil  
   **CUANDO** registro mi cuenta  
   **ENTONCES** el formulario es responsive con teclado numérico para campos apropiados

---

### VERSIÓN B - ENFOQUE TÉCNICO EFICIENTE

**Como** sistema de autenticación  
**Quiero** un proceso de registro seguro con validaciones robustas  
**Para** prevenir cuentas fraudulentas y garantizar integridad de datos

#### Criterios de Aceptación Técnicos:
1. **DADO** que se envía formulario de registro  
   **CUANDO** se validan datos en backend  
   **ENTONCES** se verifica: email único, formato válido, contraseña ≥8 caracteres con complejidad

2. **DADO** que se detectan registros sospechosos  
   **CUANDO** hay >5 registros desde misma IP en 1 hora  
   **ENTONCES** se activa CAPTCHA obligatorio para siguientes intentos

3. **DADO** que se crea cuenta  
   **CUANDO** el proceso es exitoso  
   **ENTONCES** se genera token de verificación UUID v4 con expiración 24h

4. **DADO** que se requiere auditoría  
   **CUANDO** ocurre cualquier registro  
   **ENTONCES** se logea: IP, user-agent, timestamp, resultado, datos ingresados (excepto password)

5. **DADO** que todos los estudiantes son de primaria (8-12 años, menores de 13)  
   **CUANDO** se registra un estudiante  
   **ENTONCES** se requiere obligatoriamente email de tutor legal y consentimiento parental (COPPA compliance)

---

### VERSIÓN C - ENFOQUE DE VALOR DE NEGOCIO

**Como** institución educativa  
**Quiero** un proceso de registro que valide roles institucionales y maximice conversión  
**Para** tener 100% de usuarios verificados y reducir cuentas inactivas en 60%

#### Criterios de Aceptación de Negocio:
1. **DADO** que un profesor intenta registrarse  
   **CUANDO** ingresa email con dominio institucional (@escuela.edu)  
   **ENTONCES** se valida automáticamente contra directorio y asigna rol "Profesor"

2. **DADO** que se completa registro  
   **CUANDO** el usuario verifica email  
   **ENTONCES** se activa onboarding personalizado según rol con tour interactivo

3. **DADO** que se miden conversiones  
   **CUANDO** un usuario llega a página de registro  
   **ENTONCES** se trackea funnel: vista → inicio form → envío → verificación → primer login

4. **DADO** que hay abandono de registro  
   **CUANDO** un usuario deja el formulario incompleto  
   **ENTONCES** se guarda progreso y se envía email de recordatorio en 24h

5. **DADO** que se busca calidad de datos  
   **CUANDO** se completa registro  
   **ENTONCES** se enriquecen datos con info institucional (grado, sección, materia)

**KPIs**:
- Tasa de conversión registro: >70% (de inicio a verificación completa)
- Tiempo promedio de registro: <3 minutos
- Cuentas verificadas: 100% en primeras 48h o bloqueo temporal

---

## 🎯 VERSIÓN FINAL SINTETIZADA

**Matriz de Decisión**:
- Valor de negocio (30%): Versión C = 9/10
- Factibilidad técnica (25%): Versión B = 9/10
- Experiencia de usuario (25%): Versión A = 8/10
- Esfuerzo de implementación (20%): Versión A = 8/10
**Puntuación final**: 8.5/10

---

## 📝 HISTORIA REFINADA FINAL

**Como** nuevo usuario de la plataforma educativa (alumno de primaria 8-12 años, profesor o padre/tutor)  
**Quiero** registrarme en menos de 3 minutos proporcionando información básica y verificando mi email institucional  
**Para** acceder a contenidos personalizados según mi rol, con una tasa de conversión del 70% desde inicio hasta primer login

---

## ✅ CRITERIOS DE ACEPTACIÓN DETALLADOS (FINAL)

### Escenario 1: Registro Exitoso de Alumno
**DADO** que soy un estudiante nuevo sin cuenta  
**Y** accedo a la página de registro desde desktop Chrome 120+  
**CUANDO** completo el formulario con:
- Nombre completo: "María García López"
- Email: "maria.garcia@estudiantes.edu"
- Contraseña: "Segura2024!" (cumple requisitos)
- Rol: "Estudiante"
- Fecha de nacimiento: "15/03/2015" (10 años, primaria)  
**Y** marco checkbox "Acepto términos y condiciones" con enlace expandible  
**Y** completo CAPTCHA (si es el 6to registro desde mi IP)  
**Y** presiono "Crear cuenta"  
**ENTONCES**:
- Se valida email único en ≤200ms
- Se hashea contraseña con bcrypt (salt 10 rounds)
- Se crea registro en DB con estado "pending_verification"
- Se envía email de verificación con token a maria.garcia@estudiantes.edu en ≤1 min
- Veo mensaje: "¡Cuenta creada! Revisa tu email para verificarla"
- Soy redirigido a página de "Verifica tu email" con opción "Reenviar email"

### Escenario 2: Registro de Menor con Consentimiento Parental
**DADO** que soy un estudiante de 12 años  
**CUANDO** ingreso fecha de nacimiento "10/08/2013" (12 años)  
**ENTONCES**:
- Aparece campo adicional: "Email del padre/madre/tutor"
- Se envían 2 emails:
  1. Verificación a email del estudiante (acceso limitado hasta consentimiento)
  2. Solicitud de consentimiento a email del tutor con enlace único
- El estudiante NO puede acceder a funcionalidades completas hasta que tutor apruebe
- Tutor recibe email: "Autoriza la cuenta de [Nombre] en [Plataforma]"
- Tutor hace clic → Formulario de consentimiento (nombre tutor, relación, firma digital)
- Al aprobar → Se desbloquea cuenta del estudiante y ambos reciben confirmación

### Escenario 3: Registro de Profesor con Validación Institucional
**DADO** que soy un profesor nuevo  
**Y** mi escuela tiene integración con directorio institucional  
**CUANDO** registro con email "juan.perez@profesores.edu"  
**ENTONCES**:
- Se valida dominio contra lista blanca de instituciones aprobadas
- Se hace lookup en directorio LDAP/AD para verificar que juan.perez existe
- Se asigna rol automáticamente: "Profesor"
- Se precargan datos institucionales: materia, grado, sección (editable)
- Email de verificación incluye botón "Completar perfil docente"
- Al verificar → Redirige a wizard de setup con 3 pasos:
  1. Confirmar materias y grados
  2. Configurar preferencias de notificaciones
  3. Tour de herramientas para profesores

### Escenario 4: Detección y Prevención de Registros Masivos (Bot Protection)
**DADO** que hay actividad sospechosa desde IP 192.168.1.100  
**CUANDO** se detectan >5 registros en 1 hora desde esa IP  
**ENTONCES**:
- A partir del 6to intento, se activa reCAPTCHA v3 obligatorio
- Si score de CAPTCHA <0.5 → Se muestra reCAPTCHA v2 (checkbox "No soy un robot")
- Si continúa patrón sospechoso (>10 registros en 2h) → IP bloqueada temporalmente 4h
- Se envía alerta a equipo de seguridad con detalles: IP, intentos, user-agents
- Se logea evento con nivel "WARNING" en SIEM

### Escenario 5: Validación de Fortaleza de Contraseña en Tiempo Real
**DADO** que estoy llenando el formulario de registro  
**CUANDO** escribo en el campo "Contraseña"  
**ENTONCES**:
- Veo indicador visual de fortaleza (débil/media/fuerte) con colores:
  - Rojo: ≤7 caracteres o solo minúsculas/números
  - Amarillo: ≥8 caracteres + 1 mayúscula o 1 número
  - Verde: ≥8 caracteres + mayúsculas + números + símbolo
- Si escribo "password123" → Mensaje: "Contraseña muy común, elige una única"
- Si escribo parte de mi nombre/email → Mensaje: "No uses tu nombre en la contraseña"
- Requisitos visibles:
  - ✅/❌ Mínimo 8 caracteres
  - ✅/❌ Al menos 1 mayúscula
  - ✅/❌ Al menos 1 número
  - ✅/❌ Al menos 1 símbolo (!@#$%^&*)

### Escenario 6: Manejo de Email Ya Registrado
**DADO** que intento registrarme con email existente "maria@edu.com"  
**CUANDO** envío el formulario  
**ENTONCES**:
- Backend detecta email duplicado en ≤200ms
- Por seguridad, NO se revela si el email existe (prevención de enumeración)
- Mensaje genérico: "Si el email existe, recibirás un mensaje"
- Se envía email a maria@edu.com: "Alguien intentó crear cuenta con tu email"
- Email incluye:
  - "Si fuiste tú → [Recuperar contraseña]"
  - "Si no fuiste tú → [Reportar intento sospechoso]"
  - Detalles: IP, ubicación aproximada, timestamp

### Escenario 7: Casos Límite - Conexión Inestable
**DADO** que tengo conexión 3G intermitente  
**CUANDO** envío formulario de registro  
**Y** la conexión se pierde durante la petición  
**ENTONCES**:
- Veo indicador de carga "Creando tu cuenta..." con spinner
- Si timeout >10 segundos → Mensaje: "La conexión está lenta, reintentando..."
- Se implementa retry automático (max 3 intentos con exponential backoff)
- Si falla definitivamente → Mensaje: "No pudimos crear tu cuenta. Verifica tu conexión e intenta de nuevo"
- Los datos del formulario NO se pierden (guardados en localStorage)
- Al restaurar conexión → Puedo reenviar sin rellenar todo

---

## 🔗 DEPENDENCIAS IDENTIFICADAS

### Dependencias Técnicas
1. **Servicios de Validación**
   - Email validation API (AbstractAPI, ZeroBounce)
   - Password strength library (zxcvbn)
   - reCAPTCHA v3 API key de Google

2. **Base de Datos**
   - Tabla `users` con índice UNIQUE en email
   - Tabla `email_verifications` con tokens y expiración
   - Tabla `parental_consents` para menores

3. **Servicios de Email**
   - SendGrid/AWS SES para transaccionales
   - Templates: verificación, consentimiento parental, bienvenida

4. **APIs Internas**
   - POST /api/v1/auth/register
   - GET /api/v1/auth/verify-email/:token
   - POST /api/v1/auth/resend-verification
   - POST /api/v1/auth/parental-consent

### Dependencias de Negocio
1. **Pre-requisitos**
   - Términos y condiciones actualizados (legal review)
   - Política de privacidad GDPR/FERPA compliant
   - Proceso de consentimiento parental definido (COPPA)

2. **Procesos**
   - Workflow de aprobación institucional para profesores (si aplica)
   - Integración con SIS para validación de roles
   - Proceso de onboarding post-registro (HU-003)

### Dependencias de Datos
1. **Fuentes de Datos**
   - Directorio institucional (LDAP/AD) para validación de profesores
   - Lista blanca de dominios educativos permitidos
   - Base de contraseñas comprometidas (Have I Been Pwned API)

2. **Transformaciones**
   - Normalización de emails (lowercase, trim)
   - Mapeo de dominios institucionales a roles
   - Enriquecimiento de perfil con datos institucionales

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: Alta Tasa de Abandono en Proceso de Registro
**Descripción**: Usuarios abandonan formulario por complejidad o campos excesivos  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:
- Formulario con solo 4-5 campos en primera etapa (progressive disclosure)
- Autoguardado de progreso cada 30 segundos en localStorage
- Email de recordatorio si abandona en paso 2/3
- A/B testing de longitud de formulario
- Heatmaps y session recordings para identificar puntos de fricción
- Meta: tasa de abandono <30%

### Riesgo 2: Cuentas Fake por Falta de Verificación
**Descripción**: Usuarios crean múltiples cuentas sin verificar emails  
**Probabilidad**: Alta | **Impacto**: Medio  
**Mitigación**:
- Email verification obligatoria en 48h o suspensión temporal
- reCAPTCHA adaptativo según score de confianza
- Rate limiting: max 3 registros por IP/día
- Detección de emails temporales (temp-mail.org, etc.) y bloqueo
- Limpieza automática de cuentas no verificadas >7 días
- Métricas: >95% de verificación en 48h

### Riesgo 3: Problemas de Deliverability de Emails de Verificación
**Descripción**: Emails van a spam o no llegan por problemas de reputación de dominio  
**Probabilidad**: Media | **Impacto**: Alto  
**Mitigación**:
- Configurar SPF, DKIM, DMARC correctamente
- Usar dominio dedicado para transaccionales (no-reply@plataforma.edu)
- Warmup de IP con gradual ramp-up de volumen
- Monitoreo de deliverability con SendGrid Analytics
- Opción "No recibí el email" con troubleshooting:
  1. Revisar carpeta spam
  2. Reenviar a email alternativo
  3. Contactar soporte (webhook a Intercom/Zendesk)
- Meta: >98% deliverability rate

### Riesgo 4: Incumplimiento COPPA/GDPR para Menores
**Descripción**: Registro de menores sin consentimiento parental apropiado  
**Probabilidad**: Media | **Impacto**: Crítico  
**Mitigación**:
- Validación obligatoria de fecha de nacimiento
- Consentimiento parental obligatorio para todos los estudiantes (8-12 años, todos <13 por COPPA)
- Documentación legal guardada por 3 años
- Auditoría trimestral de cumplimiento con legal
- Capacitación de equipo en regulaciones educativas
- Contacto con abogado especializado en EdTech
- Seguro de responsabilidad civil

### Riesgo 5: Compromiso de Contraseñas Débiles
**Descripción**: Usuarios eligen contraseñas fáciles de adivinar  
**Probabilidad**: Alta | **Impacto**: Alto  
**Mitigación**:
- Validación contra lista de 100K contraseñas más comunes
- Integración con Have I Been Pwned API para contraseñas comprometidas
- Requisitos mínimos: 8 caracteres, mayúsculas, números, símbolos
- Indicador visual de fortaleza en tiempo real
- Sugerencia de password manager (LastPass, 1Password)
- Bloqueo de contraseñas que incluyan nombre/email del usuario
- Re-validación cada 90 días para cuentas de profesores

---

## 📊 ESTIMACIÓN Y ESFUERZO

### Breakdown de Tareas (5 Story Points = ~40 horas)

1. **Backend - Endpoint de Registro** (6h)
   - POST /api/v1/auth/register con validaciones
   - Generación de token de verificación
   - Integración con email service

2. **Backend - Validaciones de Seguridad** (5h)
   - Rate limiting con Redis
   - reCAPTCHA integration
   - Password strength validation
   - Email uniqueness check

3. **Backend - Consentimiento Parental** (5h)
   - Flujo obligatorio para todos los estudiantes (primaria 8-12 años)
   - Tabla parental_consents
   - Emails a tutores
   - Workflow de aprobación

4. **Frontend - Formulario de Registro** (7h)
   - UI responsive con validación en tiempo real
   - Password strength indicator
   - Manejo de estados: loading, error, success
   - Progressive disclosure para campos opcionales

5. **Frontend - Verificación de Email** (3h)
   - Página "Verifica tu email"
   - Endpoint de verificación con token
   - Opción "Reenviar email"

6. **Integración con Directorio Institucional** (4h)
   - LDAP/AD lookup para profesores
   - Mapeo de roles automático
   - Fallback si directorio no responde

7. **Testing** (7h)
   - Unit tests (cobertura >80%)
   - Integration tests de flujo completo
   - Security testing (SQL injection, XSS)
   - E2E tests con Playwright

8. **Documentación** (3h)
   - API docs
   - User guide de registro
   - Legal compliance checklist

**Variación estimada**: ±20% (32-48 horas)

---

## 🎯 VALIDATION CHECKLIST

- [x] **Historia cumple criterios INVEST**
  - ✅ Independent: Funciona independiente de HU-001
  - ✅ Negotiable: Consentimiento parental puede ajustarse según jurisdicción
  - ✅ Valuable: Incremente registros 50%, reduce abandono 30%
  - ✅ Estimable: 5 SP con breakdown de 40h
  - ✅ Small: Completable en 1 sprint
  - ✅ Testable: 7 escenarios con métricas específicas

- [x] **Criterios de aceptación son testeables**
  - Formato GIVEN/WHEN/THEN en todos los escenarios
  - Valores numéricos: <3 min, 70% conversión, ≤200ms validación
  - Casos límite: conexión lenta, emails duplicados, bots

- [x] **Dependencias están documentadas**
  - Técnicas: reCAPTCHA, email service, LDAP
  - Negocio: términos legales, consentimiento parental
  - Datos: directorio institucional, lista de contraseñas comprometidas

- [x] **Riesgos están identificados y mitigados**
  - 5 riesgos con probabilidad/impacto
  - Mitigaciones específicas y métricas de éxito

- [x] **Estimación está dentro del rango esperado**
  - 5 SP = 40h ±20%
  - Incluye consentimiento parental (complejidad extra)

- [ ] **Stakeholders han validado la propuesta** (Pendiente: Legal, Producto)

---

## 📈 MÉTRICAS DE ÉXITO POST-IMPLEMENTACIÓN

### Métricas Técnicas
- **Tiempo de registro**: <3 minutos (p50), <5 minutos (p95)
- **Deliverability de emails**: >98%
- **Tasa de error en registro**: <2%
- **Cobertura de tests**: >80%

### Métricas de Negocio
- **Tasa de conversión**: >70% (de inicio formulario a email verificado)
- **Cuentas verificadas en 48h**: >95%
- **Abandono de formulario**: <30%
- **Cuentas fake detectadas y bloqueadas**: >90%

### Métricas de Usuario
- **NPS del proceso de registro**: >7/10
- **Usuarios que completan perfil post-registro**: >60%
- **Tiempo promedio hasta primer login**: <10 minutos desde registro

### Métricas de Seguridad
- **Cuentas con contraseñas fuertes**: >85%
- **Intentos de registro bloqueados por bot detection**: Tracking mensual
- **Incidentes de seguridad por registro**: 0 en primeros 3 meses

---

## 📝 NOTAS ADICIONALES

### Consideraciones de Accesibilidad
- Formulario navegable 100% por teclado
- Errores de validación anunciados por lectores de pantalla
- Labels descriptivos con `aria-label` donde sea necesario
- Contraste mínimo 4.5:1

### Consideraciones Legales
- **COPPA (USA)**: Consentimiento parental obligatorio para todos los estudiantes (todos <13 años, primaria 8-12)
- **GDPR (EU)**: Consentimiento explícito para menores (todos los estudiantes <16 años)
- **FERPA (USA)**: Protección de datos educativos
- **LOPD (España)**: Adaptaciones según legislación local

### Integraciones Futuras
- Registro con Google/Microsoft SSO (Sprint 2)
- Verificación biométrica para menores (Fase 2)
- Integración con sistemas antiplagio (futuro)

---

## 🔄 HISTORIAL DE CAMBIOS

| Fecha | Versión | Cambios | Autor |
|-------|---------|---------|-------|
| 2025-11-06 | 1.0 | Creación inicial | BA Team |

---

**Estado**: ✅ READY FOR LEGAL REVIEW  
**Aprobado por**: [Pendiente]  
**Fecha de aprobación**: [Pendiente]
