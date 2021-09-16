import Header from './components/Header'
import { useState } from "react";
import { AppContext } from "./lib/contextLib";
import Routes from './Routes';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Header />
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
