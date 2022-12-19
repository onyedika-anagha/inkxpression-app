import * as actions from "../actionTypes";

const url = (state = "http://homeofwords.stilttech.com", action) => {
  switch (action.type) {
    case "":
      return state;
      break;
    default:
      return state;
      break;
  }
};

export default url;
