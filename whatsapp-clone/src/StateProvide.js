import React, { createContext, useReducer } from "react";
import { useContext } from "react";

export const StateContext = createContext();

export const StateProvide = ({ reducer, intialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, intialState)}>
    {children}
  </StateContext.Provider>
);

export const useStatevalue = () => useContext(StateContext);
