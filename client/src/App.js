import "./App.css";
import { Route } from "react-router-dom";

import Nav from "./Vistas/Nav";
import Filters from "./Vistas/Filters";
import CreateDog from "./Vistas/CreateDog";
import DetailDog from "./Vistas/DetailDog";
import Favorites from "./Vistas/Favorites";
import Quiz from "./Vistas/Quiz";
import Home from "./Vistas/Home";

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path="/" component={Home} />
      <Route exact path="/dogs" component={Filters} />
      <Route path="/dogs/:id" component={DetailDog} />
      <Route exact path="/create" component={CreateDog} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/quiz" component={Quiz} />
    </div>
  );
}

export default App;
