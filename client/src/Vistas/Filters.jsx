import React, { useEffect, useState } from "react";
import AllCards from "../Components/AllCards";
import { useSelector, useDispatch } from "react-redux";
import { saveFilters } from "../redux/Actions";
import { dataFiltered } from "../Utils/Filters";

import S from "./Styles/Filtros.module.css";

export default function Filters() {
  let dogsInfo = useSelector((state) => state.dogsCopy);
  let dogsTempers = useSelector((state) => state.tempers);
  let filtros = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({ ...filtros });
  const [page, setPage] = useState(1);

  let pages = dogsInfo.length > 0 && dataFiltered(dogsInfo, filters);
  let maxPages = dogsInfo.length > 0 && Object.keys(pages).length;

  const handleTempers = (e) => {
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
      <h1 className={S.Title}>Filtrados</h1>
      <p>
        Grandes, viejos, inquietos, nuevos... Aquí tendrás acceso a todos los
        perros, filtra y ordena hasta encontrar tu favorito
      </p>

      <div className={S.DivMayor}>
        <div className={S.DivNombre}>
          <h2>Search bar</h2>
          <label> Nombre: </label>
          <input
            placeholder="Buscar"
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
        <div className={S.DivFiltros}>
          <h2>Filtros</h2>
          <div>
            <label>Origen: </label>
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
          </div>
        </div>
        <div className={S.DivOrden}>
          <h2> Orden </h2>
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
        {filters?dispatch(saveFilters(filters)):console.log("???")}
      </div>

      <div className={S.DivShowTempers}>
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

      <div className={S.DivResults}>
        <div className={S.DivPagination}>
          <div className={S.ResultsTitle}>
            <h1> Resultados búsqueda </h1>
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
            <div>
              <h3>Página</h3>
              <button onClick={() => setPage(1)}>{"|<"}</button>
              <button onClick={() => page != 1 && setPage(page - 1)}>
                {"<"}
              </button>

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
          </div>
        </div>
        {dogsInfo.length > 0 ? (
          <AllCards dogsArray={pages[page]} />
        ) : (
          <h4>no hay datos aún</h4>
        )}
      </div>

      <div className={S.DivPagination2}>
        <h3>Página</h3>
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
    </div>
  );
}
