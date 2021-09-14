import Header from './components/Header'
import {Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path = "/home" component={Home}/>
      <Route exact path = "/about" component={About}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/register" component={Register}/>

    </div>
  );
}

export default App;
