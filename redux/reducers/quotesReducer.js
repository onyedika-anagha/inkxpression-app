import * as actions from "../actionTypes";

var initialState = [];

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_QUOTES:
      return [...action.payload];
      break;
    default:
      return state;
      break;
  }
};

export default quotesReducer;
