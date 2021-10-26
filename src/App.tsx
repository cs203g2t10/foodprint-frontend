import Header from './components/Header'
import { useState } from "react";
import { AppContext } from "./lib/AppContext";
import Routes from './Routes';
import Footer from './components/Footer';


function App() {
  
  const [isAuthenticated, setIsAuthenticated ] = useState<any>(window.localStorage.getItem("token"));

  return (
    <div className="App" >
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Header />
        <Routes />
        <Footer/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
