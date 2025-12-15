// 1. import con to access database
const con = require("./db_connect")

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
  `
  await con.query(sql)
}

// 3. call function that creates table
createUserTable()

// 4. CRUD functions

// READ – get all users
async function getAllUsers() {
  let sql = `
    SELECT * FROM User;
  `
  return await con.query(sql)
}

// helper – get user by username OR email
async function userExists(user) {
  const identifier = user.username || user.identifier

  let sql = `
    SELECT * FROM User
    WHERE Username = ? OR Email = ?
    LIMIT 1;
  `
  const [rows] = await con.query(sql, [identifier, identifier])
  return rows[0]
}

// helper – check email uniqueness
async function emailExists(user) {
  let sql = `
    SELECT * FROM User
    WHERE Email = ?
    LIMIT 1;
  `
  const [rows] = await con.query(sql, [user.email])
  return rows[0]
}

// READ – login
async function login(user) {
  let cuser = await userExists(user)

  if (!cuser) throw Error("User does not exist!")
  if (user.password !== cuser.Password) throw Error("Password incorrect!")

  return {
    UserID: cuser.UserID,
    Username: cuser.Username,
    Email: cuser.Email
  }
}

// CREATE – register
async function register(user) {
  let existingUser = await userExists({ username: user.username })
  if (existingUser) throw Error("Username already in use!")

  let existingEmail = await emailExists(user)
  if (existingEmail) throw Error("Email already in use!")

  let sql = `
    INSERT INTO User (Username, Password, Email)
    VALUES (?, ?, ?);
  `
  await con.query(sql, [user.username, user.password, user.email])

  const created = await userExists({ identifier: user.username })
  return {
    UserID: created.UserID,
    Username: created.Username,
    Email: created.Email
  }
}

module.exports = { getAllUsers, login, register }