import {
  ADD_FAVORITES,
  GET_ALL,
  GET_BY_ID,
  GET_TEMPERS,
  POST_DOG,
  SAVE_FILTERS,
} from "./Actions";

let initialState = {
  dogs: [],
  detail: {},
  dogsCopy: [],
  tempers: [],
  favorites: [],
  filters: {
    order: "A-Z",
    peso: "",
    filters: ["Todos"],
    tempers: [],
    nombre: "",
  },
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL:
      return { ...state, dogsCopy: payload };

    case GET_BY_ID:
      return { ...state, detail: payload };

    case GET_TEMPERS:
      return { ...state, tempers: payload };

    case POST_DOG:
      return { ...state, dogsCopy: payload };

    case SAVE_FILTERS:
      return { ...state, filters: payload };

    case ADD_FAVORITES:
      return { ...state, favorites: [...state.favorites, payload] };

    default:
      return state;
  }
}
