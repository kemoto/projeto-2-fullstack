export const getAgents = async () => {
  const url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Erro ao buscar agentes:", error);
    throw error;
  }
};
