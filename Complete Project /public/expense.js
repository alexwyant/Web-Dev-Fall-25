const expenseForm = document.getElementById("expenseForm")
const expenseList = document.getElementById("expenseList")

// Require login to access expense page
const currentUser = JSON.parse(localStorage.getItem("user"))
if (!currentUser) {
  window.location.href = "login.html"
}

// Optional logout button support
const logoutBtn = document.getElementById("logoutBtn")
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user")
    window.location.href = "login.html"
  })
}

function getUserId() {
  const user = JSON.parse(localStorage.getItem("user"))
  return user?.UserID || user?.userID
}

function renderExpenses(expenses) {
  if (!expenses || expenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses yet.</p>"
    return
  }

  expenseList.innerHTML = ""

  expenses.forEach((e) => {
    const row = document.createElement("div")
    row.style.padding = "8px 0"
    row.style.borderBottom = "1px solid #ddd"

    const amt = Number(e.Amount).toFixed(2)
    const cleanDate = new Date(e.ExpenseDate).toLocaleDateString();
    row.textContent = `${cleanDate} — ${e.Description} — $${amt}`;

    expenseList.appendChild(row)
  })
}

async function loadExpenses() {
  const userId = getUserId()

  if (!userId) {
    expenseList.innerHTML = "<p>Please log in again.</p>"
    return
  }

  const response = await fetch(`/expenses/user/${userId}`)
  const data = await response.json()

  if (!response.ok || data.message) {
    expenseList.innerHTML = `<p>${data.message || "Could not load expenses."}</p>`
    return
  }

  renderExpenses(data)
}

expenseForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const userId = getUserId()
  if (!userId) {
    alert("No UserID found. Please log in again.")
    localStorage.removeItem("user")
    window.location.href = "login.html"
    return
  }

  const expense = {
    userID: userId,
    description: document.getElementById("description").value.trim(),
    amount: document.getElementById("amount").value,
    expenseDate: document.getElementById("expenseDate").value
  }

  const response = await fetch("/expenses/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  })

  const data = await response.json()

  if (!response.ok || data.message) {
    alert(data.message || "Expense save failed.")
    return
  }

  expenseForm.reset()
  loadExpenses()
})

// Load expenses when page loads
loadExpenses()