const express = require("express");
const {
  getStudentBoughtCourses,
} = require("../../controllers/student-controller/bought-course-controller");

const router = express.Router();

router.get("/getCourses/:studentId", getStudentBoughtCourses);

module.exports = router;
