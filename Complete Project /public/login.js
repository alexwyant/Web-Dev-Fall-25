const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const loginData = {
    usernameOrEmail: document.getElementById("login_identifier").value,
    password: document.getElementById("login_password").value
  };
  console.log(loginData);
});