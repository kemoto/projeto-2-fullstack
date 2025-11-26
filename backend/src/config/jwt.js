const JWT_SECRET = process.env.JWT_SECRET || "SECRET-KEY";
const JWT_EXPIRES_IN = "2h";

module.exports = { JWT_SECRET, JWT_EXPIRES_IN };
