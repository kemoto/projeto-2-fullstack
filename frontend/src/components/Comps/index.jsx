/* eslint-disable no-empty */
import { useEffect, useMemo, useState } from "react";

import GlobalStyles from "../GlobalStyles";
import { useAuth } from "../../contexts/AuthContext";
import { useAgents } from "../../contexts/hooks";

import Header from "../Header";

import {
  Page,
  Card,
  Title,
  Filters,
  Select,
  Input,
  List,
  TeamItem,
  TeamHeader,
  TeamName,
  TeamMeta,
  Chips,
  Chip,
  ErrorText,
} from "./styles";

const API_URL = "http://localhost:3001";

const MAPS = [
  "",
  "Ascent",
  "Bind",
  "Haven",
  "Split",
  "Lotus",
  "Sunset",
  "Icebox",
  "Breeze",
  "Fracture",
  "Pearl",
];

export default function Comps() {
  const { token } = useAuth();
  const { agents } = useAgents();

  const [map, setMap] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const agentNameByUuid = useMemo(() => {
    const m = new Map();
    (agents || []).forEach((a) => m.set(a.uuid, a.displayName));
    return m;
  }, [agents]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const url = new URL(`${API_URL}/comps`);
        if (map) url.searchParams.set("map", map);

        const res = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = await res.text();
        let data = {};
        try {
          data = JSON.parse(raw);
        } catch {}

        if (!res.ok)
          throw new Error(
            data?.error || raw.slice(0, 120) || "Erro ao buscar comps"
          );

        setComps(data.items || []);
      } catch (e) {
        setErr(e.message || "Erro ao buscar comps");
        setComps([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, map]);

  const filteredComps = useMemo(() => {
    const q = nameQuery.trim().toLowerCase();
    if (!q) return comps;
    return comps.filter((t) =>
      String(t.name || "")
        .toLowerCase()
        .includes(q)
    );
  }, [comps, nameQuery]);

  return (
    <>
      <Header />
      <GlobalStyles />
      <Page>
        <Card>
          <Title>Buscar Comps</Title>

          <Filters>
            <Select value={map} onChange={(e) => setMap(e.target.value)}>
              {MAPS.map((m) => (
                <option key={m || "all"} value={m}>
                  {m ? m : "Todos os mapas"}
                </option>
              ))}
            </Select>

            <Input
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="Filtrar por nome"
            />
          </Filters>

          {err ? <ErrorText>{err}</ErrorText> : null}

          {!loading && !err && (
            <List>
              {filteredComps.length === 0 ? (
                <p>Nenhuma comp encontrado.</p>
              ) : (
                filteredComps.map((t) => (
                  <TeamItem key={t.id}>
                    <TeamHeader>
                      <TeamName>{t.name}</TeamName>
                      <TeamMeta>{t.map}</TeamMeta>
                    </TeamHeader>

                    <Chips>
                      {(t.agentUuids || []).map((uuid) => (
                        <Chip key={uuid}>
                          {agentNameByUuid.get(uuid) || uuid}
                        </Chip>
                      ))}
                    </Chips>
                  </TeamItem>
                ))
              )}
            </List>
          )}
        </Card>
      </Page>
    </>
  );
}
