import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/Actions";
import { getAllTempers } from "../redux/Actions";
import { errorObj, validator } from "../Utils/Validators";

export default function CreateDog() {
  // Genero los estados necesarios y traigo los tempers de la store
  const [newDog, setNewDog] = useState({
    img: "",
  });
  const [newDogTempers, setNewDogTempers] = useState([]);
  const [validDog, setValidDog] = useState(true);

  let dogsTempers = useSelector((state) => state.tempers);

  // Gestiono cambios en el formulario
  function handleChange(e) {
    e.preventDefault();
    validator(e);

    setNewDog({
      ...newDog,
      [e.target.name]: e.target.value,
    });

    if (
      Object.keys(newDog).length === 9 &&
      Object.keys(errorObj).length === 0
    ) {
      console.log(newDog);
      setValidDog(false);
    } else setValidDog(true);
  }

  // Gestiono cambios de tempers en el select
  function handleTempers(e) {
    e.preventDefault();
    setNewDogTempers([...newDogTempers, Number(e.target.value)]);
    setNewDog({
      ...newDog,
      tempers: newDogTempers,
    });

    if (
      Object.keys(newDog).length === 9 &&
      Object.keys(errorObj).length === 0
    ) {
      setValidDog(false);
    } else setValidDog(true);
  }

  // Formateo el nuevo dog para enviar al back
  function formatDog() {
    return {
      nombre: newDog.nombre,
      altura: newDog.minAltura + " - " + newDog.maxAltura,
      peso: newDog.minPeso + " - " + newDog.maxPeso,
      vida: newDog.minVida + " - " + newDog.maxVida + " years",
      img: newDog.img,
      tempers: newDogTempers,
    };
  }

  // Envío acción al back
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    //console.log(formatDog())
    try {
      dispatch(actions.postDog(formatDog()));
      setNewDog({
        img: "",
      });
      setNewDogTempers([]);
      alert("perrito creado :D");
    } catch (error) {
      console.log(error.message);
    }
  }

  // Traigo tempers al montar el componente
  useEffect(() => {
    async function getTempers() {
      await dispatch(getAllTempers());
    }
    getTempers();
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
        <label id="errorNombre"> </label>

        <label> Altura (cm) </label>
        <label> min: </label>
        <input
          type="number"
          name="minAltura"
          id="minAltura"
          onChange={(e) => handleChange(e)}
        />
        <label> max: </label>
        <input
          type="number"
          name="maxAltura"
          id="maxAltura"
          onChange={(e) => handleChange(e)}
        />
        <label id="errorAltura"> </label>

        <label> Peso (Kg) </label>
        <label> min: </label>
        <input
          type="number"
          name="minPeso"
          id="minPeso"
          onChange={(e) => handleChange(e)}
        />
        <label> max: </label>
        <input
          type="number"
          name="maxPeso"
          id="maxPeso"
          onChange={(e) => handleChange(e)}
        />
        <label id="errorPeso"> </label>

        <label> Expectativa de vida (años) </label>
        <label> min: </label>
        <input
          type="number"
          name="minVida"
          id="minVida"
          onChange={(e) => handleChange(e)}
        />
        <label> max: </label>
        <input
          type="number"
          name="maxVida"
          id="maxVida"
          onChange={(e) => handleChange(e)}
        />
        <label id="errorVida"> </label>

        <label> Imagen: </label>
        <input
          name="img"
          value={newDog.img}
          onChange={(e) => handleChange(e)}
        />
        <label id="errorImg"> </label>

        <label> Tempers: </label>
        <select name="tempers" value={0} onChange={(e) => handleTempers(e)}>
          <option value={0} disabled>
            {" "}
            select tempers
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
            <option value={0}>sin datos</option>
          )}
        </select>
        <label>
          {newDogTempers
            .map((id) => dogsTempers.find((dog) => dog.ID == id).nombre)
            .join(", ")}{" "}
        </label>
        <label name="errorTempers" id="labelTempers">
          {" "}
        </label>
        <button type="submit" disabled={validDog ? true : false}>
          {" "}
          Crear{" "}
        </button>
      </form>
    </div>
  );
}
