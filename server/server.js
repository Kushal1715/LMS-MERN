require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const courseRoutes = require("./routes/instructor-routes/course-routes");
const studentCourseRoutes = require("./routes/student-routes/course-routes");
const studentOrderRoutes = require("./routes/student-routes/order-routes");
const studentBoughtCourseRoutes = require("./routes/student-routes/boughtcourse-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

//routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", courseRoutes);
app.use("/student/course", studentCourseRoutes);
app.use("/student/order", studentOrderRoutes);
app.use("/student/bought-course", studentBoughtCourseRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
