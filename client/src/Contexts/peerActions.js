export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";
export const ADD_MEMBER = "ADD_MEMBER";
export const CLEAR_PEER = "CLEAR_PEER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";

export const addPeerAction = (peerId, stream , username) => ({
  type: ADD_PEER,
  payload: { peerId, stream , username },
});

export const removePeerAction = (peerId) => ({
  type: REMOVE_PEER,
  payload: { peerId },
});

export const clearPeersAction = () => ({
  type: CLEAR_PEER,
})

export const removeMemberAction = (member) => ({
  type: REMOVE_MEMBER,
  payload: { member },
});

export const addMemberAction = (member) => ({
    type: ADD_MEMBER,
    payload: { member },
  });
