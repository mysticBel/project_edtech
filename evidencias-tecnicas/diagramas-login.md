# Diagramas de Flujo - Sistema de Login

## 📋 Referencia

**Historia de Usuario**: HU-001 - Inicio de Sesión Seguro

---

## 📊 Diagrama 1: Login con Email y Contraseña

```mermaid
flowchart TD
    A[Usuario ingresa email y contraseña] --> B{¿Email existe?}
    B -->|No| C[❌ Error: Credenciales inválidas]
    B -->|Sí| D{¿Password correcto?}
    D -->|No| E[Registrar intento fallido]
    E --> F{¿5 intentos en 15min?}
    F -->|Sí| G[🔒 Bloquear cuenta 15min<br>Enviar email notificación]
    F -->|No| C
    D -->|Sí| H{¿Usuario < 13 años?}
    H -->|Sí| I{¿Consentimiento parental?}
    I -->|No| J[❌ Error: Requiere autorización parental]
    I -->|Sí| K{¿2FA habilitado?}
    H -->|No| K
    K -->|Sí| L[Generar código 6 dígitos<br>Enviar por SMS/Email]
    L --> M[⏳ Solicitar código 2FA]
    M --> N{¿Código correcto?}
    N -->|No| O[❌ Error: Código inválido]
    N -->|Sí| P[Generar JWT tokens]
    K -->|No| P
    P --> Q[Guardar sesión en Redis]
    Q --> R[✅ Login exitoso<br>Redirigir a dashboard]
```

---

## 📊 Diagrama 2: Login con OAuth (Google)

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend
    participant Backend
    participant Google
    participant Database

    Usuario->>Frontend: Click "Iniciar con Google"
    Frontend->>Google: Redirigir a authorization URL<br>(client_id, redirect_uri, scope)
    Google->>Usuario: Pantalla de autorización
    Usuario->>Google: Autorizar acceso
    Google->>Backend: Redirect con code
    Backend->>Google: Intercambiar code por tokens<br>POST /oauth2/token
    Google->>Backend: access_token, id_token
    Backend->>Google: Obtener perfil<br>GET /oauth2/v2/userinfo
    Google->>Backend: {email, name, picture}
    Backend->>Database: ¿Email existe?
    alt Email NO existe
        Backend->>Database: Crear user + profile + oauth_account
    else Email SÍ existe
        Backend->>Database: Actualizar oauth tokens
    end
    Backend->>Database: ¿Usuario < 13 años?
    alt Menor de 13 sin consentimiento
        Backend->>Frontend: ❌ 403: Requiere autorización parental
        Frontend->>Usuario: Mensaje de error
    else Tiene consentimiento o es mayor
        Backend->>Backend: Generar JWT tokens
        Backend->>Database: Guardar sesión en Redis
        Backend->>Frontend: ✅ 200: {accessToken, refreshToken, user}
        Frontend->>Usuario: Redirigir a dashboard
    end
```

---

## 📊 Diagrama 3: Verificación 2FA

```mermaid
flowchart TD
    A[Usuario completa login básico] --> B{¿2FA habilitado?}
    B -->|No| C[✅ Login completo]
    B -->|Sí| D[Generar código aleatorio 6 dígitos]
    D --> E[Guardar código en Redis<br>TTL: 5 minutos]
    E --> F[Enviar código por SMS/Email]
    F --> G[Responder: requires2FA=true<br>sessionToken temporal]
    G --> H[Usuario recibe código]
    H --> I[Usuario ingresa código en UI]
    I --> J[Frontend envía código + sessionToken<br>POST /auth/2fa/verify]
    J --> K{¿Código correcto?}
    K -->|No| L[❌ Error: Código inválido<br>Intentar nuevamente]
    K -->|Sí| M[Eliminar código de Redis]
    M --> N[Generar JWT tokens definitivos]
    N --> O[Guardar sesión en Redis]
    O --> P[✅ Login completo<br>Redirigir a dashboard]
