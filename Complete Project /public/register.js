const registerForm = document.getElementById("registerForm")

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  const response = await fetch("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })

  const data = await response.json()

  if (data.message) {
    alert(data.message)
    return
  }

  localStorage.setItem("user", JSON.stringify(data))
  window.location.href = "expense.html"
})