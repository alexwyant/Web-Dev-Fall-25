const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();

router

// CREATE
.post("/create", async (req, res) => {
  try {
    const expense = await Expense.createExpense(req.body);
    res.send(expense);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// READ (by Entity ID)
.get("/get/:expenseId", async (req, res) => {
  try {
    const expense = await Expense.getExpenseById(req.params.expenseId);
    res.send(expense);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// UPDATE (by Entity ID)
.put("/update/:expenseId", async (req, res) => {
  try {
    const expense = await Expense.updateExpense(req.params.expenseId, req.body);
    res.send(expense);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
})

// DELETE (by Entity ID)
.delete("/delete/:expenseId", async (req, res) => {
  try {
    await Expense.deleteExpense(req.params.expenseId);
    res.send({ message: "Expense deleted" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;