const ALLOWED_MAPS = new Set([
  "Ascent", "Bind", "Haven", "Split", "Lotus",
  "Sunset", "Icebox", "Breeze", "Fracture", "Pearl",
]);

function sanitizeText(s) {
  return String(s ?? "")
    .trim()
    .replace(/[<>`"'\\]/g, "")
    .replace(/\s+/g, " ");
}

function sanitizeMap(map) {
  const m = sanitizeText(map);
  return ALLOWED_MAPS.has(m) ? m : "";
}

module.exports = { sanitizeText, sanitizeMap, ALLOWED_MAPS };
