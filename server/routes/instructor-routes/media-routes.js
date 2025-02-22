const express = require("express");
const multer = require("multer");
const {
  uploadMedia,
  deleteMedia,
  bulkUploadMedia,
} = require("../../controllers/instructor-controller/media-controller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadMedia);
router.post("/bulk-upload", upload.array("files", 10), bulkUploadMedia);
router.delete("/delete/:id", deleteMedia);

module.exports = router;
