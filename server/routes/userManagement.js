import express from "express"
import { 
    countTotalUsers, 
    countUsersWithEnrolledCourses, 
    countUsersEnrolledInCourses, 
    getAllUsers,
    getUserDetails,
    getEnrollmentData,
    getUserRegistrationsByMonth,
    getCompletedUsers
 } from "../controllers/adminUserManagement.js"

import { verifyAdminToken } from "../verifyAdminToken.js"

const router = express.Router()

router.get("/countTotalUsers", countTotalUsers)
router.get("/countEnrolledUsers", countUsersWithEnrolledCourses)
router.get("/courseEnrollees", countUsersEnrolledInCourses)
router.get("/getUsers", getAllUsers)
router.get("/getUserDetails/:userId", getUserDetails)
router.get("/getEnrollmentData", getEnrollmentData)
router.get("/getUserRegistrationsByMonth", getUserRegistrationsByMonth)
router.get("/getCompletedUsers", getCompletedUsers)

export default router;