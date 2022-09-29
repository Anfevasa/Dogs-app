import axios from "axios";

export const GET_ALL = "GET_ALL";
export const GET_BY_ID = "GET_BY_ID";
export const GET_TEMPERS = "GET_TEMPERS";
export const POST_DOG = "POST_DOG";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const SAVE_FILTERS = "SAVE_FILTERS";
export const ADD_FAVORITES = "ADD_FAVORITES";

export const getAllDogs = () => {
  return async (dispatch) => {
    let myApiData = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: GET_ALL, payload: myApiData.data });
  };
};
export const getDogByID = (id) => {
  return async (dispatch) => {
    let myApiData = {};
    try {
      myApiData = await axios.get(`http://localhost:3001/dogs/${id}`);
    } catch (error) {
      myApiData.data = { error: error.response.data.error };
    }
    dispatch({ type: GET_BY_ID, payload: myApiData.data });
  };
};
export const getAllTempers = () => {
  return async (dispatch) => {
    let tempersData = await axios.get("http://localhost:3001/temperaments");
    dispatch({ type: GET_TEMPERS, payload: tempersData.data });
  };
};

export const postDog = (dogDetail) => {
  return async (dispatch) => {
    let dogCreated = await axios.post("http://localhost:3001/dogs", dogDetail);
    dispatch({ type: POST_DOG, payload: dogCreated.data });
  };
};

export const cleanDetails = () => {
  return (dispatch) => {
    dispatch({ type: CLEAN_DETAILS });
  };
};

export const saveFilters = (filters) => {
  return (dispatch) => {
    dispatch({ type: SAVE_FILTERS, payload: filters });
  };
};

export const addFavorites = (dog) => {
  return (dispatch) => {
    dispatch({ type: ADD_FAVORITES, payload: dog });
  };
};
