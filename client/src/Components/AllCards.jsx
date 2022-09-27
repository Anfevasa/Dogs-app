import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getAllDogs } from "../redux/Actions";

//paginado y renderizado de cartas

export default function AllCards() {
  let dogsState = useSelector((state) => state.dogsCopy);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData(){await dispatch(getAllDogs());}
    getData();
    //console.log("info", dogsState);
    
  }, [dispatch]);
  return (
    <div>
      {dogsState.length ? (
        dogsState.map((dog) => (
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
