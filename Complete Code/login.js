// Assignment 5 - Login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const loginData = {
    usernameOrEmail: document.getElementById("login_identifier").value,
    password: document.getElementById("login_password").value
  };

  // Requirement: just print the object to the console
  console.log(loginData);
});