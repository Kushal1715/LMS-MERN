const Course = require("../../../models/Course");

const getStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (level.length) {
      filters.level = { $in: level.split(",") };
    }

    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;

      default:
        sortParam.pricing = 1;
        break;
    }
    const courseList = await Course.find(filters).sort(sortParam);

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
