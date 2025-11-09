# Arquitectura Técnica - Sistema de Login y Autenticación

## 📋 Referencia

**Historia de Usuario**: HU-001 - Inicio de Sesión Seguro

---

## 🏗️ Arquitectura General

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Login Form  │  │  OAuth Btns  │  │  2FA Modal   │      │
│  │  (React)     │  │  (Google/MS) │  │  (React)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE API (Node.js)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Authentication Service                       │   │
│  │  - POST /api/v1/auth/login                           │   │
│  │  - POST /api/v1/auth/oauth/google                    │   │
│  │  - POST /api/v1/auth/oauth/microsoft                 │   │
│  │  - POST /api/v1/auth/2fa/verify                      │   │
│  │  - POST /api/v1/auth/refresh-token                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │    Redis     │  │  OAuth APIs  │
│  (Usuarios)  │  │   (Sesiones  │  │ Google/MS    │
│              │  │  & Tokens)   │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Lenguaje**: Node.js 18+ con TypeScript
- **Framework**: Express.js 4.x
- **Autenticación**:
  - Passport.js (estrategias local + OAuth)
  - jsonwebtoken (JWT) - RFC 7519
- **Hashing**: bcrypt (factor 12)
- **Rate Limiting**: express-rate-limit

### Base de Datos

- **Principal**: PostgreSQL 14+
- **Cache/Sesiones**: Redis 7+
- **ORM**: Sequelize o TypeORM

### Frontend

- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios

---

## 🗄️ Modelo de Datos

### Tabla: `users`

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL si usa OAuth
    role VARCHAR(50) NOT NULL, -- 'student', 'teacher', 'admin', 'parent'
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL -- Soft delete
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Tabla: `user_profiles`

```sql
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    grade_level INTEGER, -- Solo para students
    parental_consent_given BOOLEAN DEFAULT FALSE, -- COPPA compliance
    parental_consent_date TIMESTAMP NULL,
    parent_email VARCHAR(255), -- Para students < 13 años
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: `oauth_accounts`

```sql
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'microsoft'
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);
```

### Tabla: `login_attempts`

```sql
CREATE TABLE login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    success BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_login_attempts_email_time ON login_attempts(email, attempted_at);
```

### Tabla: `sessions` (Redis)

```
KEY: session:{userId}:{sessionId}
VALUE: {
    userId: UUID,
    role: string,
    ipAddress: string,
    userAgent: string,
    createdAt: timestamp,
    lastActivity: timestamp
}
TTL: 604800 segundos (7 días si "recordar sesión")
```

---

## 🔄 Flujos de Autenticación

### 1. Login Básico (Email/Password)

```
Usuario → [POST /api/v1/auth/login]
         {email, password, rememberMe}
                    │
                    ▼
        ¿Email existe en DB?
                    │
            ┌───────┴───────┐
            │ NO            │ SÍ
            ▼               ▼
    Respuesta 401    ¿Password correcto?
    "Credenciales       (bcrypt.compare)
     inválidas"              │
                     ┌───────┴───────┐
                     │ NO            │ SÍ
                     ▼               ▼
            +1 intento fallido   ¿≥5 intentos
            Respuesta 401        fallidos en 15min?
                                      │
                              ┌───────┴───────┐
                              │ SÍ            │ NO
                              ▼               ▼
                        Bloquear 15min   ¿Menor de 13?
                        Enviar email          │
                        Respuesta 429   ┌─────┴─────┐
                                       │ SÍ        │ NO
                                       ▼           ▼
                              ¿Consentimiento  ¿2FA activo?
                               parental?            │
                                   │          ┌─────┴─────┐
                              ┌────┴────┐    │ SÍ        │ NO
                              │ NO      │ SÍ  ▼           ▼
                              ▼         ▼    Enviar     Generar
                          403 Error   Generar código    JWT tokens
                          "Requiere   2FA      │        │
                          autorización         │        │
                          parental"            ▼        │
                                          Respuesta     │
                                          "2FA          │
                                          requerido"    │
                                                       │
                                                       ▼
                                              Respuesta 200
                                              {accessToken,
                                               refreshToken,
                                               user: {...}}
```

### 2. OAuth (Google/Microsoft)

```
Usuario hace clic en "Iniciar con Google"
                    │
                    ▼
Redirigir a Google Authorization Endpoint
        (con client_id, redirect_uri, scope)
                    │
                    ▼
Usuario autoriza en Google
                    │
                    ▼
Google redirige a /callback?code=ABC123
                    │
                    ▼
Backend intercambia code por access_token
        (POST a Google Token Endpoint)
                    │
                    ▼
