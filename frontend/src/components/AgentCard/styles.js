import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #2d3748;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1rem;
  border: 1px solid #4a5568;
`;

export const AgentImage = styled.img`
  width: 100%;
`;

export const AgentName = styled.h2`
  font-size: 1.8rem;
  margin: 1rem 0 0.5rem;
  color: #FF4655;
  text-transform: uppercase;
`;

export const AgentRole = styled.p`
  font-size: 1rem;
  color: #cbd5e0;
  margin-bottom: 0.5rem;
`;

export const AgentDescription = styled.p`
  font-size: 0.9rem;
  color: #a0aec0;
  padding: 0 1rem;
  display: -webkit-box;
  overflow: hidden;
`;