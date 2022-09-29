import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,  useSelector} from "react-redux";
import { addFavorites } from "../redux/Actions";
import C from './Card.module.css'

export default function Card({ props , fav }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites)

  const handleClick = (e,dog) =>{
    dispatch(addFavorites(dog));
    e.currentTarget.disabled = true;
  }
  
  return (
    <div className={C.Card}>
      <Link to={`/dogs/${props.ID}`}>
        <h1 className={C.CardName}>{props.nombre}</h1>
      </Link>
      <img src={props.img} alt ={props.ID} width={250}/>
      <div className={C.Detail}>
        <h4 className={C.CardTitle}>Peso:</h4>
        <h5 className={C.CardText}>{props.peso + " Kg"}</h5>
        <h4 className={C.CardTitle}>Tempers: </h4>
        <h5 className={C.CardText}>{props.tempers}</h5>
      </div>
      <button className={C.button} onClick={e=>handleClick(e,props)} disabled={fav || favorites.find(d => d.ID === props.ID)?true:false}> Añadir a favoritos ♡</button>
    </div>
  );
}
