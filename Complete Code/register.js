// Assignment 5 - Register form
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stops the page from reloading

  const user = {
    firstName: document.getElementById("first_name").value,
    lastName: document.getElementById("last_name").value,
    usernameOrEmail: document.getElementById("username_or_email").value,
    password: document.getElementById("password").value
  };

  // Requirement: just print the object to the console
  console.log(user);
});