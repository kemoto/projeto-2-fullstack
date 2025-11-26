import { useContext } from 'react';
import { AgentsContext } from './context';

export const useAgents = () => {
  const context = useContext(AgentsContext);
  if (context === undefined) {
    throw new Error('useAgents deve ser usado dentro de um AgentsProvider');
  }
  return context;
};