const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const { findByEmail } = require("../models/usersModel");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/jwt");
const { securityLog } = require("../config/securityLog");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 60* 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Tente novamente em instantes." },
});

const tokenBlacklist = new Map();

function blacklistToken(token) {
  try {
    const decoded = jwt.decode(token);
    const expMs = decoded?.exp ? decoded.exp * 1000 : Date.now() + 60 * 60 * 1000;
    tokenBlacklist.set(token, expMs);
  } catch {
    tokenBlacklist.set(token, Date.now() + 60 * 60 * 1000);
  }
}

function isBlacklisted(token) {
  const expMs = tokenBlacklist.get(token);
  if (!expMs) return false;
  if (Date.now() > expMs) {
    tokenBlacklist.delete(token);
    return false;
  }
  return true;
}

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").toLowerCase().trim();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      securityLog("auth_failed", { reason: "missing_fields", ip: req.ip, email });
      return res.status(400).json({ error: "email e password são obrigatórios" });
    }

    const user = await findByEmail(email);
    if (!user) {
      securityLog("auth_failed", { reason: "invalid_credentials", ip: req.ip, email });
      return res.status(401).json({ error: "credenciais inválidas" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      securityLog("auth_failed", { reason: "invalid_credentials", ip: req.ip, email });
      return res.status(401).json({ error: "credenciais inválidas" });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    securityLog("auth_success", { userId: user.id, ip: req.ip, email });
    res.json({ token });
  } catch {
    res.status(500).json({ error: "erro no servidor" });
  }
});

router.post("/logout", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token) {
    blacklistToken(token);
    securityLog("auth_logout", { ip: req.ip });
  }
  res.json({ ok: true });
});

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return res.status(401).json({ error: "não autorizado" });

  if (isBlacklisted(token)) {
    securityLog("auth_blocked_blacklist", { ip: req.ip });
    return res.status(401).json({ error: "token inválido" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    securityLog("auth_failed", { reason: "bad_token", ip: req.ip });
    return res.status(401).json({ error: "token inválido" });
  }
}

module.exports = { authRouter: router, requireAuth };
