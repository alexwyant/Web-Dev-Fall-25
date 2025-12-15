require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Routes
const userRoutes = require("./server/routes/user");
const expenseRoutes = require("./server/routes/expense");

// CORS headers (fine to keep)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`));