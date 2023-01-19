import { actions } from "../UTILS/constant";

const initialPendingReturns = [];

export const pendingReturns = (state = initialPendingReturns, action) => {
  switch (action.type) {
    case actions.SET_PENDINGRETURNS: {
      return action.payload;
    }

    default:
      return state;
  }
};