Obtener perfil del usuario desde Google
        (GET https://www.googleapis.com/oauth2/v2/userinfo)
                    │
                    ▼
¿Email ya existe en nuestra DB?
            │
    ┌───────┴───────┐
    │ SÍ            │ NO
    ▼               ▼
Actualizar      Crear nuevo user
tokens OAuth    + profile + oauth_account
    │               │
    └───────┬───────┘
            ▼
    ¿Menor de 13?
            │
    ┌───────┴───────┐
    │ SÍ            │ NO
    ▼               ▼
¿Consentimiento   Generar JWT
parental?         tokens
    │                 │
 ┌──┴──┐             │
 │NO   │SÍ           │
 ▼     ▼             │
403   JWT            │
Error tokens         │
      │              │
      └──────┬───────┘
             ▼
    Respuesta 200
    {accessToken, refreshToken, user}
```

### 3. Verificación 2FA

```
Usuario completa login básico
                │
                ▼
        ¿2FA habilitado?
                │
        ┌───────┴───────┐
        │ NO            │ SÍ
        ▼               ▼
    Login     Generar código 6 dígitos
    completo  Guardar en Redis (TTL 5min)
              Enviar por SMS/Email
                    │
                    ▼
              Respuesta 200
              {requires2FA: true,
               sessionToken: "temp_abc123"}
                    │
                    ▼
Usuario ingresa código
      [POST /api/v1/auth/2fa/verify]
      {sessionToken, code}
                    │
                    ▼
        ¿Código correcto?
                │
        ┌───────┴───────┐
        │ NO            │ SÍ
        ▼               ▼
    Respuesta 401   Generar JWT
    "Código         tokens
     inválido"           │
                         ▼
                   Eliminar código
                   de Redis
                         │
                         ▼
                   Respuesta 200
                   {accessToken,
                    refreshToken}
```

---

## 🔒 Seguridad

### 1. Hashing de Contraseñas

```javascript
// Registro
const passwordHash = await bcrypt.hash(password, 12);

// Verificación
const isValid = await bcrypt.compare(password, user.password_hash);
```

### 2. JWT Tokens

```javascript
// Access Token (corta duración)
const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "15m" } // 15 minutos
);

// Refresh Token (larga duración)
const refreshToken = jwt.sign(
  { userId: user.id, tokenFamily: uuidv4() },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: "7d" } // 7 días
);
```

### 3. Rate Limiting

```javascript
// Límite global
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests
  })
);

// Límite específico para login
app.use(
  "/api/v1/auth/login",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // máximo 5 intentos
    message: "Demasiados intentos de inicio de sesión",
  })
);
```

### 4. COPPA Compliance (Menores de 13 años)

```javascript
// Middleware de verificación
async function requireParentalConsent(req, res, next) {
  const user = await User.findByPk(req.userId, {
    include: "profile",
  });

  const age = calculateAge(user.profile.date_of_birth);

  if (age < 13 && !user.profile.parental_consent_given) {
    return res.status(403).json({
      error: "PARENTAL_CONSENT_REQUIRED",
      message: "Se requiere autorización de padre/tutor",
    });
  }

  next();
}
```

---

## 📊 Monitoreo y Logs

### Eventos a Registrar

```javascript
// Log exitoso
logger.info("Login successful", {
  userId: user.id,
  email: user.email,
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
  method: "email", // o 'google', 'microsoft'
});

// Log fallido
logger.warn("Login failed", {
  email: email,
  ipAddress: req.ip,
  reason: "INVALID_PASSWORD",
  attemptNumber: attempts,
});

// Log de bloqueo
logger.error("Account temporarily locked", {
  email: email,
  ipAddress: req.ip,
  attempts: 5,
  lockDuration: "15 minutes",
});
```

---

## 🧪 Testing

### Unit Tests

- Hashing y verificación de contraseñas
- Generación y validación de JWT
- Cálculo de edad (COPPA compliance)

### Integration Tests

- Flujo completo de login email/password
- Flujo OAuth con mocks de Google/Microsoft
- Rate limiting
- Bloqueo por intentos fallidos

### E2E Tests

- Login exitoso → acceso a dashboard
- Login fallido 5 veces → bloqueo temporal
- OAuth flow completo con redirects

---

## 📚 Referencias

- **JWT**: RFC 7519 - https://tools.ietf.org/html/rfc7519
- **OAuth 2.0**: RFC 6749 - https://tools.ietf.org/html/rfc6749
- **COPPA**: https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule
- **OWASP Authentication Cheat Sheet**: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

---

**Última actualización**: 09/11/2025
