const expenseForm = document.getElementById("expenseForm");
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const expense = {
    expenseText: document.getElementById("expense_text").value
  };
  console.log(expense);
});