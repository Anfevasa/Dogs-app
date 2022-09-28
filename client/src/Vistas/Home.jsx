import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/dogs"> Filtros </Link>
      <Link to="/create"> Create </Link>
      <Link to="/favorites"> Favorites </Link>
      <h3> Quiz </h3>
    </div>
  );
}
