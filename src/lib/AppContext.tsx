import React from "react";

interface AppContextInterface {
  isAuthenticated: Boolean;
  setIsAuthenticated: (b : Boolean) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: (b: Boolean) => {}
});

export function useAppContext() {
  return React.useContext(AppContext);
}