const db = require("../config/db");

const User = {
  findByEmail: async (email) => {
    console.log("Executing query: SELECT * FROM users WHERE email = ?", email); // Log the query
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("Query result:", user); // Log the result
    return user;
  },
  create: async (userData) => {
    console.log("Creating user with data:", userData); // Log the user data
    const { google_id, email, name } = userData;
    const [result] = await db.query(
      "INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)",
      [google_id, email, name]
    );
    console.log("Insert result:", result); // Log the insert result
    return result.insertId;
  },
};

module.exports = User;
