const express = require("express");
const {
  getStudentViewCourses,
  getStudentViewCourseDetails,
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

router.get("/get", getStudentViewCourses);
router.get("/get-details/:id/:studentId", getStudentViewCourseDetails);

module.exports = router;
