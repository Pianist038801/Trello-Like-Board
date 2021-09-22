import { getMockLists } from "../mockAPI";
import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_CARD,
  DELETE_LIST,
  ADD_LIST,
} from "./types";

export function getLists(quantity) {
  return async (dispatch) => {
    dispatch({ type: GET_LISTS_START, quantity });
    const lists = await getMockLists(quantity);
    dispatch({ type: GET_LISTS, lists, isFetching: true });

    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function addCard(x, title) {
  return (dispatch) => {
    dispatch({ type: ADD_CARD, x, title });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}

export function deleteList(x) {
  return (dispatch) => {
    dispatch({ type: DELETE_LIST, x });
  };
}

export function addList(title) {
  return (dispatch) => {
    dispatch({ type: ADD_LIST, title });
  };
}
