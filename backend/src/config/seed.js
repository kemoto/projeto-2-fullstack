const bcrypt = require("bcrypt");
const db = require("./db");

const EMAIL = "vitor@email.com";
const PASSWORD = "12345";

async function seedUser() {
  return new Promise((resolve, reject) => {
    db.get("SELECT id FROM users WHERE email = ?", [EMAIL], async (err, row) => {
      if (err) return reject(err);
      if (row) return resolve();

      const hash = await bcrypt.hash(PASSWORD, 10);
      db.run(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        [EMAIL, hash],
        (insErr) => {
          if (insErr) return reject(insErr);
          console.log(`[seed] usuário criado: ${EMAIL} / ${PASSWORD}`);
          resolve();
        }
      );
    });
  });
}

module.exports = { seedUser };
