// Servicio para gestión del progreso de aprendizaje
import learningPathsData from "../data/learningPaths.json";

class ProgressService {
  // Obtener clave de progreso por usuario
  static getProgressKey(userId) {
    return `progress_${userId}`;
  }

  // Obtener progreso completo del usuario
  static getProgress(userId) {
    const key = this.getProgressKey(userId);
    return JSON.parse(localStorage.getItem(key) || "{}");
  }

  // Obtener estado de un tema específico
  static getTopicStatus(userId, subjectId, topicId) {
    const progress = this.getProgress(userId);
    const key = `${subjectId}_${topicId}`;
    return (
      progress[key] || {
        completed: false,
        locked: false,
        score: 0,
        attempts: 0,
      }
    );
  }

  // Verificar si un tema está desbloqueado
  static isTopicUnlocked(userId, subjectId, topicOrder) {
    if (topicOrder === 1) return true; // Primer tema siempre desbloqueado

    // Buscar el tema anterior
    const subject = learningPathsData.subjects.find((s) => s.id === subjectId);
    if (!subject) return false;

    const previousTopic = subject.topics.find(
      (t) => t.order === topicOrder - 1
    );
    if (!previousTopic) return true;

    const prevStatus = this.getTopicStatus(userId, subjectId, previousTopic.id);
    return prevStatus.completed;
  }

  // Guardar progreso de un tema
  static saveTopicProgress(userId, subjectId, topicId, progressData) {
    const key = this.getProgressKey(userId);
    const currentProgress = this.getProgress(userId);
    const topicKey = `${subjectId}_${topicId}`;

    // Obtener progreso existente del tema
    const existingTopicProgress = currentProgress[topicKey] || {
      completed: false,
      score: 0,
      attempts: 0,
    };

    // Actualizar progreso del tema
    currentProgress[topicKey] = {
      completed: progressData.completed || existingTopicProgress.completed,
      score: Math.max(progressData.score || 0, existingTopicProgress.score),
      attempts: existingTopicProgress.attempts + 1,
      lastAttempt: new Date().toISOString(),
      ...progressData,
    };

    // Guardar en localStorage
    localStorage.setItem(key, JSON.stringify(currentProgress));

    return currentProgress[topicKey];
  }

  // Calcular estadísticas de una materia
  static getSubjectStats(userId, subjectId) {
    const subject = learningPathsData.subjects.find((s) => s.id === subjectId);
    if (!subject) return null;

    const completedTopics = subject.topics.filter(
      (topic) => this.getTopicStatus(userId, subjectId, topic.id).completed
    ).length;

    const totalTopics = subject.topics.length;
    const percentage =
      totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return {
      completedTopics,
      totalTopics,
      percentage,
    };
  }

  // Obtener todas las materias con progreso
  static getAllSubjectsWithProgress(userId) {
    return learningPathsData.subjects.map((subject) => ({
      ...subject,
      stats: this.getSubjectStats(userId, subject.id),
    }));
  }

  // Resetear progreso de un usuario (útil para testing)
  static resetProgress(userId) {
    const key = this.getProgressKey(userId);
    localStorage.removeItem(key);
  }
}

export default ProgressService;
