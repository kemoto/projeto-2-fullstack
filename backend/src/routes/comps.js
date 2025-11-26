const express = require("express");
const { listByUser, create } = require("../models/compsModel");
const { securityLog } = require("../config/securityLog");
const { sanitizeText, sanitizeMap } = require("../config/sanitize");

const router = express.Router();

const cache = new Map();
const TTL_MS = 30_000;

function cacheKey(userId, map) {
  return `${userId}::${map || "*"}`;
}

function validateComp(body) {
  const name = sanitizeText(body?.name);
  const map = sanitizeMap(body?.map);
  const agentUuids = body?.agentUuids;

  if (!name) return { ok: false, error: "name é obrigatório" };
  if (name.length > 40) return { ok: false, error: "name muito longo (máx 40)" };

  if (!map) return { ok: false, error: "map inválido" };

  if (!Array.isArray(agentUuids) || agentUuids.length !== 5)
    return { ok: false, error: "agentUuids deve ter 5 agentes" };

  if (agentUuids.some((x) => !x))
    return { ok: false, error: "não pode ter agente vazio" };

  if (new Set(agentUuids).size !== agentUuids.length)
    return { ok: false, error: "não pode repetir agente" };

  return { ok: true, data: { name, map, agentUuids } };
}

router.get("/", async (req, res) => {
  try {
    const map = sanitizeMap(req.query.map);
    const key = cacheKey(req.user.id, map || "");

    const cached = cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      securityLog("comps_search", { userId: req.user.id, map: map || null, cached: true, ip: req.ip });
      return res.json({ items: cached.data, cached: true });
    }

    const comps = await listByUser({ userId: req.user.id, map: map || null });

    cache.set(key, { data: comps, expiresAt: Date.now() + TTL_MS });
    securityLog("comps_search", { userId: req.user.id, map: map || null, cached: false, ip: req.ip });

    res.json({ items: comps, cached: false });
  } catch {
    res.status(500).json({ error: "erro no servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const v = validateComp(req.body);
    if (!v.ok) return res.status(400).json({ error: v.error });

    const created = await create(req.user.id, v.data);

    cache.clear();
    securityLog("comps_create", { userId: req.user.id, map: v.data.map, name: v.data.name, ip: req.ip });

    res.status(201).json({ id: created.id });
  } catch {
    res.status(500).json({ error: "erro no servidor" });
  }
});

module.exports = router;
