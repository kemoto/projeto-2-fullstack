import { useMemo, useState } from "react";

import Header from "../Header";
import SearchBar from "../SearchBar";
import AgentCard from "../AgentCard";
import GlobalStyles from "../GlobalStyles";

import { useAgents } from "../../contexts/hooks";

import {
  AppContainer,
  AgentsGrid,
  LoadingMessage,
  ErrorMessage
} from "./styles";

function Home() {
  const { agents, loading, error } = useAgents();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = useMemo(() => {
    if (!searchTerm) return agents;
    const q = searchTerm.toLowerCase();
    return agents.filter((agent) =>
      agent.displayName.toLowerCase().includes(q)
    );
  }, [agents, searchTerm]);

  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading && <LoadingMessage>Carregando agentes...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <AgentsGrid>
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <AgentCard key={agent.uuid} agent={agent} />
            ))
          ) : (
            <p>Nenhum agente encontrado.</p>
          )}
        </AgentsGrid>
      )}
    </AppContainer>
  );
}

export default Home;
