const con = require("./db_connect")

async function createExpenseTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Expense (
      ExpenseID INT NOT NULL AUTO_INCREMENT,
      UserID INT NOT NULL,
      Description VARCHAR(255) NOT NULL,
      Amount DECIMAL(10,2) NOT NULL,
      ExpenseDate DATE NOT NULL,
      CONSTRAINT expensePK PRIMARY KEY (ExpenseID),
      CONSTRAINT expenseUserFK FOREIGN KEY (UserID)
        REFERENCES User(UserID)
    );
  `
  await con.query(sql)
}

createExpenseTable()

// CREATE
async function createExpense(expense) {
  let sql = `
    INSERT INTO Expense (UserID, Description, Amount, ExpenseDate)
    VALUES (?, ?, ?, ?);
  `
  await con.query(sql, [
    expense.userID,
    expense.description,
    expense.amount,
    expense.expenseDate
  ])

  const [rows] = await con.query(
    "SELECT * FROM Expense WHERE ExpenseID = LAST_INSERT_ID();"
  )
  return rows[0]
}

// READ - all expenses for a user
async function getExpensesByUserId(userId) {
  let sql = `
    SELECT * FROM Expense
    WHERE UserID = ?
    ORDER BY ExpenseDate DESC, ExpenseID DESC;
  `
  const [rows] = await con.query(sql, [userId])
  return rows
}

module.exports = { createExpense, getExpensesByUserId }