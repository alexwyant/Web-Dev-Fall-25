const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const loginData = {
    identifier: document.getElementById("login_identifier").value.trim(),
    password: document.getElementById("login_password").value
  };

  try {
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!response.ok || data.message) {
      alert(data.message || "Login failed.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "expense.html";
  } catch (err) {
    console.error(err);
    alert("Login failed. Open DevTools console to see the error.");
  }
});