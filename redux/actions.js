import * as actions from "./actionTypes";

export const logIn = () => ({
  type: actions.LOGGED_IN,
});
export const setUser = (id) => ({
  type: actions.SET_USER,
  payload: {
    userData: {
      id: id,
      name: "Dika",
      password: "123456",
      email: "paschalanagha@gmail.com",
    },
  },
});
export const setUserDetails = (user) => ({
  type: actions.SET_USER,
  payload: user,
});
export const setWallpaper = (data) => ({
  type: actions.UPLOAD_WALLPAPER,
  payload: data,
});

//------------------------Quotes--------------------------------
export const getAllQuotes = (data) => ({
  type: actions.GET_ALL_QUOTES,
  payload: data,
});
