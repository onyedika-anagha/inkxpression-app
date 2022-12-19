import * as actions from "../actionTypes";
const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case actions.LOGGED_IN:
      return true;
      break;
    case actions.LOGGED_OUT:
      return false;
      break;

    default:
      return state;
      break;
  }
};
export default loggedReducer;
