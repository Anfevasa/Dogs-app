import React from "react";
import Card from "./Card";
import S from './AllCards.module.css'

export default function AllCards({ dogsArray }) {
  return (
    <div className={S.Contenedor}>
      {dogsArray ? (
        dogsArray.map(
          (dog) =>
            dog && (
              <div key={dog.ID}>
                <Card props={dog} />
              </div>
            )
        )
      ) : (
        <h2> no hay datos </h2>
      )}
    </div>
  );
}
