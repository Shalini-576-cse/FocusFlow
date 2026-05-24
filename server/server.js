const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();


// Connect MongoDB

connectDB();


// Middleware

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://focus-flow-3fyu4i3fz-shalini-576-cses-projects.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  })
);


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);


// Test Route

app.get("/", (req, res) => {

  res.send("FocusFlow API Running 🚀");

});


// Server

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});