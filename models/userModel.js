const db = require("../config/db");

const User = {
  findByEmail: async (email) => {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return user;
  },
  create: async (userData) => {
    const { google_id, email, name } = userData;
    const [result] = await db.query(
      "INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)",
      [google_id, email, name]
    );
    return result.insertId;
  },
};

module.exports = User;
