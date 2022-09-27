import { GET_ALL, GET_TEMPERS, POST_DOG } from "./Actions";

let initialState = {
  dogs: [],
  detail: [],
  dogsCopy: [],
  tempers: [],
  filters: [],
  favorites: []
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL:
      return { ...state, dogsCopy: payload };

    case GET_TEMPERS:
      return {...state, tempers: payload}

    case POST_DOG:
      return { ...state, dogsCopy: payload };



    default:
      return state;
  }
}
