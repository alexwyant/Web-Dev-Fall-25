// Assignment 5 - Expense form (third form)
const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const expense = {
    expenseText: document.getElementById("expense_text").value
  };

  // Requirement: just print the object to the console
  console.log(expense);
});