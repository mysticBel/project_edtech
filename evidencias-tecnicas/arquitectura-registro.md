# Arquitectura Técnica - Sistema de Registro de Usuarios

## 📋 Referencia

**Historia de Usuario**: HU-002 - Registro de Nuevos Usuarios

---

## 🏗️ Arquitectura General

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Registro Form│  │  Verificación│  │ Consentimiento│      │
│  │  Multi-Step  │  │    Email     │  │   Parental    │      │
│  │   (React)    │  │   (React)    │  │   (React)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE API (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Registration Service                         │   │
│  │  - POST /api/v1/register/teacher                     │   │
│  │  - POST /api/v1/register/student                     │   │
│  │  - POST /api/v1/register/parent                      │   │
│  │  - GET  /api/v1/verify-email/:token                  │   │
│  │  - POST /api/v1/parental-consent/:token              │   │
│  │  - POST /api/v1/register/resend-verification         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┬──────────────┐
            ▼               ▼               ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐
│  PostgreSQL  │  │    Redis     │  │    Email     │  │reCAPTCHA│
│  (Usuarios)  │  │(Tokens temp) │  │   Service    │  │  API   │
└──────────────┘  └──────────────┘  └──────────────┘  └────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Lenguaje**: Node.js 18+ con TypeScript
- **Framework**: Express.js 4.x
- **Validación**: Joi o Zod
- **Email**: Nodemailer + SendGrid/AWS SES
- **Anti-bot**: Google reCAPTCHA v3

### Base de Datos

- **Principal**: PostgreSQL 14+
- **Cache/Tokens**: Redis 7+

### Frontend

- **Framework**: React 18+
- **Forms**: Formik + Yup
- **Stepper**: Material-UI Stepper

---

## 🗄️ Modelo de Datos

### Tabla: `users` (ya definida en HU-001)

```sql
-- Ver arquitectura-login.md para definición completa
```

### Tabla: `user_profiles` (ya definida en HU-001)

```sql
-- Ver arquitectura-login.md para definición completa
```

### Tabla: `email_verifications`

```sql
CREATE TABLE email_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email_verifications_token ON email_verifications(token);
CREATE INDEX idx_email_verifications_expires ON email_verifications(expires_at);
```

### Tabla: `parental_consents`

```sql
CREATE TABLE parental_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_email VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    consent_given BOOLEAN DEFAULT FALSE,
    consent_date TIMESTAMP NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_parental_consents_token ON parental_consents(token);
CREATE INDEX idx_parental_consents_student ON parental_consents(student_user_id);
```

### Tabla: `registration_attempts`

```sql
CREATE TABLE registration_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    recaptcha_score FLOAT,
    success BOOLEAN NOT NULL,
    error_reason VARCHAR(100),
    attempted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_registration_attempts_ip ON registration_attempts(ip_address, attempted_at);
CREATE INDEX idx_registration_attempts_email ON registration_attempts(email);
```

### Redis Keys para Tokens Temporales

```
# Token de verificación de email
KEY: email_verification:{token}
VALUE: {
    userId: UUID,
    email: string,
    createdAt: timestamp
}
TTL: 86400 segundos (24 horas)

# Token de consentimiento parental
KEY: parental_consent:{token}
VALUE: {
    studentUserId: UUID,
    parentEmail: string,
    studentName: string,
    createdAt: timestamp
}
TTL: 604800 segundos (7 días)

# Rate limiting por IP
KEY: register_attempts:{ip}
VALUE: number (contador)
TTL: 3600 segundos (1 hora)
```

---

## 🔄 Flujos de Registro

### 1. Registro de Profesor

```
Profesor → [POST /api/v1/register/teacher]
          {firstName, lastName, email, password, institution}
                    │
                    ▼
         Validar datos de entrada
         (email válido, password fuerte)
                    │
                    ▼
         ¿Email ya registrado?
                    │
            ┌───────┴───────┐
            │ SÍ            │ NO
            ▼               ▼
    Respuesta 409    Verificar reCAPTCHA
    "Email ya           (score > 0.5)
     existe"                 │
                     ┌───────┴───────┐
                     │ Score bajo    │ Score alto
                     ▼               ▼
               Respuesta 429    Hash password
               "Actividad       (bcrypt factor 12)
               sospechosa"           │
                                     ▼
                              Crear user + profile
                              (role='teacher')
                                     │
                                     ▼
                              Generar token único
                              (crypto.randomBytes(32))
                                     │
                                     ▼
                              Guardar en email_verifications
                              + Redis (TTL 24h)
                                     │
                                     ▼
                              Enviar email de verificación
                              con link: /verify-email?token=ABC123
                                     │
                                     ▼
                              Respuesta 201
                              {message: "Revisa tu email para activar tu cuenta"}

Profesor recibe email → Click en link
                              │
                              ▼
                        [GET /verify-email/:token]
                              │
                              ▼
                        ¿Token válido y no expirado?
                              │
                      ┌───────┴───────┐
                      │ NO            │ SÍ
                      ▼               ▼
              Respuesta 400    UPDATE users SET
              "Link inválido   is_email_verified=true
               o expirado"          │
                                    ▼
                              DELETE token de Redis
                              y DB
                                    │
                                    ▼
                              Respuesta 200
                              "Email verificado. Ya puedes iniciar sesión"
```

### 2. Registro de Alumno (8-12 años) - COPPA Compliance

```
Alumno → [POST /api/v1/register/student]
         {firstName, lastName, dateOfBirth, grade, parentEmail, password}
                    │
                    ▼
         Validar datos de entrada
                    │
                    ▼
         Calcular edad desde dateOfBirth
                    │
                    ▼
         ¿Edad < 13 años?
                    │
            ┌───────┴───────┐
            │ NO            │ SÍ (8-12 años)
            ▼               ▼
    Flujo normal     OBLIGATORIO: Consentimiento parental
    (sin parental           │
     consent)               ▼
                     Validar email del padre
                     (diferente al del alumno)
                            │
                            ▼
                     ¿Email padre válido?
                            │
                    ┌───────┴───────┐
                    │ NO            │ SÍ
                    ▼               ▼
            Respuesta 400    Hash password alumno
            "Email padre          │
             requerido"           ▼
                            Crear user + profile
                            (role='student',
                             parental_consent_given=FALSE)
                                  │
                                  ▼
                            Generar token único para
                            consentimiento parental
                                  │
                                  ▼
                            Guardar en parental_consents
                            (expires_at = NOW + 7 días)
                                  │
                                  ▼
                            Enviar EMAIL AL PADRE:
                            "Tu hijo/a quiere registrarse.
                             Click para autorizar"
                                  │
                                  ▼
                            Respuesta 201
                            {message: "Esperando autorización
                                       de tu papá o mamá"}

Padre recibe email → Click en "Autorizo"
                            │
                            ▼
                [GET /parental-consent/:token]
                            │
                            ▼
                Mostrar página con información:
                - Nombre del hijo/a
                - Edad
                - Qué datos se recolectarán
                - Política de privacidad
                            │
                            ▼
                Padre hace click en "Sí, autorizo"
                            │
                            ▼
        [POST /api/v1/parental-consent/:token]
        {consent: true}
                            │
                            ▼
                ¿Token válido y no expirado?
                            │
                    ┌───────┴───────┐
                    │ NO            │ SÍ
                    ▼               ▼
            Respuesta 400    UPDATE parental_consents
            "Link expirado"  SET consent_given=true,
                             consent_date=NOW,
                             ip_address=req.ip
                                  │
                                  ▼
                            UPDATE user_profiles
                            SET parental_consent_given=true,
                            parental_consent_date=NOW
                                  │
                                  ▼
                            Enviar EMAIL AL ALUMNO:
                            "Tu cuenta está activada.
                             Ya puedes iniciar sesión"
                                  │
                                  ▼
                            Respuesta 200
                            "Autorización registrada.
                             El alumno puede acceder"
```

### 3. Registro de Padre/Tutor

```
Padre → [POST /api/v1/register/parent]
        {firstName, lastName, email, phone, password}
                    │
                    ▼
         Validar datos de entrada
                    │
                    ▼
         ¿Email ya registrado?
                    │
            ┌───────┴───────┐
            │ SÍ            │ NO
            ▼               ▼
    Respuesta 409    Hash password
    "Email existe         │
     como padre"          ▼
                    Crear user + profile
                    (role='parent')
                          │
                          ▼
                    Generar token verificación
                          │
                          ▼
                    Enviar email verificación
                          │
                          ▼
                    Respuesta 201
                    {message: "Revisa tu email"}

Padre verifica email (flujo similar a profesor)
                          │
                          ▼
                    Puede vincular hijos mediante
                    código único del alumno
```

---

## 🔒 Seguridad y Validaciones

### 1. Validación de Email

```javascript
const emailSchema = Joi.string()
  .email({ minDomainSegments: 2 })
  .max(255)
  .lowercase()
  .required()
  .messages({
    "string.email": "El email no es válido",
    "any.required": "El email es obligatorio",
  });

// Verificar dominio institucional para profesores
function validateInstitutionalEmail(email) {
  const institutionalDomains = [
    "@inst.edu",
    "@universidad.edu",
    "@colegio.edu",
  ];

  return institutionalDomains.some((domain) => email.endsWith(domain));
}
```

### 2. Validación de Contraseña

```javascript
const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .required()
  .messages({
    "string.min": "La contraseña debe tener mínimo 8 caracteres",
    "string.pattern.base": "Debe incluir mayúsculas, minúsculas y números",
  });

// Fuerza de contraseña
function calculatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // 0-2: débil, 3: media, 4-5: fuerte
  return {
    score,
    strength: score <= 2 ? "weak" : score === 3 ? "medium" : "strong",
  };
}
```

### 3. reCAPTCHA v3

```javascript
async function verifyRecaptcha(token, action) {
  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }
  );

  const { success, score, action: returnedAction } = response.data;

  // Score: 0.0 (bot) a 1.0 (humano)
  if (!success || score < 0.5) {
    throw new Error("Actividad sospechosa detectada");
  }

  if (returnedAction !== action) {
    throw new Error("Acción no coincide");
  }

  return { success: true, score };
}
```

### 4. Rate Limiting por IP

```javascript
// Máximo 5 registros por hora desde la misma IP
async function checkRegistrationRateLimit(ip) {
  const key = `register_attempts:${ip}`;
  const attempts = await redis.get(key);

  if (attempts && parseInt(attempts) >= 5) {
    throw new Error("Demasiados intentos de registro");
  }

  await redis.incr(key);
  await redis.expire(key, 3600); // 1 hora
}
```

### 5. Cálculo de Edad (COPPA)

```javascript
function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Middleware
async function requireParentalConsentForMinors(req, res, next) {
  const { dateOfBirth } = req.body;
  const age = calculateAge(dateOfBirth);

  if (age < 13) {
    // Obligatorio: email del padre
    if (!req.body.parentEmail) {
      return res.status(400).json({
        error: "PARENT_EMAIL_REQUIRED",
        message: "Los menores de 13 años requieren email del padre/tutor",
      });
    }

    req.requiresParentalConsent = true;
  }

  next();
}
```

---

## 📧 Templates de Email

### Email de Verificación (Profesor/Padre)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verifica tu email - EdTech Platform</title>
  </head>
  <body
    style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"
  >
    <div
      style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;"
    >
      <h1>¡Bienvenido a EdTech!</h1>
    </div>

    <div style="padding: 20px;">
      <p>Hola <strong>{{firstName}}</strong>,</p>

      <p>
        Gracias por registrarte. Para activar tu cuenta, haz clic en el botón de
        abajo:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{verificationLink}}"
          style="background-color: #4CAF50; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;"
        >
          Verificar mi email
        </a>
      </div>

      <p>Este link expira en <strong>24 horas</strong>.</p>

      <p>Si no te registraste, ignora este email.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 12px; color: #666;">
        © 2025 EdTech Platform. Todos los derechos reservados.
      </p>
    </div>
  </body>
