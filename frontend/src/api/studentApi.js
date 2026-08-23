import api from './axiosInstance';

export const getStudentDashboard = () => api.get('/student/dashboard');
export const getEnrolledCourses = () => api.get('/student/courses');
export const getCourseDetails = (courseId) => api.get(`/student/courses/${courseId}`);
export const getCourseLessons = (courseId) => api.get(`/student/courses/${courseId}/lessons`);
export const markLessonCompleted = (lessonId) => api.post(`/student/lessons/${lessonId}/complete`, {});
export const getAssignments = () => api.get('/student/assignments');
export const submitAssignment = (assignmentId, data) => api.post(`/student/assignments/${assignmentId}/submit`, data);
export const getLiveClasses = () => api.get('/student/live-classes');
export const getProgress = () => api.get('/student/progress');
export const getCertificates = () => api.get('/student/certificates');
export const verifyCertificate = (credentialId) => api.get(`/student/certificates/verify/${credentialId}`);
export const getNotifications = () => api.get('/student/notifications');
export const markNotificationRead = (notificationId) => api.put(`/student/notifications/${notificationId}/read`, {});
