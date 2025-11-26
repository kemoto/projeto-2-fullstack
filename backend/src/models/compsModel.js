const db = require("../config/db");

function listByUser({ userId, map }) {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT id, name, map, agent_uuids_json, created_at
      FROM comps
      WHERE user_id = ?
    `;
    const params = [userId];

    if (map) {
      sql += ` AND map = ? `;
      params.push(map);
    }

    sql += ` ORDER BY id DESC `;

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      const items = rows.map((r) => ({
        id: r.id,
        name: r.name,
        map: r.map,
        agentUuids: JSON.parse(r.agent_uuids_json),
        createdAt: r.created_at,
      }));
      resolve(items);
    });
  });
}

function create(userId, { name, map, agentUuids }) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO comps (user_id, name, map, agent_uuids_json) VALUES (?, ?, ?, ?)",
      [userId, name, map, JSON.stringify(agentUuids)],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      }
    );
  });
}

module.exports = { listByUser, create };
