const express = require("express")
const router = express.Router()
const Expense = require("../models/expense")

// CREATE
router.post("/create", async (req, res) => {
  try {
    const expense = await Expense.createExpense(req.body)
    res.send(expense)
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

// READ - all expenses for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const expenses = await Expense.getExpensesByUserId(req.params.userId)
    res.send(expenses)
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

module.exports = router