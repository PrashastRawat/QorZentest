import {Router} from 'express'
import { protect, authorize } from '../middleware/auth.js'
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
import { getManageStudentsDirectory } from '../controllers/adminStudentController.js'
import uploadDocument from '../middleware/uploadDocument.js'

const router = Router()

// Public route — no auth required
router.get('/certificates/verify/:credentialId', verifyCertificate)

router.use(protect)

// Admin-only — must come before any "/:something" style routes below would
// otherwise be able to swallow it. Since none of the routes below use a
// path-level param at this depth, order isn't actually load-bearing here,
// but keeping it grouped up top makes the admin-only surface easy to spot.
router.get('/admin/directory', authorize('admin'), getManageStudentsDirectory)
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