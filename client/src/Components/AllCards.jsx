import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";


//paginado y renderizado de cartas

export default function AllCards({dogsArray}) {

  //let renderData = dogsArray
  //console.log("asssss",dogsArray)
  return (
    <div>
      {dogsArray ? (
        dogsArray.map((dog) => (dog &&
          <div key={dog.ID}>
            <Link to = {`/${dog.ID}`}>
              <Card props={dog} />
            </Link>
          </div>
        ))
      ) : (
        <h2> no hay datos </h2>
      )}
    </div>
  );
}
