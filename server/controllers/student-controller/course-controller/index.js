const Course = require("../../../models/Course");

const getStudentViewCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    if (courseList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "course not found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: courseList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  const { id } = req.params;

  const getCourseDetails = await Course.findById(id);
  if (!getCourseDetails) {
    return res.status(404).json({
      success: false,
      message: "course details not found",
    });
  }

  res.status(200).json({
    success: true,
    data: getCourseDetails,
  });
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = { getStudentViewCourseDetails, getStudentViewCourses };
