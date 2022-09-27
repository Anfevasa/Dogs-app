import React, { useEffect, useState } from "react";
import AllCards from "../Components/AllCards";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs } from "../redux/Actions";
import { dataFiltered } from "../Validators/Filters";

export default function Filters() {
  let dogsInfo = useSelector((state) => state.dogsCopy);
  let filtros = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      await dispatch(getAllDogs());
    }
    getData();
  }, [dispatch]);

  const [dogsState, setDogsState] = useState({});
  const [filters,setFilters] = useState({order:"A-Z",filters:["Todos"]});
  const [page, setPage] = useState(1);
  //setDogsState(dataFiltered(dogsInfo,filtros))

  let pages = dogsInfo.length > 0 && dataFiltered(dogsInfo,filters);
  let maxPages = dogsInfo.length > 0 && Object.keys(pages).length;

  return (
    <div>
      <h1>Probando</h1>
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

        <button onClick={() => page != maxPages && setPage(page + 1)}>
          {">"}
        </button>
        <button onClick={() => setPage(maxPages)}>{">|"}</button>

      </div>
      <div>
        <h2>Filtros</h2>
        <div>
          <h5> orden: </h5> 
          <button onClick={()=>{setFilters({...filters, order:filters.order==="A-Z"?"Z-A":"A-Z"})}}> {/* filters.includes("A-Z")?"A-Z":"Z-A" */ filters.order}</button>
        </div>
        <div>
          <h5> creados: </h5>
          <select onChange={(e)=>{setFilters({...filters, filters:[e.target.value]})}}>
            <option value={"Todos"}> Todos</option>
            <option value={"Existentes"}> Existentes</option>
            <option value={"Creados"}> Creados</option>
          </select> 
        </div>
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
