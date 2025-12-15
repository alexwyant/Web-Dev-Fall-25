const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const user = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    // your routes return { message: "..." } on errors
    if (!response.ok || data.message) {
      alert(data.message || "Register failed.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "expense.html";
  } catch (err) {
    console.error(err);
    alert("Register failed. Open DevTools console to see the error.");
  }
});