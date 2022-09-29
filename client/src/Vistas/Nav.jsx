import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDogs, getAllTempers } from "../redux/Actions";


import Logo from '../Utils/LogoPNG.png'
import S from "./Styles/Nav.module.css"
import B from "./Styles/Body.module.css"

export default function Nav() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      await dispatch(getAllDogs());
      await dispatch(getAllTempers());
    }
    getData();
  }, [dispatch]);
  return (
    <div className={S.Nav}>
      <div className={S.LogoContainer}>
        <Link to="/">
          <img className={S.Logo} src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className={S.LinksContainer}>
        <Link className={S.Link} to="/"> Home 
          <div/>
        </Link>       
        
        <Link className={S.Link} to="/quiz"> Quiz 
          <div/>
        </Link>

        <Link className={S.Link} to="/favorites"> Favorites
          <div/>
        </Link>

        <Link className={S.Link} to="/dogs"> Filtros
          <div/>        
        </Link>

        <Link className={S.Link} to="/create"> Create
          <div/>
        </Link>

      </div>     
    </div>
  );
}
