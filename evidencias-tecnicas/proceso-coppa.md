# Proceso COPPA - Consentimiento Parental Verificable

## 📋 Referencia

**Historia de Usuario**: HU-002 - Registro de Nuevos Usuarios (Menores de 13 años)

---

## 🎯 ¿Qué es COPPA?

**COPPA** (Children's Online Privacy Protection Act) es una ley federal de EE.UU. que protege la privacidad de niños menores de 13 años en internet.

### Requisitos Clave para Nuestra Plataforma

1. ✅ **Consentimiento Parental Verificable**: Obtener permiso de padres antes de recolectar datos
2. ✅ **Notificación Clara**: Explicar qué datos se recolectan y cómo se usan
3. ✅ **Derechos Parentales**: Permitir a padres revisar, modificar o eliminar datos
4. ✅ **Seguridad de Datos**: Proteger la información recolectada
5. ✅ **No Venta de Datos**: Nunca vender información de menores

---

## 🔄 Flujo Completo de Consentimiento Parental

### Fase 1: Registro del Alumno

```
┌─────────────────────────────────────────────────────────┐
│ Alumno (10 años) completa formulario de registro       │
│                                                         │
│ Datos requeridos:                                       │
│ • Nombre: Ana García                                    │
│ • Fecha de nacimiento: 15/05/2015 (10 años)           │
│ • Grado: 5° de primaria                                 │
│ • Email del padre/madre: padre@email.com                │
│ • Contraseña para la cuenta                             │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema calcula edad: 10 años → MENOR DE 13 AÑOS       │
│                                                         │
│ Validación COPPA activada ✓                             │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema crea cuenta con estado: PENDING_PARENTAL_CONSENT│
│                                                         │
│ Datos almacenados:                                      │
│ • user.is_email_verified = FALSE                        │
│ • profile.parental_consent_given = FALSE                │
│ • profile.parent_email = "padre@email.com"              │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema genera token único de consentimiento:           │
│ • Token: crypto.randomBytes(32).toString('hex')         │
│ • Expira en: 7 días                                     │
│ • Guarda en tabla parental_consents                     │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema envía EMAIL AL PADRE:                           │
│ • Asunto: "Tu hijo/a quiere registrarse en EdTech"     │
│ • Contenido: Explicación + Link de autorización        │
│ • Link: /parental-consent?token=abc123xyz               │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Alumno ve mensaje:                                      │
│ "✋ Esperando autorización de tu papá o mamá"           │
│                                                         │
│ • No puede acceder a la plataforma todavía              │
│ • Debe esperar que el padre autorice                    │
└─────────────────────────────────────────────────────────┘
```

### Fase 2: Revisión y Autorización del Padre

```
┌─────────────────────────────────────────────────────────┐
│ PADRE recibe email y hace click en el link             │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Página de Consentimiento muestra:                       │
│                                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│ 🧒 Tu hijo/a ANA GARCÍA (10 años)                      │
│    quiere registrarse en EdTech Platform                │
│                                                         │
│ 📋 INFORMACIÓN QUE RECOLECTAREMOS:                      │
│ ✓ Nombre completo                                       │
│ ✓ Edad y fecha de nacimiento                            │
│ ✓ Grado escolar (5° primaria)                           │
│ ✓ Progreso en actividades educativas                    │
│ ✓ Calificaciones y ejercicios completados               │
│ ✓ Tiempo de estudio                                     │
│                                                         │
│ ❌ NO RECOLECTAMOS:                                     │
│ • Dirección física del hogar                            │
│ • Número de teléfono del menor                          │
│ • Información financiera                                │
│ • Ubicación geográfica precisa                          │
│                                                         │
│ 🔒 CÓMO PROTEGEMOS LOS DATOS:                           │
│ • Cifrado de datos en tránsito y reposo                 │
│ • Acceso solo por profesores autorizados                │
│ • NUNCA vendemos datos a terceros                       │
│ • Cumplimiento COPPA, GDPR, FERPA                       │
│                                                         │
│ 👤 SUS DERECHOS COMO PADRE/TUTOR:                       │
│ • Revisar los datos de su hijo/a en cualquier momento   │
│ • Solicitar corrección de datos incorrectos             │
│ • Solicitar eliminación de la cuenta                    │
│ • Retirar el consentimiento cuando desee                │
│                                                         │
│ 📧 Contacto: privacy@edtech.com                         │
│                                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│ [ ] He leído y entiendo la información anterior         │
│                                                         │
│        [✅ SÍ, AUTORIZO EL REGISTRO]                    │
│                                                         │
│        [❌ No autorizo]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Fase 3: Registro de Consentimiento

```
Padre hace click en "SÍ, AUTORIZO"
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema registra el consentimiento:                     │
│                                                         │
│ UPDATE parental_consents SET                            │
│   consent_given = TRUE                                  │
│   consent_date = NOW()                                  │
│   ip_address = '192.168.1.50'                           │
│   user_agent = 'Mozilla/5.0...'                         │
│                                                         │
│ UPDATE user_profiles SET                                │
│   parental_consent_given = TRUE                         │
│   parental_consent_date = NOW()                         │
│   parent_email = 'padre@email.com'                      │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema envía EMAIL AL PADRE:                           │
│ "✅ Confirmación: Autorizaste el registro de Ana"       │
│                                                         │
│ Contenido:                                              │
│ • Resumen de lo autorizado                              │
│ • Link al portal de padres                              │
│ • Recordatorio de derechos                              │
│ • Contacto de soporte                                   │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Sistema envía EMAIL AL ALUMNO:                          │
│ "🎉 ¡Tu cuenta está activada!"                          │
│                                                         │
│ Contenido:                                              │
│ • "Tu papá/mamá autorizó tu registro"                   │
│ • Credenciales de acceso                                │
│ • Link para iniciar sesión                              │
│ • Bienvenida a la plataforma                            │
└─────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│ Alumno puede INICIAR SESIÓN                             │
│ y acceder a todas las funcionalidades                   │
└─────────────────────────────────────────────────────────┘
```

---

## 📧 Templates de Email Completos

### Email 1: Solicitud de Consentimiento al Padre

```
De: noreply@edtech.com
Para: padre@email.com
Asunto: ⚠️ Tu hijo/a Ana García quiere registrarse en EdTech

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Estimado padre/tutor,

Su hijo/a ANA GARCÍA (10 años) desea crear una cuenta en
nuestra plataforma educativa EdTech.

Debido a que es menor de 13 años, necesitamos su autorización
explícita antes de permitir el acceso, según lo requiere la
ley COPPA (Children's Online Privacy Protection Act).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMACIÓN QUE RECOLECTAREMOS:

✓ Datos básicos: Nombre, edad, grado escolar
✓ Progreso educativo: Actividades completadas, calificaciones
✓ Estadísticas de uso: Tiempo de estudio, temas estudiados
✓ Email suyo (del padre) para comunicaciones

❌ NO recolectamos:
• Dirección física
• Número de teléfono del menor
• Información financiera
• Ubicación GPS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 CÓMO PROTEGEMOS LA INFORMACIÓN:

• Cifrado SSL/TLS en todas las comunicaciones
• Datos almacenados en servidores seguros
• Acceso restringido solo a profesores autorizados
• NUNCA vendemos datos de menores a terceros
• Cumplimiento con COPPA, GDPR y FERPA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 SUS DERECHOS COMO PADRE/TUTOR:

• Revisar todos los datos de su hijo/a
• Solicitar corrección o eliminación de datos
• Retirar el consentimiento en cualquier momento
• Acceder a reportes de progreso
• Contactar soporte en cualquier momento

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para AUTORIZAR el registro de su hijo/a, haga clic aquí:

👉 [AUTORIZAR REGISTRO]
   https://edtech.com/parental-consent?token=abc123xyz456

Para NO AUTORIZAR (cancelar registro), ignore este email.
La solicitud expirará automáticamente en 7 días.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Tiene preguntas?

📞 Soporte: support@edtech.com
📄 Política de Privacidad: https://edtech.com/privacy
📋 Info COPPA: https://edtech.com/coppa
🔗 Portal de Padres: https://edtech.com/parents

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este email fue enviado porque alguien solicitó registrar a
Ana García usando su dirección de email como contacto parental.

Si no esperaba este email, simplemente ignórelo.

© 2025 EdTech Platform | Todos los derechos reservados
```

### Email 2: Confirmación al Padre (Después de Autorizar)

```
De: noreply@edtech.com
Para: padre@email.com
Asunto: ✅ Confirmación: Autorizaste el registro de Ana García

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Estimado padre/tutor,

Confirmamos que ha autorizado exitosamente el registro de
su hijo/a ANA GARCÍA en EdTech Platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RESUMEN DE LA AUTORIZACIÓN:

• Fecha: 09/11/2025 14:35
• Alumno: Ana García (10 años)
• Grado: 5° de primaria
• Email padre: padre@email.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 PRÓXIMOS PASOS:

1. Su hijo/a recibirá un email de bienvenida
2. Podrá iniciar sesión con su email y contraseña
3. Completará una encuesta inicial de nivel
4. Comenzará a usar la plataforma educativa

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👀 PORTAL DE PADRES:

Puede monitorear el progreso de su hijo/a en:
👉 https://edtech.com/parent-portal

Credenciales:
• Email: padre@email.com
• Crear contraseña: [Click aquí]

Desde el portal podrá:
• Ver progreso en tiempo real
• Recibir notificaciones de logros
• Revisar tiempo de estudio
• Comunicarse con profesores
• Gestionar consentimientos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❗ RECORDATORIO DE SUS DERECHOS:

En cualquier momento puede:
• Revisar los datos de su hijo/a
• Solicitar corrección de datos
• Eliminar la cuenta
• Retirar su consentimiento
• Exportar todos los datos

Para ejercer cualquier derecho:
📧 Contacto: privacy@edtech.com
📞 Soporte: +1 (555) 123-4567

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gracias por confiar en EdTech Platform para la educación
de su hijo/a.

Atentamente,
El equipo de EdTech

© 2025 EdTech Platform | Todos los derechos reservados
```

### Email 3: Bienvenida al Alumno (Después de Autorización)

```
De: noreply@edtech.com
Para: ana.garcia.student@edtech.com
Asunto: 🎉 ¡Tu cuenta de EdTech está activada!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¡Hola Ana! 👋

¡Excelentes noticias! Tu papá o mamá autorizó tu registro.
Ahora puedes empezar a usar EdTech y aprender cosas nuevas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 ¿CÓMO EMPEZAR?

1️⃣ Ve a: https://edtech.com/login
2️⃣ Inicia sesión con:
   • Email: ana.garcia.student@edtech.com
   • Contraseña: La que elegiste al registrarte
3️⃣ Responde una encuesta divertida (10 minutos)
4️⃣ ¡Comienza a aprender! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ ¿QUÉ PUEDES HACER?

📚 Actividades adaptadas a tu nivel
🎯 Ejercicios de Matemáticas, Lengua, Ciencias
⭐ Gana puntos y estrellas
🏆 Desbloquea contenido nuevo
🤖 Tutor virtual que te ayuda 24/7
📊 Ve tu progreso en tiempo real

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CONSEJO:

La encuesta inicial nos ayuda a conocerte mejor y
recomendarte actividades perfectas para ti.
¡Responde con sinceridad! 😊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Necesitas ayuda?

🆘 Haz clic en el botón "Ayuda" dentro de la plataforma
📧 O escribe a: support@edtech.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¡Bienvenida a EdTech! 🎓
Estamos emocionados de acompañarte en tu aprendizaje.

El equipo de EdTech

© 2025 EdTech Platform
```

---

## 🗂️ Almacenamiento de Evidencias

### Base de Datos: Tabla `parental_consents`

```sql
-- Ejemplo de registro almacenado
id                  | f47ac10b-58cc-4372-a567-0e02b2c3d479
student_user_id     | a1b2c3d4-e5f6-7890-abcd-ef1234567890
parent_email        | padre@email.com
token               | abc123xyz456def789...
consent_given       | TRUE
consent_date        | 2025-11-09 14:35:22
ip_address          | 192.168.1.50
user_agent          | Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
expires_at          | 2025-11-16 10:00:00
created_at          | 2025-11-09 10:00:00
updated_at          | 2025-11-09 14:35:22
```

### Logs de Auditoría

```json
{
  "event": "PARENTAL_CONSENT_GRANTED",
  "timestamp": "2025-11-09T14:35:22.000Z",
  "data": {
    "studentUserId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "studentName": "Ana García",
    "studentAge": 10,
    "parentEmail": "padre@email.com",
    "consentToken": "abc123...truncated",
    "ipAddress": "192.168.1.50",
    "userAgent": "Mozilla/5.0...",
    "consentMethod": "email_link",
    "emailSentAt": "2025-11-09T10:00:00.000Z",
    "consentGivenAt": "2025-11-09T14:35:22.000Z",
    "timeTakenHours": 4.59
  },
  "compliance": {
    "coppa": true,
    "gdpr": true,
    "ferpa": true
  }
}
```

---

## ⚖️ Cumplimiento Legal

### ✅ Checklist COPPA

- [x] **Consentimiento verificable obtenido**: Padre hizo click en link único
- [x] **Notificación directa al padre**: Email enviado antes de recolectar datos
- [x] **Información clara**: Explicación de qué datos se recolectan
- [x] **Derechos parentales**: Padre puede revisar/eliminar datos
- [x] **Seguridad**: Datos cifrados y protegidos
- [x] **No venta**: Política explícita de no vender datos de menores
- [x] **Evidencia almacenada**: IP, timestamp, email conservados

### 📋 Documentación Requerida

1. **Política de Privacidad para Niños**: Disponible en `/privacy-children`
2. **Términos de Servicio COPPA**: Disponible en `/terms-coppa`
3. **Procedimiento de Retiro de Consentimiento**: Documentado en `/coppa-withdrawal`
4. **Registro de Auditoría**: Logs conservados por 7 años

---

## 🚨 Casos Especiales

### Caso 1: Token Expirado (>7 días)

```
Padre intenta usar link después de 7 días
                │
                ▼
Sistema valida token → EXPIRADO
                │
                ▼
Mostrar mensaje:
"Este link expiró. La solicitud fue cancelada.
 Si deseas registrar a tu hijo/a nuevamente,
 solicítale que cree una nueva cuenta."
                │
                ▼
Eliminar cuenta pendiente de estudiante
```

### Caso 2: Padre Rechaza Consentimiento

```
Padre hace click en "No autorizo"
                │
                ▼
Sistema marca consentimiento como DENIED
                │
                ▼
Eliminar cuenta del estudiante
(soft delete por 30 días, luego permanente)
                │
                ▼
Enviar email al estudiante:
"Tu papá/mamá no autorizó el registro.
 Si crees que es un error, habla con él/ella."
```

### Caso 3: Reintento de Registro

```
Alumno intenta registrarse nuevamente
con mismo email del padre
                │
                ▼
Sistema detecta intento previo
                │
                ▼
Opciones:
1. Si token anterior expiró: Permitir nuevo registro
2. Si token pendiente: "Ya enviamos autorización a tu padre"
3. Si fue rechazado: "Tu padre no autorizó el registro anterior"
```

---

## 📞 Soporte para Padres

### Preguntas Frecuentes

**P: ¿Cuánto tiempo tengo para autorizar?**
R: 7 días. Después el link expira y la cuenta se elimina.

**P: ¿Puedo retirar mi consentimiento después?**
R: Sí, en cualquier momento desde el Portal de Padres o escribiendo a privacy@edtech.com

**P: ¿Qué datos puedo revisar?**
R: Todos los datos de su hijo/a: progreso, calificaciones, tiempo de uso, actividades.

**P: ¿Puedo eliminar la cuenta de mi hijo/a?**
R: Sí, puede solicitarlo en cualquier momento. Los datos se eliminarán en 30 días.

---

**Última actualización**: 09/11/2025
