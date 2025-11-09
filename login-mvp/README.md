# 🎓 Plataforma Educativa Adaptativa - MVP

## 📋 Objetivo del Proyecto

Este proyecto es un **MVP (Minimum Viable Product)** de una plataforma educativa con aprendizaje adaptativo diseñada para estudiantes de educación básica. La aplicación permite a los estudiantes registrarse, completar una encuesta inicial de perfil, y acceder a rutas de aprendizaje personalizadas con feedback en tiempo real.

### 🎯 Funcionalidades Principales

1. **Sistema de Autenticación** (HU-001, HU-002)

   - Login con email y contraseña
   - Registro de nuevos usuarios
   - Persistencia local de sesiones

2. **Encuesta Inicial de Perfil** (HU-003)

   - Grado escolar
   - Materias favoritas
   - Estilo de aprendizaje
   - Hobbies e intereses

3. **Rutas de Aprendizaje Adaptativas** (HU-004)
   - 3 materias: Matemáticas, Lengua y Ciencias
   - Sistema de temas progresivos con bloqueo/desbloqueo
   - Actividades interactivas con preguntas de opción múltiple
   - Feedback adaptativo basado en desempeño
   - Seguimiento de progreso por usuario

### 🏗️ Arquitectura del Proyecto

```
src/
├── pages/              # Componentes de vistas principales
│   ├── Login.js       # Pantalla de inicio de sesión
│   ├── Register.js    # Pantalla de registro
│   ├── Survey.js      # Encuesta inicial (4 pasos)
│   ├── Home.js        # Dashboard principal
│   ├── LearningMap.js # Mapa de rutas de aprendizaje
│   └── Activity.js    # Actividades/Ejercicios
├── services/          # Capa de lógica de negocio
│   ├── authService.js     # Gestión de autenticación
│   └── progressService.js # Gestión de progreso
└── data/              # Datos estáticos
    ├── users.json           # Usuarios de prueba
    └── learningPaths.json   # Contenido educativo
```

### 🔑 Características Técnicas

- **Frontend**: React 18.x con hooks
- **Persistencia**: localStorage (simulación de base de datos)
- **Arquitectura**: Patrón de capas (Pages → Services → Data)
- **Sin backend**: Aplicación completamente client-side
- **Aprendizaje Adaptativo**: Simulado con lógica de racha de respuestas

### 👥 Usuarios de Prueba

```
Admin:     admin@test.com / admin123
Profesor:  profesor@test.com / profe123
Alumno:    alumno@test.com / alumno123
```

## 🚀 Cómo Ejecutar el Proyecto

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
