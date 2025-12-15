const expenseForm = document.getElementById("expenseForm")

expenseForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    window.location.href = "login.html"
    return
  }

  const expense = {
    userID: user.UserID,
    description: document.getElementById("description").value,
    amount: document.getElementById("amount").value,
    expenseDate: document.getElementById("expenseDate").value
  }

  const response = await fetch("/expenses/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  })

  const data = await response.json()

  if (data.message) {
    alert(data.message)
    return
  }

  alert("Expense saved!")
  expenseForm.reset()
})