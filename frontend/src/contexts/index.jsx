/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from "react";
import { agentsReducer, initialState } from "./reducer";
import { getAgents } from "./api";
import { AgentsContext } from "./context";

export const AgentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agentsReducer, initialState);

  useEffect(() => {
    const fetchAgents = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await getAgents();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Não foi possível carregar os agentes.",
        });
      }
    };
    fetchAgents();
  }, []);

  return (
    <AgentsContext.Provider value={state}>{children}</AgentsContext.Provider>
  );
};
