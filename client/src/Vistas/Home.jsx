import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/dogs"> Filtros </Link>
      <Link to="/create"> Create </Link>
      <h3> About </h3>
      <h3> Favorites </h3>
      <h3> Quiz </h3>
    </div>
  );
}
