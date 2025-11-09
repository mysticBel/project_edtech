# HU-002: Registro de Nuevos Usuarios en la Plataforma

## 1. Identificador

**HU-002**

---

## 2. Título

Permitir que nuevos profesores, alumnos y padres se registren en la plataforma educativa

---

## 3. Descripción

**Como** nuevo usuario (profesor, alumno o padre)  
**Quiero** crear mi cuenta en la plataforma de forma sencilla  
**Para** comenzar a usar las herramientas educativas y dar seguimiento al aprendizaje

---

## 4. Contexto Técnico

- Los alumnos de primaria (8-12 años) necesitan supervisión parental obligatoria (COPPA)
- Cada tipo de usuario (profesor, alumno, padre) tiene diferentes necesidades
- El sistema debe validar que los emails sean reales
- Se requiere protección contra registros automatizados (bots)

---

## 5. Criterios de Aceptación

### ✅ Criterio 1: Registro de profesores

- El profesor puede registrarse con: nombre completo, email institucional, y contraseña
- El sistema envía un email de confirmación
- El profesor debe hacer clic en el link del email para activar su cuenta
- Una vez activada, puede crear grupos y asignar alumnos

### ✅ Criterio 2: Registro de alumnos de primaria (8-12 años)

- El alumno proporciona: nombre, edad, email del padre/tutor
- **Obligatorio**: El sistema envía inmediatamente un email al padre solicitando autorización
- El padre debe hacer clic en "Autorizo el registro de mi hijo/a" antes de que el alumno pueda acceder
- El sistema muestra al alumno: "Esperando autorización de tu papá o mamá"
- Una vez autorizado, el alumno recibe email de bienvenida con sus credenciales

### ✅ Criterio 3: Registro de padres/tutores

- El padre puede registrarse para supervisar el progreso de sus hijos
- Proporciona: nombre, email, teléfono (opcional)
- Puede vincular a uno o varios hijos mediante código único
- Recibe notificaciones sobre el progreso de sus hijos

### ✅ Criterio 4: Validación de datos

- El email debe tener formato válido (ejemplo: usuario@dominio.com)
- La contraseña debe tener mínimo 8 caracteres, incluir letras y números
- El sistema muestra mensajes claros si falta algún dato o hay errores
- El sistema detecta si el email ya está registrado y lo informa

### ✅ Criterio 5: Protección anti-bots

- El sistema muestra una verificación simple ("No soy un robot")
- Si detecta comportamiento sospechoso, pide verificación adicional
- Bloquea registros masivos desde la misma dirección IP

### ✅ Criterio 6: Confirmación por email

- Todos los usuarios reciben un email de confirmación
- El link de activación expira en 24 horas
- Si no se activa, el usuario puede solicitar un nuevo link

---

## 6. Consideraciones de Implementación

### Experiencia del Usuario

- El formulario debe ser simple y guiar al usuario paso a paso
- Los mensajes deben ser claros para niños de 8-12 años
- El proceso de autorización parental debe ser rápido para los padres (menos de 2 minutos)

### Seguridad y Cumplimiento

- **Cumplimiento COPPA obligatorio**: 100% de alumnos menores de 13 años requieren consentimiento parental verificable
- Las contraseñas se almacenan de forma segura (nunca en texto plano)
- Los emails de confirmación deben tener tokens únicos y seguros
- El sistema debe registrar cada autorización parental para auditorías

### Performance

- El registro debe completarse en menos de 3 segundos
- Los emails de confirmación deben enviarse en menos de 30 segundos
- El sistema debe manejar 100 registros simultáneos sin problemas

---

## 7. Dependencias

### Pre-requisitos

- **HU-001**: Sistema de inicio de sesión debe estar funcionando

### Bloquea a

- **HU-003**: Encuesta inicial de perfil (requiere usuario registrado)
- Todas las demás funcionalidades requieren un usuario registrado

---

## 8. Prioridad / Estimación

**Prioridad**: CRÍTICA  
**Estimación**: 8 Story Points / 6 días de desarrollo

---

## 9. Evidencias / Referencias

### Documentación Técnica

- Ver arquitectura detallada: `/evidencias-tecnicas/arquitectura-registro.md`
- Ver diagramas de flujo: `/evidencias-tecnicas/diagramas-registro.md`
- Ver proceso de consentimiento parental: `/evidencias-tecnicas/proceso-coppa.md`

### Normativas y Estándares

- **COPPA**: Consentimiento parental verificable obligatorio para menores de 13 años
- **GDPR**: Derecho al olvido y portabilidad de datos
- **FERPA**: Protección de información educativa
- **CAN-SPAM Act**: Regulación de emails comerciales

---

## 📊 Métricas de Éxito

Una vez implementada, esta historia será exitosa si:

- ✅ El 90% de los registros se completan sin problemas
- ✅ El 100% de alumnos menores de 13 años tienen autorización parental
- ✅ El 80% de los emails de confirmación se abren en las primeras 24 horas
- ✅ El tiempo de registro es menor a 3 minutos para usuarios nuevos
- ✅ El 95% de los padres autorizan el registro de sus hijos en menos de 24 horas

---

**Estado**: ✅ LISTA PARA DESARROLLO  
**Última actualización**: 09/11/2025
