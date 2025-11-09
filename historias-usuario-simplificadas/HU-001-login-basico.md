# HU-001: Inicio de Sesión Seguro en la Plataforma

## 1. Identificador

**HU-001**

---

## 2. Título

Permitir a profesores y alumnos iniciar sesión de forma segura en la plataforma educativa

---

## 3. Descripción

**Como** profesor o alumno de primaria (8-12 años)  
**Quiero** iniciar sesión en la plataforma de forma rápida y segura  
**Para** acceder a mis actividades, tareas y progreso personalizado

---

## 4. Contexto Técnico

- Los alumnos de primaria (8-12 años) requieren protección especial bajo normativas COPPA
- Los padres deben autorizar el acceso de sus hijos menores de 13 años
- El sistema debe recordar las sesiones de forma segura
- Se requiere protección contra intentos de acceso no autorizados

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Inicio de sesión básico

- El usuario puede iniciar sesión con email y contraseña
- El sistema muestra un mensaje claro si los datos son incorrectos
- Después de iniciar sesión correctamente, el usuario ve su pantalla principal

### ✅ Criterio 2: Protección para alumnos de primaria

- Todos los alumnos menores de 13 años requieren consentimiento parental antes del primer acceso
- El padre o tutor debe aprobar el registro mediante un link enviado a su email
- Sin aprobación parental, el alumno no puede acceder a la plataforma

### ✅ Criterio 3: Recordar sesión

- El usuario puede marcar "Recordarme" para no tener que iniciar sesión cada vez
- La sesión permanece activa por 7 días si el usuario no cierra sesión
- Si pasan 30 minutos sin actividad, el sistema pide confirmar que el usuario sigue presente

### ✅ Criterio 4: Seguridad ante intentos sospechosos

- Después de 5 intentos fallidos de inicio de sesión, el sistema bloquea la cuenta por 15 minutos
- El usuario recibe un email notificándole del bloqueo temporal
- El sistema muestra cuánto tiempo falta para poder intentar nuevamente

### ✅ Criterio 5: Inicio de sesión con servicios externos

- Los usuarios pueden iniciar sesión con su cuenta de Google
- Los usuarios pueden iniciar sesión con su cuenta de Microsoft
- El sistema vincula automáticamente estas cuentas al perfil del usuario

### ✅ Criterio 6: Verificación adicional (opcional)

- Los profesores y administradores pueden activar verificación en dos pasos
- El sistema envía un código de 6 dígitos al teléfono móvil o email
- El código es válido solo por 5 minutos

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El formulario de inicio de sesión debe ser simple y claro
- Los mensajes de error deben ser fáciles de entender para niños de 8-12 años
- El proceso de consentimiento parental debe ser sencillo para los padres

### Seguridad y Cumplimiento

- **Cumplimiento COPPA obligatorio**: Todos los alumnos menores de 13 años requieren consentimiento parental verificable
- Los tokens de sesión deben ser seguros y únicos
- Las contraseñas nunca se almacenan en texto plano
- El sistema debe registrar todos los accesos para auditoría

### Performance

- El inicio de sesión debe completarse en menos de 2 segundos
- El sistema debe soportar 1,000 usuarios iniciando sesión simultáneamente

---

## 7. Dependencias

### Pre-requisitos

- Ninguno (Esta es la historia base del sistema)

### Bloquea a

- **HU-002**: Registro de nuevos usuarios
- **HU-003**: Encuesta inicial de perfil
- Todas las demás historias requieren que el usuario esté autenticado

---

## 8. Prioridad / Estimación

**Prioridad**: CRÍTICA  
**Estimación**: 13 Story Points / 10 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-login.md`
- Ver diagramas de flujo: `/evidencias-tecnicas/diagramas-login.md`
- Ver especificaciones de seguridad: `/evidencias-tecnicas/seguridad-login.md`

### Normativas y Estándares

- **COPPA** (Children's Online Privacy Protection Act): Protección de privacidad para menores de 13 años
- **GDPR**: Reglamento General de Protección de Datos
- **FERPA**: Ley de Derechos Educativos y Privacidad Familiar
- **JWT**: Estándar RFC 7519 para tokens de autenticación
- **OAuth 2.0**: Estándar RFC 6749 para autenticación con servicios externos

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 95% de los usuarios pueden iniciar sesión sin problemas
- ✅ El tiempo de inicio de sesión es menor a 2 segundos
- ✅ El 100% de los alumnos menores de 13 años tienen consentimiento parental
- ✅ Los intentos de acceso no autorizado se bloquean correctamente
- ✅ La satisfacción de usuarios es mayor a 8/10

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
