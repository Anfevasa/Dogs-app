import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Utils/LogoColor.png";

import S from "./Styles/Home.module.css"

export default function Home({ props, fav }) {
  return (
    <div className={S.MainDiv}>
      <h1 className={S.Title}> Bienvenid@ </h1>
      <img alt="Landing" src={Logo} width="300" />
      <p>
        De pequeños, todos quisimos tener un perro, sin embargo, una vez
        nuestros padres accedían a tener uno, llega el segundo problema, ¿cuál
        perro?, se abre un montón de posibilidades, altos, bajos, gordos,
        flacos, peludos, etc... Muchos tomaron esta decisión basándose solo en
        lo que veían sus ojos; Aquí creemos que lo más importante es lo que va
        por dentro. (revisar este párrafo) Esta app te ayudará a elegir el perro
        que te acompañará y te dará los mejores momentos de tu vida. Para esto
        te facilitamos las siguientes herramientas:
      </p>

      <hr />

      <Link to="/quiz">
        <h2 className={S.Title} > ¿Qué raza de perro eres según tu personalidad? </h2>
      </Link>
      <p>
        Cuéntanos un poco acerca de ti y acá te mostraremos cuál es el perro que
        hará click contigo y se harán inseparables, serán idénticos como dos
        gotas de agua
      </p>

      <hr />

      <Link to="/favorites">
        <h2 className={S.Title} > Favoritos </h2>
      </Link>
      <p>
        Si prefieres no tener un clon de ti mismo en versión perro, bien sea
        porque nada ni nadie puede brillar más que tú, o simplemente porque te
        odias a ti mismo, para ti tenemos esta opción. Enséñanos cuales son las
        razas que te parecen más interesantes o que definitivamente no te
        agradan, nos encargaremos de encontrar esos patrones y te daremos las
        mejores opciones de acuerdo a tus gustos
      </p>

      <hr />

      <Link to="/dogs">
        <h2 className={S.Title} > Filtros </h2>
      </Link>
      <p>
        Y para los más exigentes, para ti que quieres evaluar cada opción, tener
        en cuenta cada variable, filtrar y analizar cada posibilidad, tenemos
        nuestra página principal, en donde tendrás a disposición toda la
        información de cada una de las razas
      </p>

      <hr />

      <Link to="/create">
        <h2 className={S.Title} > Crea tus propias razas </h2>
      </Link>
      <p>
        Esperamos que puedas encontrar aquello que esperabas y si notas que se
        nos escapa alguna raza que aún no tengamos en nuestra lista, te
        invitamos a sumarla a través de nuestra página: Crear
      </p>
    </div>
  );
}
