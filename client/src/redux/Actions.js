import axios from "axios";

export const GET_ALL = "GET_ALL";
export const GET_TEMPERS = "GET_TEMPERS";
export const POST_DOG = "POST_DOG";


export const getAllDogs = () => {
  return async (dispatch) => {
    let myApiData = await axios.get("http://localhost:3001/dogs");
    //console.log(myApiData.data)
    dispatch({ type: GET_ALL, payload: myApiData.data });
  };
};
export const getAllTempers = () => {
  return async (dispatch) => {
    let tempersData = await axios.get("http://localhost:3001/temperaments");
    //console.log(myApiData.data)
    dispatch({ type: GET_TEMPERS, payload: tempersData.data });
  };
};

export const postDog = (dogDetail) => {  
  return async (dispatch) => {
    let dogCreated = await axios.post("http://localhost:3001/dogs", dogDetail);
    dispatch({type: POST_DOG, payload: dogCreated.data})
  };
};
