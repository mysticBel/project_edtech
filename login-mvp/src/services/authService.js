// Servicio para autenticación y gestión de usuarios
import usersData from "../data/users.json";

class AuthService {
  // Clave para localStorage
  static STORAGE_KEY = "users";

  // Obtener todos los usuarios (locales + predefinidos)
  static getAllUsers() {
    const localUsers = JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || "[]"
    );
    return [...usersData.users, ...localUsers];
  }

  // Obtener solo usuarios locales
  static getLocalUsers() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
  }

  // Login de usuario
  static login(email, password) {
    const allUsers = this.getAllUsers();
    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  }

  // Registro de nuevo usuario
  static register(userData) {
    const localUsers = this.getLocalUsers();

    // Verificar si el email ya existe
    const allUsers = this.getAllUsers();
    if (allUsers.find((u) => u.email === userData.email)) {
      throw new Error("Este email ya está registrado");
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      completedSurvey: false,
      createdAt: new Date().toISOString(),
    };

    // Guardar en localStorage
    localUsers.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localUsers));

    return newUser;
  }

  // Actualizar datos del usuario
  static updateUser(userId, updates) {
    const localUsers = this.getLocalUsers();
    const userIndex = localUsers.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      localUsers[userIndex] = { ...localUsers[userIndex], ...updates };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localUsers));
      return localUsers[userIndex];
    }

    return null;
  }

  // Completar encuesta
  static completeSurvey(userId, surveyData) {
    return this.updateUser(userId, {
      completedSurvey: true,
      surveyData,
      surveyCompletedAt: new Date().toISOString(),
    });
  }
}

export default AuthService;
