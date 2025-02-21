const Course = require("../../../models/Course");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    if (savedCourse) {
      res.status(201).json({
        success: true,
        message: "new course created successfully",
        data: savedCourse,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});
    res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const getCourseDetails = await Course.findById(id);

    if (!getCourseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: getCourseDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedCourseData } = req.body;

    console.log(updatedCourseData);

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      {
        new: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the course",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
};
