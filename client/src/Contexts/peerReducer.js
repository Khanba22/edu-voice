import { ADD_PEER, CLEAR_PEER, REMOVE_PEER } from "./peerActions";

export const peerReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER:
      const username = action.payload.username || "You";
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
          username: username,
        },
      };
    case REMOVE_PEER:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return { ...rest };
    case CLEAR_PEER:
      return {}
    default:
      return { ...state };
  }
};
