import './App.css';
import { Route } from "react-router-dom";

import Home from './Vistas/Home';
import Filters from './Vistas/Filters'
import CreateDog from './Vistas/CreateDog'

function App() {
  return (
    <div className="App">
      <Home />
      <Route exact path="/dogs" component={Filters} />
      <Route exact path="/create" component={CreateDog} />
    </div>
  );
}

export default App;
