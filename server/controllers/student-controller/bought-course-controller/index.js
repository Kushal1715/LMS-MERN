const StudentCourses = require("../../../models/StudentCourses");

const getStudentBoughtCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const getCourses = await StudentCourses.findOne({ userId: studentId });

    if (!getCourses) {
      return res.status(404).json({
        success: false,
        message: "courses not found",
      });
    }

    res.status(200).json({
      success: true,
      data: getCourses,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = { getStudentBoughtCourses };
