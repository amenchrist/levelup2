import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

//   const setMode = (e) => {
//     setCurrentMode(e.target.value);
//     localStorage.setItem('themeMode', e.target.value);
//     setThemeSettings(false);
//   };

//   const setColor = (color) => {
//     setCurrentColor(color);
//     localStorage.setItem('colorMode', color);
//     setThemeSettings(false);
//   };

  const contextStateVars = {
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);