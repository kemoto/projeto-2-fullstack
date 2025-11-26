const db = require("../config/db");

function findByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, email, password_hash FROM users WHERE email = ?",
      [email],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });
}

module.exports = { findByEmail };
