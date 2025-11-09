# 🎓 Plataforma de Aprendizaje Adaptativo

## 📌 Resumen Ejecutivo

Plataforma educativa digital diseñada para personalizar la experiencia de aprendizaje de estudiantes mediante rutas adaptativas, feedback en tiempo real y dashboards de seguimiento para profesores y administradores.

## 🎯 Objetivo

Desarrollar una aplicación web que permita a los estudiantes acceder a contenido educativo personalizado, recibir retroalimentación inmediata según su desempeño, y facilitar a profesores y ejecutivos el seguimiento del progreso individual y colectivo mediante reportes visuales.

---

## 📋 Historias de Usuario (Funcionalidades)

### 🔐 HU-001: Login Básico

Sistema de autenticación que permite a usuarios (alumnos, profesores, administradores) acceder a la plataforma con credenciales seguras.

### 👤 HU-002: Registro de Usuario

Formulario de registro para nuevos usuarios con validación de datos y creación de perfil inicial.

### 📝 HU-003: Encuesta Inicial

Cuestionario de perfil educativo que captura: grado escolar, materias favoritas, estilo de aprendizaje y hobbies para personalizar la experiencia.

### 🗺️ HU-004: Ruta Adaptativa

Sistema de aprendizaje progresivo con temas desbloqueables. Ajusta la dificultad según el desempeño del estudiante (adaptación simulada).

### 💬 HU-005: Feedback al Alumno

Retroalimentación inmediata después de cada actividad con mensajes motivacionales y sugerencias de mejora.

### 👨‍🏫 HU-006: Dashboard de Profesores

Panel para que profesores visualicen el progreso de sus alumnos, identifiquen dificultades y monitoreen el avance por materia.

### 📊 HU-007: Dashboard Ejecutivo

Visualización de métricas agregadas: tasas de finalización, materias más populares, rendimiento promedio y análisis de engagement.

### 📤 HU-008: Exportación de Datos

Funcionalidad para exportar reportes y datos en formatos estándar (CSV, PDF) para análisis externo o respaldo.

---

## 🏗️ Estructura del Proyecto

```
diplomado/
├── login-mvp/                    # MVP Implementado (HU-001 a HU-004)
│   ├── src/
│   │   ├── pages/               # Componentes de vistas
│   │   ├── services/            # Lógica de negocio
│   │   └── data/                # Datos estáticos
│   └── README.md                # Documentación técnica del MVP
│
├── historias-usuario/           # Documentación detallada de HUs
├── historias-usuario-simplificadas/
├── evidencias-tecnicas/         # Arquitecturas y diagramas
└── README.md                    # Este archivo
```

---
