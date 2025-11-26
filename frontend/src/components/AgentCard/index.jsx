import { CardContainer, AgentImage, AgentName, AgentRole, AgentDescription } from './styles';

const AgentCard = ({ agent }) => {
  if (!agent) return null;

  return (
    <CardContainer>
      <AgentImage src={agent.fullPortraitV2 || agent.displayIcon} alt={agent.displayName} />
      <AgentName>{agent.displayName}</AgentName>
      {agent.role && <AgentRole>{agent.role.displayName}</AgentRole>}
      <AgentDescription>{agent.description}</AgentDescription>
    </CardContainer>
  );
};

export default AgentCard;