// server/routes/user.js

const express = require('express')
const router = express.Router()

// Import the user model so we have access to its functions
const User = require('../models/user')

// GET /users
// This route returns all users from our "database"
router.get('/', (req, res) => {
  const users = User.getUsers()
  res.json(users)
})

// Export the router so index.js can use it
module.exports = router