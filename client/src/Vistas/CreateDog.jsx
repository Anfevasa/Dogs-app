import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import * as actions from "../redux/Actions";
import { errorObj, validator } from "../Utils/Validators";
import S from "./Styles/Create.module.css";
import { getAllDogs } from "../redux/Actions";

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
    if (newDogTempers.indexOf(Number(e.target.value)) === -1) {
      setNewDogTempers([...newDogTempers, Number(e.target.value)]);
      setNewDog({
        ...newDog,
        tempers: newDogTempers,
      });
    }

    if (
      Object.keys(newDog).length === 9 &&
      Object.keys(errorObj).length === 0
    ) {
      setValidDog(false);
    } else setValidDog(true);
  }

  // Elimino de tempers
  function handleClick(e) {
    let aux = [...newDogTempers];
    aux.splice(e.currentTarget.value, 1);
    setNewDogTempers([...aux]);
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

  useEffect(() => {
    async function getData() {
      await dispatch(getAllDogs());
    }
    return ()=>getData();
  }, [dispatch]);

  return (
    <div>
      <h1 className={S.Title}>Crear nuevo perro</h1>
      <p>
        {" "}
        Si se nos ha escapado alguna raza y quieres contribuir a que más
        personas puedan elegir su mascota ideal, te pedimos que llenes este
        formulario para crearlo y gracias por tu aporte.{" "}
      </p>

      <div className={S.DivMayor}>
        <div className={S.DivForm}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h4 className={S.NombreCat}> Nombre </h4>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                value={newDog.nombre}
                name="nombre"
                onChange={(e) => handleChange(e)}
              />
              <label id="errorNombre"> </label>
            </div>

            <h4 className={S.NombreCat}> Altura (cm) </h4>
            <div>
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
            </div>

            <h4 className={S.NombreCat}> Peso (Kg) </h4>
            <div>
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
            </div>

            <h4 className={S.NombreCat}> Expectativa de vida (años) </h4>
            <div>
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
            </div>

            <h4 className={S.NombreCat}> Imagen </h4>
            <div>
              <label> URL: </label>
              <input
                name="img"
                value={newDog.img}
                onChange={(e) => handleChange(e)}
              />
              <label id="errorImg"> </label>
            </div>

            <h4 className={S.NombreCat}> Tempers </h4>
            <div>
              <label> Tempers: </label>
              <select
                name="tempers"
                value={0}
                onChange={(e) => handleTempers(e)}
              >
                <option value={0} disabled>
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
              {newDogTempers.length > 0 ? (
                <div>
                  <ul>
                    {newDogTempers.map((temper, index) => {
                      return (
                        <li
                          onClick={(e) => handleClick(e)}
                          key={index}
                          value={index}
                        >
                          {dogsTempers.find((dog) => dog.ID == temper).nombre}{" "}
                          ❌
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <p> Agrega tempers</p>
              )}
              <label name="errorTempers" id="labelTempers">
                {" "}
              </label>
            </div>

            <button
              className={S.SubmitButton}
              type="submit"
              disabled={validDog ? true : false}
            >
              Crear
            </button>
          </form>
        </div>

        <div className={S.Previa}>
          <h3> Vista previa </h3>
          <Card props={formatDog()} fav={true} />
        </div>
      </div>
    </div>
  );
}
