import Header from './components/Header'
import { useState } from "react";
import { AppContext } from "./lib/contextLib";
import Routes from './Routes';
import Footer from './components/Footer';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(window.sessionStorage.getItem("token"));

  return (
    <div className="App" >
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
        <Header />
        <Routes />
        <Footer/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
