import React , {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetails, getDogByID } from "../redux/Actions";

export default function DetailDog() {
  let { id } = useParams();

  const dispatch = useDispatch();

  // Traigo info cuando monto componente
  useEffect(() => {
    async function getData() {
      await dispatch(getDogByID(id));
    }
    getData();
  }, [dispatch,id]);

  // Limpio estado cuando desmonto
  useEffect(()=>{
    return()=>dispatch(cleanDetails())
  }, [dispatch])

  let dogInfo = useSelector((state) => state.detail);

  return (
    <div>
      <h5>Detail</h5>
      {
        dogInfo.error?        
        <h1> {dogInfo.error} </h1>            
        :
        <div>
          {Object.keys(dogInfo).length ?
          <div>
            <h1>{dogInfo.nombre}</h1>
            <img src={dogInfo.img} alt={dogInfo.ID} width="1000"/>
            <h3> Altura </h3>
            <h5> {dogInfo.altura} cm</h5>
            <h3> Peso </h3>
            <h5> {dogInfo.altura} Kg</h5>
            <h3> Expectativa de vida </h3>
            <h5> {dogInfo.vida}</h5>
            </div>
           :
           <h5> Aún no hay datos</h5> 
    
          }
        </div>       
      }      
    </div>
  );
}
