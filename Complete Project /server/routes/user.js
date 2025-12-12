const express = require("express");
const User = require("../models/user");
const router = express.Router();

router

// READ - get all users
.get("/getUsers", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// READ - login
.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body);
    res.send({ ...user, Password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// CREATE - register
.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body);
    res.send({ ...user, Password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// UPDATE - update password (by UserID)
.put("/updatePassword/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updatePassword(
      req.params.userId,
      req.body.newPassword
    );
    res.send({ ...updatedUser, Password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// DELETE - delete user (by UserID)
.delete("/deleteUser/:userId", async (req, res) => {
  try {
    await User.deleteUser(req.params.userId);
    res.send({ message: "User deleted" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;