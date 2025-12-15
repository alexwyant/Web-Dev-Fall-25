const expenseForm = document.getElementById("expenseForm");

// Require login to access expense page
const currentUser = JSON.parse(localStorage.getItem("user"));
if (!currentUser) {
  window.location.href = "login.html";
}

expenseForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const expense = {
    userID: user.UserID,
    description: document.getElementById("description").value.trim(),
    amount: document.getElementById("amount").value,
    expenseDate: document.getElementById("expenseDate").value
  };

  try {
    const response = await fetch("/expenses/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });

    const data = await response.json();

    if (!response.ok || data.message) {
      alert(data.message || "Expense save failed.");
      return;
    }

    alert("Expense saved!");
    expenseForm.reset();
  } catch (err) {
    console.error(err);
    alert("Expense save failed. Open DevTools console to see the error.");
  }
});

// Optional logout button support
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
}