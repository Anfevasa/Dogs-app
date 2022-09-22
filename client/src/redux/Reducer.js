import { GET_ALL } from "./Actions";

let initialState = {
  dogs: [],
  detail: [],
  dogCopy: [],
  filters: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL:
      return { ...state, dogs: payload };

    default:
      return state;
  }
}
