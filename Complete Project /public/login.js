const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const loginData = {
    identifier: document.getElementById("login_identifier").value,
    password: document.getElementById("login_password").value
  }

  const response = await fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
  })

  const data = await response.json()

  if (data.message) {
    alert(data.message)
    return
  }

  localStorage.setItem("user", JSON.stringify(data))
  window.location.href = "expense.html"
})