import './App.css';
import { Route } from "react-router-dom";

import Home from './Vistas/Home';
import Filters from './Vistas/Filters'
import CreateDog from './Vistas/CreateDog'
import DetailDog from './Vistas/DetailDog'
import Favorites from './Vistas/Favorites';

function App() {
  return (
    <div className="App">
      <Home />
      <Route exact path="/dogs" component={Filters} />
      <Route path="/dogs/:id" component={DetailDog} />
      <Route exact path="/create" component={CreateDog} />
      <Route exact path="/favorites" component={Favorites}/>
    </div>
  );
}

export default App;
