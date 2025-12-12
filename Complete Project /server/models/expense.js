// 1. import con to access database
const con = require("./db_connect");

// 2. create function that creates entity table if doesn't exist already
async function createExpenseTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Expense (
      ExpenseID INT NOT NULL AUTO_INCREMENT,
      UserID INT NOT NULL,
      Description VARCHAR(255) NOT NULL,
      Amount DECIMAL(10,2) NOT NULL,
      ExpenseDate DATE NOT NULL,
      CONSTRAINT expensePK PRIMARY KEY (ExpenseID),
      CONSTRAINT expenseUserFK FOREIGN KEY (UserID) REFERENCES User(UserID)
    );
  `;
  await con.query(sql);
}

// 3. call function that creates table
createExpenseTable();

// 4. CRUD functions

// CREATE
async function createExpense(expense) {
  let sql = `
    INSERT INTO Expense (UserID, Description, Amount, ExpenseDate)
    VALUES ("${expense.userId}", "${expense.description}", "${expense.amount}", "${expense.expenseDate}")
  `;
  await con.query(sql);

  // return the newest expense (simple way)
  let getSql = `
    SELECT * FROM Expense
    WHERE ExpenseID = LAST_INSERT_ID();
  `;
  let result = await con.query(getSql);
  return result[0];
}

// READ (by Entity ID)  ✅ required by assignment
async function getExpenseById(expenseId) {
  let sql = `
    SELECT * FROM Expense
    WHERE ExpenseID = "${expenseId}";
  `;
  let result = await con.query(sql);
  return result[0];
}

// UPDATE (by Entity ID) ✅ required by assignment
async function updateExpense(expenseId, expense) {
  let sql = `
    UPDATE Expense
    SET Description="${expense.description}",
        Amount="${expense.amount}",
        ExpenseDate="${expense.expenseDate}"
    WHERE ExpenseID="${expenseId}";
  `;
  await con.query(sql);

  return await getExpenseById(expenseId);
}

// DELETE (by Entity ID) ✅ required by assignment
async function deleteExpense(expenseId) {
  let sql = `
    DELETE FROM Expense
    WHERE ExpenseID="${expenseId}";
  `;
  return await con.query(sql);
}

module.exports = { createExpense, getExpenseById, updateExpense, deleteExpense };