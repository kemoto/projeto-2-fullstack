/* eslint-disable no-empty */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header";
import { useAgents } from "../../contexts/hooks";
import { useAuth } from "../../contexts/AuthContext";

import {
  Page,
  Card,
  Title,
  Form,
  Field,
  Label,
  Input,
  Select,
  ErrorText,
  SubmitButton,
  Hint,
} from "./styles";

const API_URL = "http://localhost:3001";

const MAPS = [
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

export default function CreateComp() {
  const nav = useNavigate();
  const { agents } = useAgents();
  const { token } = useAuth();

  const agentOptions = useMemo(() => {
    return (agents || [])
      .slice()
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [agents]);

  const [name, setName] = useState("");
  const [map, setMap] = useState(MAPS[0]);
  const [slots, setSlots] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function setSlot(i, val) {
    setSlots((prev) => prev.map((x, idx) => (idx === i ? val : x)));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Dê um nome para a composição.");
    if (slots.some((s) => !s)) return setError("Selecione os 5 agentes.");
    if (new Set(slots).size !== slots.length)
      return setError("Não pode repetir agente.");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/comps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim(), map, agentUuids: slots }),
      });

      const raw = await res.text();

      console.log("POST /comps status:", res.status, "raw:", raw);
      
      let data = {};
      try {
        data = JSON.parse(raw);
      } catch {}

      if (!res.ok) throw new Error(data?.error || "erro ao salvar");

      nav("/comps", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const disabledAgents = new Set(slots.filter(Boolean));

  return (
    <>
      <Header />

      <Page>
        <Card>
          <Title>Nova composição</Title>
          <Hint>Escolha um mapa e defina 5 agentes (sem repetição).</Hint>

          <Form onSubmit={onSubmit}>
            <Field>
              <Label>Nome</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Mapa</Label>
              <Select value={map} onChange={(e) => setMap(e.target.value)}>
                {MAPS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </Field>

            {slots.map((uuid, i) => (
              <Field key={i}>
                <Label>Agente {i + 1}</Label>
                <Select
                  value={uuid}
                  onChange={(e) => setSlot(i, e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {agentOptions.map((a) => {
                    const selectedElsewhere =
                      disabledAgents.has(a.uuid) && a.uuid !== uuid;
                    return (
                      <option
                        key={a.uuid}
                        value={a.uuid}
                        disabled={selectedElsewhere}
                      >
                        {a.displayName}
                      </option>
                    );
                  })}
                </Select>
              </Field>
            ))}

            {error ? <ErrorText>{error}</ErrorText> : null}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar composição"}
            </SubmitButton>
          </Form>
        </Card>
      </Page>
    </>
  );
}
