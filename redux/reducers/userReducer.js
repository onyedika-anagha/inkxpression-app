import * as actions from "../actionTypes";
let lastId = 0;
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,

        data: { ...action.payload },
        logged: true,
      };
      console.log(action);
      break;
    case actions.SIGN_OUT:
      return {};
      break;

    default:
      return state;
      break;
  }
};

export default userReducer;
