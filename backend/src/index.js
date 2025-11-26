const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const https = require("https");

const { authRouter, requireAuth } = require("./routes/auth");
const compsRouter = require("./routes/comps");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/comps", requireAuth, compsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: `Rota não encontrada: ${req.method} ${req.path}`,
  });
});

const PORT = process.env.PORT || 3001;
const KEY_PATH = process.env.HTTPS_KEY;
const CERT_PATH = process.env.HTTPS_CERT;

if (KEY_PATH && CERT_PATH && fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)) {
  https
    .createServer(
      { key: fs.readFileSync(KEY_PATH), cert: fs.readFileSync(CERT_PATH) },
      app
    )
    .listen(PORT, () => console.log(`HTTPS: https://localhost:${PORT}`));
} else {
  app.listen(PORT, () => console.log(`HTTP: http://localhost:${PORT}`));
}
