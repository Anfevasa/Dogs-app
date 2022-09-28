import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDogs, getAllTempers } from "../redux/Actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      await dispatch(getAllDogs());
      await dispatch(getAllTempers());
    }
    getData();
  }, [dispatch]);
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/dogs"> Filtros </Link>
      <Link to="/create"> Create </Link>
      <Link to="/favorites"> Favorites </Link>
      <Link to="/quiz"> Quiz </Link>
    </div>
  );
}
