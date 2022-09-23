import React from "react";

export default function Card({ name, props }) {
  return (
    <div>
      <h2>{props.nombre}</h2>
      <img src={props.img} alt ={props.ID}/>
      <h5> Tempers: {props.tempers}</h5>
    </div>
  );
}
