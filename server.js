const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LearnSpace Backend Server is running!",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/courses", courseRoutes);

app.use(errorMiddleware);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `LearnSpace backend running at http://localhost:${PORT}`
    );
  });
}

module.exports = app;