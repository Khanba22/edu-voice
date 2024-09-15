import { configureStore } from "@reduxjs/toolkit";
import PeerSlice from "./PeerSlice";
import MemberSlice from "./MemberSlice";


const store = configureStore({
  name: "store",
  reducer: {
    peers:PeerSlice,
    members:MemberSlice
  },
});

export default store;
