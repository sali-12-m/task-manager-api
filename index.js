// Import Express
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Import environment variables
const { PORT, APP_NAME } = require("./config/env");

// Import task routes
const taskRoutes = require("./routes/taskRoutes");

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send(`${APP_NAME} is running successfully!`);
});

// Mount task routes
app.use("/api/tasks", taskRoutes);

// 404 handler (must come AFTER all routes)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// 500 handler (must be LAST)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});