import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllCards from "../Components/AllCards";
import Card from "../Components/Card";
import { Puntuacion } from "../Utils/Favorites";

import S from "./Styles/Favorites.module.css"

export default function Favorites() {
  const favoritesArray = useSelector((state) => state.favorites);
  const allDogs = useSelector((state) => state.dogsCopy);
  // console.log(favoritesArray)

  const [likes, setLikes] = useState([]);
  const [random, setRandom] = useState(Math.random());

  let bestDogs = Puntuacion(likes, allDogs);
  //setSugerencias(bestDogs);
  //console.log(bestOptions)

  const handleClick = (e) => {
    //console.log(e.currentTarget.innerHTML)
    const dog = allDogs[Math.floor(random * allDogs.length)];
    const valor = e.currentTarget.innerHTML === " like " ? 1 : -1;
    setLikes([...likes, [dog, valor]]);
    setRandom(Math.random());
  };

  return (
    <div>
      <h1 className={S.Title} >Favoritos</h1>
      <p> Para ayudarte a descubrir cuales son tus perros favoritos te presentaremos, de manera aleatoria, distintos perritos. Déjanos saber que piensas de ellos y te mostraremos unas cuantas sugerencias que pueden ser de tu interes. </p>
      <div className={S.divLike}>
        {allDogs.length ? (
          <div className={S.LikeContainer}>
            <h3 className={S.LikeTitle}>¿Qué piensas de este?</h3>
            <Card props={allDogs[Math.floor(random * allDogs.length)]} />
            <button className={S.LikeButton} onClick={(e) => handleClick(e)}> 👍🏻 </button>
            <button className={S.LikeButton} onClick={(e) => setRandom(Math.random())}> next </button>
            <button className={S.LikeButton} onClick={(e) => handleClick(e)}> 👎🏻</button>
          </div>
        ) : (
          <h4> aún no hay datos </h4>
        )}
      </div>
      <hr />
      <div>
        <h2>Sugerencias para ti</h2>
        <p> Estas recomendaciones se dan después de analizar patrones en los perros que te gustan</p>
        
        {bestDogs ? (
          <div>
            <AllCards dogsArray={bestDogs} />
          </div>
        ) : (
          <h4> No hay sugerencias </h4>
        )}
        <hr />
      </div>
      <div>
        <h3>Tus favoritos</h3>
        {favoritesArray.length ? (
          <AllCards dogsArray={favoritesArray} />
        ) : (
          <h4> aún no hay datos </h4>
        )}
      </div>
    </div>
  );
}
