/* eslint-disable no-empty */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import GlobalStyles from "../GlobalStyles";
import {
  Page,
  Card,
  Title,
  Form,
  Field,
  Label,
  Input,
  ErrorText,
  SubmitButton,
} from "./styles";

const API_URL = "http://localhost:3001";

export default function Login() {
  const nav = useNavigate();
  const { isAuthed, login } = useAuth();

  const [email, setEmail] = useState("vitor@email.com");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthed) return <Navigate to="/" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const raw = await res.text();
      let data = {};
      try { data = JSON.parse(raw); } catch {}

      if (!res.ok) throw new Error(data?.error || "erro no login");

      login(data.token);
      nav("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <GlobalStyles />

      <Page>
        <Card>
          <Title>Login</Title>

          <Form onSubmit={onSubmit}>
            <Field>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Senha</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Field>

            {error ? <ErrorText>{error}</ErrorText> : null}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </SubmitButton>
          </Form>
        </Card>
      </Page>
    </>
  );
}
