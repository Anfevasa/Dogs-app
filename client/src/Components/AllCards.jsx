import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites } from "../redux/Actions";


//paginado y renderizado de cartas

export default function AllCards({dogsArray}) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites)

  const handleClick = (e,dog) =>{
    dispatch(addFavorites(dog));
    e.currentTarget.disabled = true;
  }

  return (
    <div>
      {dogsArray ? (
        dogsArray.map((dog) => (dog &&
          <div key={dog.ID}>
            <Link to = {`/dogs/${dog.ID}`}>
              <Card props={dog} />
            </Link>
            <button onClick={e=>handleClick(e,dog)} disabled={favorites.find(d => d.ID === dog.ID)?true:false}> Añadir a favoritos</button>
            <hr/>
          </div>
        ))
      ) : (
        <h2> no hay datos </h2>
      )}
    </div>
  );
}
