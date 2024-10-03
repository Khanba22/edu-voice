import { createSlice } from "@reduxjs/toolkit";

const peerSlice = createSlice({
  name: "peerSlice",
  initialState: {
    
  },
  reducers: {
    addPeers: (state, action) => {
      console.log(action.payload,"Peers Added")
      return {
        ...state,
        [action.payload.peerId]: {...action.payload},
      };
    },
    removePeer: (state, action) => {
      console.log(action.payload,"Peer removed")
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return { ...rest };
    },
    clearPeers :(state,action)=>{
      console.log("Peers Cleared")
      return {}
    }
  },
});

export const {addPeers,removePeer,clearPeers} = peerSlice.actions;
export default peerSlice.reducer