import * as actions from "../actionTypes";

const wallpaperReducer = (state = [], action) => {
  switch (action.type) {
    case actions.UPLOAD_WALLPAPER:
      return [...action.payload];
      console.log(action);
      break;
    default:
      return state;
      break;
  }
};

export default wallpaperReducer;
