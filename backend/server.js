const dotenv = require("dotenv").config();
const express = require("express");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const workerRoutes = require("./routes/workerRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("QuickMate");
});
app.use("/api/user", userRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/job", jobRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running at port ${PORT}`));
