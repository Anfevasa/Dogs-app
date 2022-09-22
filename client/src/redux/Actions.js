import axios from "axios";

export const GET_ALL = "GET_ALL";

export const getAllDogs = () => {
  return async (dispatch) => {
    let myApiData = await axios.get("http://localhost:3001/dogs");
    //console.log(myApiData.data)
    dispatch({ type: GET_ALL, payload: myApiData.data });
  };
};
