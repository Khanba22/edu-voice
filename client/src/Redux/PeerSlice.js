import { createSlice } from "@reduxjs/toolkit";

const peerSlice = createSlice({
  name: "peerSlice",
  initialState: {},
  reducers: {
    addPeers: (state, action) => {
      return {
        ...state,
        [action.payload.peerId]: action.payload,
      };
    },
    removePeer: (state, action) => {
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return { ...rest };
    },
  },
});

export const {addPeers,removePeer} = peerSlice.actions;
export default peerSlice.reducer