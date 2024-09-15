import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "MemberSlice",
  initialState: {
    members: {},
  },
  reducers: {
    addMember: (state, action) => {
      state.members[action.payload.username] = action.payload;
    },
    removeMember: (state, action) => {
      delete state.members[action.payload.username];
    },
  },
});

export const { addMember, removeMember } = memberSlice.actions;
export default memberSlice.reducer;
