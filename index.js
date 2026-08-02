const express = require("express");
const cors = require("cors");
const { PORT, APP_NAME } = require("./config/env");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`${APP_NAME} is running successfully!`);
});
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});
