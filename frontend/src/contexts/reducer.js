export const initialState = {
  loading: true,
  agents: [],
  error: null,
};

export function agentsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        agents: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error(`Ação não suportada: ${action.type}`);
  }
}