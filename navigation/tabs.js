import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, NewQuote } from "../screens/";
import { icons, COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  activeTintColor: "#fff",
  inactiveTintColor: "lightgray",
  activeBackgroundColor: COLORS.black,
  inactiveBackgroundColor: COLORS.black,
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.white : COLORS.gray;

          switch (route.name) {
            case "Home":
              return (
                <Image
                  source={icons.dashboard_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case "Search":
              return (
                <Image
                  source={icons.search_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case "Compose":
              return (
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#80b3ff", "#6236FF"]}
                  style={[
                    {
                      // backgroundColor: "linear-gradient(to right, #80b3ff, #6236FF)",
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      display: "flex",
                      // textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 5,
                    },
                  ]}
                >
                  <Image
                    source={icons.plus_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                </LinearGradient>
              );
            case "Notification":
              return (
                <Image
                  source={icons.notification_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case "Profile":
              return (
                <Image
                  source={icons.user_profile}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Compose"
        component={NewQuote}
        options={{ tabBarVisible: false, headerShown: false }}
        initialParams={{
          info: {
            quote: "",
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
