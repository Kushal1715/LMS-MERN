const express = require("express");
const {
  getStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

router.get("/get", getStudentViewCourses);
router.get("/get-details/:id", getStudentViewCourseDetails);
router.get("/check-purchase/:courseId/:studentId", checkCoursePurchaseInfo);

module.exports = router;