```

---

## 📊 Diagrama 4: Manejo de Sesiones

```mermaid
flowchart TD
    A[Usuario inicia sesión exitosamente] --> B[Generar Access Token<br>Expiración: 15 minutos]
    B --> C[Generar Refresh Token<br>Expiración: 7 días]
    C --> D[Guardar sesión en Redis<br>KEY: session:userId:sessionId]
    D --> E[Enviar tokens al frontend]
    E --> F[Frontend guarda tokens<br>localStorage o cookie]
    F --> G[Usuario navega la aplicación]
    G --> H{¿Access Token<br>expiró?}
    H -->|No| I[Usar Access Token<br>en header Authorization]
    H -->|Sí| J[Frontend detecta 401]
    J --> K[Enviar Refresh Token<br>POST /auth/refresh-token]
    K --> L{¿Refresh Token<br>válido?}
    L -->|No| M[❌ Redirigir a login]
    L -->|Sí| N[Generar nuevo Access Token]
    N --> O[Actualizar sesión en Redis]
    O --> P[Enviar nuevo Access Token]
    P --> I
    I --> Q[Backend valida token]
    Q --> R[✅ Procesar request]
```

---

## 📊 Diagrama 5: Flujo COPPA (Consentimiento Parental)

```mermaid
sequenceDiagram
    actor Alumno
    actor Padre
    participant Sistema
    participant Email
    participant Database

    Alumno->>Sistema: Completar registro<br>(nombre, edad, email padre)
    Sistema->>Database: Verificar edad
    Database->>Sistema: Edad = 10 años (< 13)
    Sistema->>Sistema: Generar token único<br>para consentimiento
    Sistema->>Database: Guardar pending_consent
    Sistema->>Email: Enviar email al padre<br>con link de autorización
    Email->>Padre: Email recibido
    Padre->>Sistema: Click en link de autorización<br>/consent?token=abc123
    Sistema->>Database: Verificar token válido
    Sistema->>Padre: Mostrar formulario:<br>"¿Autorizas a tu hijo/a?"
    Padre->>Sistema: Click "Sí, autorizo"
    Sistema->>Database: UPDATE parental_consent_given=true<br>parental_consent_date=NOW()
    Sistema->>Email: Enviar confirmación al padre
    Sistema->>Email: Enviar bienvenida al alumno<br>con credenciales
    Email->>Alumno: Email recibido
    Alumno->>Sistema: Iniciar sesión
    Sistema->>Database: Verificar consentimiento
    Database->>Sistema: consentimiento=true
    Sistema->>Alumno: ✅ Acceso permitido
```

---

## 📊 Diagrama 6: Bloqueo por Intentos Fallidos

```mermaid
flowchart TD
    A[Usuario intenta login] --> B[Verificar password]
    B --> C{¿Correcto?}
    C -->|Sí| D[✅ Login exitoso<br>Resetear contador]
    C -->|No| E[Registrar en login_attempts<br>success=false]
    E --> F[Contar intentos fallidos<br>últimos 15 minutos]
    F --> G{¿≥ 5 intentos?}
    G -->|No| H[❌ Mostrar error<br>Indicar intentos restantes]
    G -->|Sí| I[Calcular timestamp<br>unlock_at = NOW + 15min]
    I --> J[Guardar bloqueo en Redis<br>KEY: locked:email<br>TTL: 900 segundos]
    J --> K[Enviar email notificación:<br>"Cuenta bloqueada temporalmente"]
    K --> L[❌ Responder 429:<br>"Demasiados intentos.<br>Inténtalo en 15 minutos"]
    L --> M[Usuario espera...]
    M --> N[Después de 15 min:<br>Redis TTL expira]
    N --> O[Usuario puede intentar nuevamente]
```

---

## 🎨 Leyenda de Símbolos

- ✅ = Operación exitosa
- ❌ = Error o rechazo
- 🔒 = Bloqueo de seguridad
- ⏳ = Proceso en espera
- 💾 = Operación de base de datos
- 📧 = Envío de email
- 🔑 = Generación de token/código

---

**Última actualización**: 09/11/2025
