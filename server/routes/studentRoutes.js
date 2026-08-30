import {Router} from 'express'
import { protect } from '../middleware/auth.js'
import{
    getStudentDashboard,
    getEnrolledCourses,
    getEnrolledTrainings,
    markLessonCompleted,
    getCourseDetails,
    getCourseLessons,
    getAssignments,
    submitAssignment,
    getProgress,
    getCertificates,
    verifyCertificate,
    getNotifications,
    markNotificationRead,
    getLiveClasses,
    deleteNotification,
} from '../controllers/studentController.js'
import uploadDocument from '../middleware/uploadDocument.js'

const router = Router()

// Public route — no auth required
router.get('/certificates/verify/:credentialId', verifyCertificate)

router.use(protect)
router.get('/dashboard', getStudentDashboard)
router.get('/courses', getEnrolledCourses)
router.get('/courses/:courseId', getCourseDetails)
router.get('/courses/:courseId/lessons', getCourseLessons)
router.post('/lessons/:lessonId/complete', markLessonCompleted)
router.get('/assignments', getAssignments)
router.post('/assignments/:assignmentId/submit', uploadDocument.single('file'), submitAssignment)
router.get('/progress', getProgress)
router.get('/certificates', getCertificates)
router.get('/notifications', getNotifications)
router.put('/notifications/:notificationId/read', markNotificationRead)
router.get('/live-classes', getLiveClasses)
router.get('/trainings', getEnrolledTrainings)
router.delete('/notifications/:notificationId', deleteNotification)

export default router;