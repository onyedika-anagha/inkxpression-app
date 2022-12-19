import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from "expo-font";
import ReadBook from "./screens/ReadBook";
import NewQuote from "./screens/NewQuote";
import Loader from "./constants/loader";
import { Linking } from "react-native";
import EditingPoem from "./screens/EditingPoem";
import EditCurrentQuote from "./screens/EditCurrentQuote";
import TempScreen from "./screens/Text-Editor/Index";
import AddStory from "./screens/AddStory";

import $ from "jquery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
//redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import EditDesign from "./screens/EditDesign";
import EditQuote from "./screens/EditQuote";
//redux

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const [loading, setLoading] = React.useState(true);
  const [user_id, setUser_id] = React.useState(0);
  const getAsyncUser = React.useCallback(async () => {
    const result = await AsyncStorage.getItem("user_id");
    const user_id = result === "undefined" ? 0 : Number(result);
    console.log("user_id for app.js", user_id);
    setUser_id(user_id);
  });
  // AsyncStorage.clear();
  getAsyncUser();
  console.log(user_id);
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.subscribe(() => console.log("Store Changed", store.getState()));

  const [url, setUrl] = React.useState("https://google.com");
  const checkInternet = () => {
    Linking.canOpenURL(url).then((connection) => {
      if (!connection) {
        alert("no connection");
      } else {
        $.ajax({
          url: url,
          data: data,
          success: function (data, status) {
            alert(status);
          },
          dataType: dataType,
        });
        fetch(url).then((res) => {
          if (res.status !== 200) {
            alert("no connection");
          } else {
            alert("good connection");
          }
        });
      }
    });
  };
  // checkInternet();
  if (!loaded) {
    return null;
  }
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const PrePages = (
    <>
      <Stack.Screen
        name="Login"
        options={() => ({
          headerShown: false,
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
          drawerItemStyle: {
            display: "none",
          },
        })}
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={() => ({
          headerShown: false,
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
          drawerItemStyle: {
            display: "none",
          },
        })}
        component={SignupScreen}
      />
    </>
  );
  return (
    <Provider store={store}>
      {loading ? <Loader /> : <></>}
      <StatusBar style="dark" hidden={true} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={user_id !== 0 ? "Home" : "Login"}
        >
          {/* prepages */}
          <Stack.Screen
            name="Login"
            options={() => ({
              headerShown: false,
              drawerLabel: () => null,
              title: undefined,
              drawerIcon: () => null,
              drawerItemStyle: {
                display: "none",
              },
            })}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={() => ({
              headerShown: false,
              drawerLabel: () => null,
              title: undefined,
              drawerIcon: () => null,
              drawerItemStyle: {
                display: "none",
              },
            })}
            component={SignupScreen}
          />
          {/* prepages */}
          {/* Tabs */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Profile" component={Tabs} />

          {/* Screens */}
          <Stack.Screen
            name="BookDetail"
            component={BookDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReadBook"
            component={ReadBook}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewQuote"
            component={NewQuote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditingPoem"
            component={EditingPoem}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCurrentQuote"
            component={EditCurrentQuote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddStory"
            component={AddStory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WriteStory"
            component={TempScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditQuote"
            component={EditQuote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditDesign"
            component={EditDesign}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
