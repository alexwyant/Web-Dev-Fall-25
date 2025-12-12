// 1. import con to access database
const con = require("./db_connect");

// 2. create function that creates entity table if doesn't exist already
async function createUserTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS User (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(255) NOT NULL UNIQUE,
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL,
      CONSTRAINT userPK PRIMARY KEY (UserID)
    );
  `;
  await con.query(sql);
}

// 3. call function that creates table
createUserTable();

// 4. CRUD / auth functions

// READ - get all users
async function getAllUsers() {
  let sql = `
    SELECT * FROM User;
  `;
  return await con.query(sql);
}

// helper - check if user exists by username
async function userExists(user) {
  let sql = `
    SELECT * FROM User
    WHERE Username="${user.username}";
  `;
  let cuser = await con.query(sql);
  return cuser[0];
}

// READ - login
async function login(user) {
  let cuser = await userExists(user);

  if (!cuser) throw Error("Username does not exist!");
  if (user.password !== cuser.Password) throw Error("Password incorrect!");

  return cuser;
}

// CREATE - register
async function register(user) {
  let cuser = await userExists(user);
  if (cuser) throw Error("Username already in use!");

  let sql = `
    INSERT INTO User (Username, Password, Email)
    VALUES("${user.username}", "${user.password}", "${user.email}");
  `;
  await con.query(sql);

  return await userExists(user);
}

// UPDATE - update a user password by UserID  (this gives you a true CRUD "U")
async function updatePassword(userId, newPassword) {
  let sql = `
    UPDATE User
    SET Password="${newPassword}"
    WHERE UserID="${userId}";
  `;
  await con.query(sql);

  // return updated user (optional)
  let userSql = `
    SELECT * FROM User
    WHERE UserID="${userId}";
  `;
  let result = await con.query(userSql);
  return result[0];
}

// DELETE - delete user by UserID (true CRUD "D")
async function deleteUser(userId) {
  let sql = `
    DELETE FROM User
    WHERE UserID="${userId}";
  `;
  return await con.query(sql);
}

// 5. export all functions so accessible by corresponding route file
module.exports = {
  getAllUsers,
  login,
  register,
  updatePassword,
  deleteUser
};