import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: center;
`;

export const AgentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #ff4655;
  margin-top: 3rem;
`;

export const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #e53e3e;
  margin-top: 3rem;
`;
