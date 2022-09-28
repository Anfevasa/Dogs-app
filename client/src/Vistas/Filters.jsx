import React, { useEffect, useState } from "react";
import AllCards from "../Components/AllCards";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs, getAllTempers, saveFilters } from "../redux/Actions";
import { dataFiltered } from "../Validators/Filters";

export default function Filters() {
  let dogsInfo = useSelector((state) => state.dogsCopy);
  let dogsTempers = useSelector((state) => state.tempers);
  let filtros = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      await dispatch(getAllDogs());
      await dispatch(getAllTempers());
    }
    getData();
    
  }, [dispatch]);

  useEffect(() => {
    let copiaFilters = {...filters}
    return ()=>dispatch(saveFilters(copiaFilters));
      }, [dispatch]);

  const [filters, setFilters] = useState({...filtros});
  const [page, setPage] = useState(1);
  //setDogsState(dataFiltered(dogsInfo,filtros))

  let pages = dogsInfo.length > 0 && dataFiltered(dogsInfo, filters);
  let maxPages = dogsInfo.length > 0 && Object.keys(pages).length;
  

  const handleTempers = (e) => {
    //console.log(filters.tempers.indexOf({ID:e.target.value , nombre:e.target.innerHTML}))
    if (!filters.tempers.find((t) => t.ID === e.target.value)) {
      setFilters({
        ...filters,
        tempers: [
          ...filters.tempers,
          dogsTempers.find((t) => t.ID === e.target.value),
        ],
      });
      setPage(1);
    }
  };

  return (
    <div>
      <h1>Probando</h1>
      <div>
        <h2>Search bar</h2>
        <label> buscar: </label>
        <input
          onBlur={(e) => {
            setFilters({
              order: "A-Z",
              peso: "",
              filters: ["Todos"],
              tempers: [],
              nombre: e.target.value,
            });
            setPage(1);
          }}
        ></input>
      </div>
      <div>
        <h2>Página</h2>
        <button onClick={() => setPage(1)}>{"|<"}</button>
        <button onClick={() => page != 1 && setPage(page - 1)}>{"<"}</button>

        <input
          value={page}
          onBlur={(e) => {
            setPage(e.target.value);
          }}
          onChange={(e) => {
            if (e.target.value > 0 && e.target.value < maxPages)
              setPage(e.target.value);
          }}
        ></input>
        <label>/{maxPages}</label>

        <button onClick={() => page !== maxPages && setPage(page + 1)}>
          {">"}
        </button>
        <button onClick={() => setPage(maxPages)}>{">|"}</button>
      </div>
      <div>
        <h2>FILTROS</h2>
        <div>
          <h4> Orden </h4>
          <label> nombre: </label>
          <button
            onClick={() => {
              setFilters({
                ...filters,
                peso: "",
                order: filters.order === "A-Z" ? "Z-A" : "A-Z",
              });
              setPage(1);
            }}
          >
            {" "}
            {filters.order}
          </button>
          <label> peso: </label>
          <button
            onClick={() => {
              setFilters({
                ...filters,
                peso: filters.peso === "asc" ? "des" : "asc",
              });
              setPage(1);
            }}
          >
            {" "}
            {filters.peso || "peso"}
          </button>
        </div>
        <div>
          <h4> Creados </h4>
          <label>origen:</label>
          <select
            onChange={(e) => {
              setFilters({ ...filters, filters: [e.target.value] });
              setPage(1);
            }}
          >
            <option value={"Todos"}> Todos</option>
            <option value={"Existentes"}> Existentes</option>
            <option value={"Creados"}> Creados</option>
          </select>
        </div>
      </div>
      <div>
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
            <option value={0} disabled>
              sin datos
            </option>
          )}
        </select>
        {filters.tempers.length > 0 ? (
          <ul>
            {filters.tempers.map((e) => {
              return (
                <li
                  key={filters.tempers.indexOf(e)}
                  value={filters.tempers.indexOf(e)}
                  onClick={(e) => {
                    let aux = filters.tempers;
                    aux.splice(e.target.value, 1);
                    setFilters({
                      ...filters,
                      tempers: aux,
                    });
                    setPage(1);
                  }}
                >
                  {e.nombre}
                </li>
              );
            })}
          </ul>
        ) : (
          <h5>selecciona tempers para filtrar </h5>
        )}
      </div>
      <div>
        <button
          onClick={(e) => {
            setFilters({
              order: "A-Z",
              peso: "",
              filters: ["Todos"],
              tempers: [],
              nombre: "",
            });
            setPage(1);
          }}
        >
          Limpiar filtros
        </button>
      </div>
      <div>
        <h1> Cartas </h1>
        {dogsInfo.length > 0 ? (
          <AllCards dogsArray={pages[page]} />
        ) : (
          <h4>no hay datos aún</h4>
        )}
      </div>
    </div>
  );
}