</html>
```

### Email de Consentimiento Parental (COPPA)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Autorización de Registro - EdTech Platform</title>
  </head>
  <body
    style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"
  >
    <div
      style="background-color: #FF9800; color: white; padding: 20px; text-align: center;"
    >
      <h1>⚠️ Autorización Requerida</h1>
    </div>

    <div style="padding: 20px;">
      <p>Estimado padre/tutor,</p>

      <p>
        Su hijo/a <strong>{{studentName}}</strong> ({{age}} años) desea
        registrarse en nuestra plataforma educativa.
      </p>

      <div
        style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;"
      >
        <h3>¿Qué datos recolectaremos?</h3>
        <ul>
          <li>Nombre completo</li>
          <li>Edad y grado escolar</li>
          <li>Progreso educativo y calificaciones</li>
          <li>Actividades completadas en la plataforma</li>
        </ul>

        <p>
          <strong>NO recolectamos:</strong> Dirección física, número de teléfono
          del menor, información financiera.
        </p>
      </div>

      <div
        style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;"
      >
        <h3>📋 Cumplimiento COPPA</h3>
        <p>
          Cumplimos con la Children's Online Privacy Protection Act (COPPA) de
          EE.UU. Los datos de su hijo/a están protegidos y nunca se venderán a
          terceros.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{consentLink}}"
          style="background-color: #4CAF50; color: white; padding: 15px 40px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;
                      font-weight: bold;"
        >
          ✅ SÍ, AUTORIZO EL REGISTRO
        </a>
      </div>

      <p style="text-align: center; margin: 20px 0;">
        <a href="{{denyLink}}" style="color: #666; text-decoration: none;">
          ❌ No autorizo (cancelar registro)
        </a>
      </p>

      <p style="font-size: 12px; color: #666;">
        Este link expira en <strong>7 días</strong>. Si no autorizas, la cuenta
        será eliminada automáticamente.
      </p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 11px; color: #888;">
        <a href="{{privacyPolicyLink}}">Política de Privacidad</a> |
        <a href="{{termsLink}}">Términos de Servicio</a> |
        <a href="{{coppaLink}}">Información COPPA</a>
      </p>
    </div>
  </body>
</html>
```

