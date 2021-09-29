import React from "react";

interface AppContextInterface {
  isAuthenticated: Boolean;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export function useAppContext() {
  return React.useContext(AppContext);
}

export { AppContext }