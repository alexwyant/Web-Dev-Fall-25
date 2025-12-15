const express = require("express")
const router = express.Router()
const User = require("../models/user")

// READ – get all users (optional but fine)
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.send(users)
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

// READ – login
router.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body)
    res.send({ ...user, Password: undefined })
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

// CREATE – register
router.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body)
    res.send({ ...user, Password: undefined })
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

module.exports = router