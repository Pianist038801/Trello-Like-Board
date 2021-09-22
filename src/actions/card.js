import { ADD_EMAIL, DELETE_EMAIL, DELETE_CARD } from "./types";

export function addEmail(x, y, newEmail) {
  return (dispatch) => {
    dispatch({ type: ADD_EMAIL, x, y, newEmail });
  };
}

export function deleteEmail(x, y, id) {
  return (dispatch) => {
    dispatch({ type: DELETE_EMAIL, x, y, id });
  };
}

export function deleteCard(x, y) {
  return (dispatch) => {
    dispatch({ type: DELETE_CARD, x, y });
  };
}
