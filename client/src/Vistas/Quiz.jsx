import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllCards from "../Components/AllCards";
import { dogClones } from "../Utils/Quiz";

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
      <h1>QUIZ :D</h1>
      <p>
        Selecciona cuales de los siguentes atributos, los que más te representen
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
          <ul>
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
        ) : (
          <h5> selecciona tempers con los que te identifiques </h5>
        )}
      </div>
            <hr/>
      <div>
        <p>
            Los perros que más se adaptan a tu personalidad
        </p>
        <div>
            {bestDogs?
            <div>
               <AllCards dogsArray={bestDogs.map((e)=>e[0])}/> 
            </div>:
            <h3>No tenemos sugerencias</h3>
            }
        </div>
      </div>
    </div>
  );
}
