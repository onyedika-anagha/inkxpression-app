import loggedReducer from "./loggedReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import wallpaperReducer from "./wallpaperReducer";
import url from "./url";
import quotesReducer from "./quotesReducer";

const reducers = combineReducers({
  isLogged: loggedReducer,
  user: userReducer,
  myWallpapers: wallpaperReducer,
  url,
  quotes: quotesReducer,
});

export default reducers;
