import Header from './components/Header'
import {Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path = "/home" component={Home}/>
      <Route exact path = "/about" component={About}/>

    </div>
  );
}

export default App;