---

## 🧪 Testing

### Unit Tests

```javascript
describe("Registration Service", () => {
  describe("Teacher Registration", () => {
    it("should register a teacher with valid data", async () => {
      const teacherData = {
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@inst.edu",
        password: "SecurePass123",
      };

      const result = await registerTeacher(teacherData);
      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
    });

    it("should reject duplicate email", async () => {
      // ... test
    });
  });

  describe("Student Registration (COPPA)", () => {
    it("should require parent email for students under 13", async () => {
      const studentData = {
        firstName: "Ana",
        lastName: "García",
        dateOfBirth: "2015-05-15", // 10 años
        grade: 5,
        password: "SecurePass123",
        // parentEmail missing
      };

      await expect(registerStudent(studentData)).rejects.toThrow(
        "PARENT_EMAIL_REQUIRED"
      );
    });

    it("should send parental consent email for minors", async () => {
      // ... test
    });
  });

  describe("Email Verification", () => {
    it("should verify email with valid token", async () => {
      // ... test
    });

    it("should reject expired tokens", async () => {
      // ... test
    });
  });
});
```

---

## 📊 Monitoreo y Logs

### Eventos a Registrar

```javascript
// Registro exitoso
logger.info("User registered successfully", {
  userId: user.id,
  email: user.email,
  role: user.role,
  requiresParentalConsent: age < 13,
  ipAddress: req.ip,
});

// Consentimiento parental dado
logger.info("Parental consent granted", {
  studentUserId: student.id,
  parentEmail: consent.parent_email,
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
});

// Intento sospechoso
logger.warn("Suspicious registration attempt", {
  email: email,
  ipAddress: req.ip,
  recaptchaScore: score,
  reason: "LOW_RECAPTCHA_SCORE",
});
```

---

## 📚 Referencias

- **COPPA**: https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule
- **Email Verification Best Practices**: https://sendgrid.com/blog/email-verification-best-practices/
- **reCAPTCHA v3**: https://developers.google.com/recaptcha/docs/v3

---

**Última actualización**: 09/11/2025
