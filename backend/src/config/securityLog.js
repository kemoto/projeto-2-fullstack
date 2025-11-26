const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../../logs");
const LOG_FILE = path.join(LOG_DIR, "security.log");

function securityLog(event, meta = {}) {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

    const line = JSON.stringify({
      ts: new Date().toISOString(),
      event,
      ...meta,
    });

    fs.appendFileSync(LOG_FILE, line + "\n", "utf8");
  } catch {
  }
}

module.exports = { securityLog };
