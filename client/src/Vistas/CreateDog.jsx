import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/Actions";
import { getAllTempers } from "../redux/Actions";

export default function CreateDog() {
  const [newDog, setNewDog] = useState({
    nombre: "",
    altura: "",
    peso: "",
    vida: "",
    img: "",
    tempers: [],
  });
  let dogsTempers = useSelector((state) => state.tempers);
  const [newDogTempers, setNewDogTempers] = useState([]);
  const [validDog, setValidDog] = useState(true);

  function handleChange(e) {
    e.preventDefault(); 
    setNewDog({
      ...newDog,
      [e.target.name]: e.target.value,
    });
  }
  function handleTempers(e) {
    e.preventDefault();
    setNewDogTempers([...newDogTempers, Number(e.target.value)]);
    console.log(newDogTempers);
    let tempersString = newDogTempers.join(", ")
    const label = document.getElementById("labelTempers")
    label.innerHTML = tempersString
    
  }

  function validateDog(dogState) {
    return true;
  }

  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (validateDog(newDog)) {
      dispatch(actions.postDog(newDog));
    }
  }

  useEffect(() => {
    async function getTempers() {
      await dispatch(getAllTempers());
    }
    getTempers();
    //console.log("info", dogsState);
  }, [dispatch]);

  return (
    <div>
      <h1>Probando create</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Nombre: </label>
        <input
        placeholder=" nombre aquí"
          type="text"
          value={newDog.nombre}
          name="nombre"
          onChange={(e) => handleChange(e)}
        />
        <label name="errorNombre"> </label>

        <label> Altura (cm) </label>
        <label> min: </label>
        <input
          type="number"
          name="minAltura"
          onChange={(e) => handleChange(e)}
        />
        <label> max: </label>
        <input
          type="number"
          name="maxAltura"
          onChange={(e) => handleChange(e)}
        />
        <label name="errorAltura"> </label>

        <label> Peso (Kg) </label>
        <label> min: </label>
        <input type="number" name="minPeso" onChange={(e) => handleChange(e)} />
        <label> max: </label>
        <input type="number" name="maxPeso" onChange={(e) => handleChange(e)} />
        <label name="errorPeso"> </label>

        <label> Expectativa de vida (años) </label>
        <label> min: </label>
        <input type="number" name="minVida" onChange={(e) => handleChange(e)} />
        <label> max: </label>
        <input type="number" name="maxVida" onChange={(e) => handleChange(e)} />
        <label name="errorVida"> </label>

        <label> Imagen: </label>
        <input
          name="img"
          value={newDog.img}
          onChange={(e) => handleChange(e)}
        />
        <label name="errorImg"> </label>

        <label> Tempers: </label>
        <select name="tempers" value={0} onChange={(e) => handleTempers(e)}>
          <option value={0} disabled > select tempers</option>
          {dogsTempers.length ? (
            dogsTempers.map((temper) => {
              return (
                <option key={temper.ID} value={temper.ID}>
                  {temper.nombre}
                </option>
              );
            })
          ) : (
            <option value={0}>sin datos</option>
          )}
        </select>
        <label name="errorTempers" id="labelTempers"> </label>
      </form>
    </div>
  );
}
