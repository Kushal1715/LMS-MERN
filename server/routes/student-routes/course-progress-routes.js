const express = require("express");
const {
  getCurrentCourseProgress,
} = require("../../controllers/student-controller/courseProgress-controller");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);

module.exports = router;
