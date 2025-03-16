const CourseProgress = require("../../../models/CourseProgress");
const StudentCourses = require("../../../models/StudentCourses");
const Course = require("../../../models/Course");

//mark current lecture as viewed
const markCurrentLectureAsViewed = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//get current course progress
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentCourses = await StudentCourses.findOne({ userId });
    if (!studentCourses) {
      return res.status(404).json({
        succcess: false,
        message: "you dont have any bought courses",
      });
    }

    const isCourseBoughtOrNot =
      studentCourses.courses.findIndex(
        (course) => course.courseId === courseId
      ) > -1;

    if (!isCourseBoughtOrNot) {
      return res.status(200).json({
        success: false,
        message: "you have not bought this course",
      });
    }

    const courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (courseProgress.lecturesProgress.length === 0) {
      const courseDetails = await Course.findById(courseId);

      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          message: "course not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "No progress found, you can start watching the course",
        data: {
          courseDetails,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: courseProgress.lecturesProgress,
        completed: courseProgress.completed,
        completedData: courseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//reset course progress
const resetCourseProgress = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCourseProgress,
};
