import { Record } from "immutable";

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
  ADD_EMAIL,
  ADD_CARD,
  DELETE_EMAIL,
  DELETE_CARD,
} from "../actions/types";

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  lists: [],
  isDragging: false,
});
/* eslint-enable new-cap */
const initialState = new InitialState();

export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set("isFetching", true);
    case GET_LISTS:
      return state.withMutations((ctx) => {
        ctx.set("isFetching", false).set("lists", action.lists);
      });
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(
          nextY,
          0,
          newLists[lastX].cards.splice(lastY, 1)[0]
        );
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case ADD_CARD: {
      const newLists = [...state.lists];
      const { x, title } = action;
      newLists[x].cards.push({
        id: newLists[x].cards.length,
        title,
        emails: [],
      });
      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case DELETE_CARD: {
      const newLists = [...state.lists];
      const { x, y } = action;
      newLists[x].cards.splice(y, 1);
      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      const { lastX, nextX } = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);

      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case TOGGLE_DRAGGING: {
      return state.set("isDragging", action.isDragging);
    }
    case ADD_EMAIL: {
      const { x, y, newEmail } = action;
      const newLists = [...state.lists];
      newLists[x].cards[y].emails.push(newEmail);

      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case DELETE_EMAIL: {
      const { x, y, id } = action;
      const newLists = [...state.lists];
      newLists[x].cards[y].emails.splice(id, 1);

      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    default:
      return state;
  }
}
