import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllCards from "../Components/AllCards";
import Card from "../Components/Card";
import { Puntuacion } from "../Utils/Favorites";

export default function Favorites() {

  const favoritesArray = useSelector(state => state.favorites);
  const allDogs = useSelector(state => state.dogsCopy)
  // console.log(favoritesArray)

  const [likes,setLikes] = useState([]);
  const [sugerencias,setSugerencias] = useState([]);
  const [random,setRandom] = useState(Math.random());

  
  let bestDogs = Puntuacion(likes,allDogs)
  //setSugerencias(bestDogs);
  //console.log(bestOptions)

  const handleClick = (e)=>{
    //console.log(e.currentTarget.innerHTML)
    const dog = allDogs[Math.floor(random*allDogs.length)]
    const valor = e.currentTarget.innerHTML===" like " ? 1:-1;
    setLikes([...likes,[dog,valor]]); 
    setRandom(Math.random())}
  

  return (
    <div>
      <h1>Favorites</h1>
      <p> descripción página </p>
      <div>
        <h3>like/dislike</h3>
        {
         allDogs.length?
            <div>
                <Card props={allDogs[Math.floor(random*allDogs.length)]}/> 
                <button onClick={e => handleClick(e)}> like </button>
                <button onClick={e => setRandom(Math.random())}> next </button>
                <button onClick={e => handleClick(e)}> dislike </button>
                <hr/> 
            </div>          
          :
           <h4> aún no hay datos </h4> 
        }        
      </div>
      <div>
        <h3>Sugerencias</h3>
        <hr/>
        {
            bestDogs?
            <div>
                <AllCards dogsArray={bestDogs}/> 
            </div> 
            :
            <h4> No hay sugerencias </h4>  

        }
        <hr/>
        
      </div>
      <div>
        <h3>cards favorites</h3>
        {favoritesArray.length? <AllCards dogsArray={favoritesArray}/> : <h4> aún no hay datos </h4> }
                
      </div>
    </div>
  );
}
