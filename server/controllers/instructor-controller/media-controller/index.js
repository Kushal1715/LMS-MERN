const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../../../helpers/cloudinary");

const uploadMedia = async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "failed to upload media",
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "asset id is required",
      });
    }

    await deleteMediaFromCloudinary(id);

    res.status(200).json({
      success: true,
      message: "media deleted successfully from cloudinary",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "failed to delete media",
    });
  }
};

const bulkUploadMedia = async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = { uploadMedia, deleteMedia };
