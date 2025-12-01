// server/models/user.js
// Simple in-memory "database" for Assignment 6

// Temporary user data - this will eventually match your real DB table
const users = [
  { userId: 12345, userName: "orca123", password: "password123" },
  { userId: 55555, userName: "alex23", password: "test123" }
];

// Function to get all users
function getUsers() {
  return users;
}

// Export the function so routes can call it
module.exports = {
  getUsers
};