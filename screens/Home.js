import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import Loader from "../constants/loader";
import Books from "./Home-Components/Books";
import Quotes from "./Home-Components/Quotes";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stop, setStop] = useState(false);
  const [user_id, setUser_id] = useState(0);
  // const [user, setUser] = useState('');
  const profileData = useSelector((state) => state.user);

  const [profile, setProfile] = useState(profileData);
  const dispatch = useDispatch();
  const getAsyncUser = useCallback(async () => {
    const result = await AsyncStorage.getItem("user_id");
    const result1 = await AsyncStorage.getItem("user");
    const user = JSON.parse(result1);
    console.log("userForHome", result);
    const user_id = Number(result);
    setUser_id(user_id);
    if (user_id > 0 && stop === false) {
      dispatch(actions.setUserDetails(user));
      setProfile(user);
      console.log("user__", user);
      setStop(true);
      setLoading(false);
      // navigation.navigate("AddStory", {
      //   quote: `
      //   The Poet, Amy Lowell, once said.
      //   She said that books are the quintessence of our lives`,
      // });
    }
  });

  // getAsyncUser();
  console.log("outside");
  useEffect(() => {
    getAsyncUser();
    console.log("effect");
    return () => {
      getAsyncUser();
      dispatch(actions.setUserDetails(profile));
    };
  }, []);
  const [active, setActive] = useState("quotes");

  function renderHeader(profile) {
    const greeting = () => {
      var nowTime = new Date();
      const hour = nowTime.getHours();
      console.log(hour);
      if (hour >= 20) {
        var val = `Good Night ${profile.name}  , Have a good night rest.`;
      } else if (hour > 17) {
        var val = `Good Evening ${profile.name} , Hope you enjoyed your day?`;
      } else if (hour > 11) {
        var val = `Good Afternoon ${profile.name} , How is your day going?`;
      } else if (hour < 12) {
        var val = `Good Morning ${profile.name} , How was your night?`;
      }
      return val;
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {profile.name}
            </Text>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              {greeting()}
            </Text>
          </View>
        </View>

        {/* Points */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20,
          }}
          onPress={() => {
            console.log("Point");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Image
                source={icons.plus_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>

            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >
              {profile.rank}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", padding: SIZES.padding }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 70,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
          }}
        >
          {/* Claim */}
          <TouchableOpacity
            style={[
              { flex: 1 },
              active === "quotes"
                ? {
                    color: "#1E1B26",
                    backgroundColor: "rgba(255,255,255,0.09)",
                  }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setActive("quotes")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.claim_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}
              >
                Quotes
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider />

          {/* Get Point */}
          <TouchableOpacity
            style={[
              { flex: 1 },
              active === "stories"
                ? {
                    color: "#1E1B26",
                    backgroundColor: "rgba(255,255,255,0.09)",
                  }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setActive("stories")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.point_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}
              >
                Stories
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // navigation.navigate("WriteStory", {
  //   Info: {
  //     cover: "",
  //     title: "",
  //     description: "",
  //     story: "",
  //     story_id: 0,
  //   },
  // });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {loading ? <Loader /> : <></>}
      {/* Header Section */}
      <View style={{ height: 200 }}>
        {renderHeader(profile)}
        {renderButtonSection()}
      </View>

      {/* Body Section */}
      {active === "stories" ? (
        <Books navigation={navigation} />
      ) : (
        <Quotes navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default Home;
