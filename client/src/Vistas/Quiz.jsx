import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllCards from "../Components/AllCards";
import Card from "../Components/Card";
import { dogClones } from "../Utils/Quiz";

import S from "./Styles/Quiz.module.css"

export default function Quiz() {
  const dogsTempers = useSelector((state) => state.tempers);
  const allDogs = useSelector(state => state.dogsCopy)

  const [personality, setPersonality] = useState([]);

  let bestDogs = dogClones(personality,allDogs)
  

  const handleTempers = (e) => {
    if (!personality.find((t) => t.ID === e.target.value)) {
      setPersonality([
        ...personality,
        dogsTempers.find((t) => t.ID === e.target.value),
      ]);
    }
  };

  return (
    <div>
      <h1 className={S.Title}>QUIZ</h1>
      <p>
        Selecciona de la siguente lista aquellas características que más te representen y te presentaremos los perritos que más se parecen a ti.
      </p>
      <div>
        <label> Tempers: </label>
        <select value={0} onChange={(e) => handleTempers(e)}>
          <option value={0} disabled>
            {" "}
            select tempers{" "}
          </option>
          {dogsTempers.length ? (
            dogsTempers.map((temper) => {
              return (
                <option key={temper.ID} value={temper.ID}>
                  {temper.nombre}
                </option>
              );
            })
          ) : (
            <option value={0} disabled>
              sin datos
            </option>
          )}
        </select>
        {personality.length > 0 ? (
          <div className={S.TempersDiv} >
            <ul className={S.TempersContainer}>
              {personality.map((e) => {
                return (
                  <li
                    key={personality.indexOf(e)}
                    value={personality.indexOf(e)}
                    onClick={(e) => {
                      let aux = personality;
                      aux.splice(e.target.value, 1);
                      setPersonality([...aux]);
                    }}
                  >
                    {e.nombre}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <h5> selecciona tempers con los que te identifiques </h5>
        )}
      </div>
      <div>
        <p>
            Los perros que más se adaptan a tu personalidad
        </p>
        {/* <div>
            {bestDogs?
            <div>
               <AllCards dogsArray={bestDogs.map((e)=>e[0])} percentages={bestDogs}/>
            </div>:
            <h3>No tenemos sugerencias</h3>
            }
        </div> */}
        <hr/>
        <div className={S.CardAlikeContainer}>
            {bestDogs? bestDogs.map((dogAlike)=>{
              return(
                <div className={S.CardAlike}>
                  <Card props={dogAlike[0]}/>
                  <div className={S.CardAlikeDetail}>
                    <h3> Te pareces a este</h3>
                    <h3> perrito en un: </h3>
                    <h1 className={S.Percentages}>  {dogAlike[1]}% </h1>
                    <hr></hr>
                    <h3> Este perrito se  </h3>
                    <h3> parece a ti en un:</h3>
                    <h1 className={S.Percentages}>  {dogAlike[2]}% </h1>
                  </div>
                </div>
                
              )
            })
            :
            <h3>No tenemos sugerencias</h3>
            }
        </div>
      </div>
    </div>
  );
}
