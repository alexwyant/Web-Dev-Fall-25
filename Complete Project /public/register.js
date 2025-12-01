const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stops page from reloading

  const user = {
    firstName: document.getElementById("first_name").value,
    lastName: document.getElementById("last_name").value,
    usernameOrEmail: document.getElementById("username_or_email").value,
    password: document.getElementById("password").value
  };
  console.log(user);
});