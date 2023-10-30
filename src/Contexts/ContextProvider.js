import React, { createContext, useContext, useState } from 'react';
import {db} from '../data/db'

const StateContext = createContext();


export const ContextProvider = ({ children }) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(true);
  const [ content ] = useState(db);

  const contextStateVars = {
    isLoggedIn, setIsLoggedIn, content
  }

  return (
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);