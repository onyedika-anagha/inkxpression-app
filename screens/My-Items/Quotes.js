import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";

import { COLORS, FONTS, SIZES, icons, quotes } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import QuoteMenu from "./QuoteMenu";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuoteGenres from "../Home-Components/QuoteGenres";

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

const Quotes = ({ navigation }) => {
  const [allQuotes, setAllQuotes] = React.useState([]);
  const [myQuotes, setmyQuotes] = React.useState([]);
  const [Ctgys, setCtgys] = React.useState([]);
  const [stop, setStop] = useState(false);
  const url = useSelector((state) => state.url);
  const user = useSelector((state) => state.user);
  console.log(user);
  const getQuotes = useCallback(async () => {
    const result = await AsyncStorage.getItem("user_id");
    const user_id = Number(result);
    // setUser_id(user_id);
    if (user_id > 0 && stop === false) {
      axios
        .get(`${url}/api/get/quotes/${user_id}`)
        .then((response) => response.data)
        .then((data) => {
          if (myQuotes.length !== data.length) {
            setmyQuotes(data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  });
  const getCtgy = () => {
    if (stop === false) {
      axios
        .get(`${url}/api/get/quote/ctgys`)
        .then((response) => response.data)
        .then((data) => {
          if (Ctgys.length !== data.length) {
            setCtgys(data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setInterval(() => {
      getQuotes();
      getCtgy();
    }, 10000);
    return () => {
      setStop(true);
    };
  }, [getQuotes, getCtgy]);
  console.log("myQuotes", myQuotes);
  const renderItem = ({ item }) => {
    const imgSize = Dimensions.get("window").width - 30;
    const others = myQuotes.filter((prop, index) => prop.id !== item.id);
    console.log("others", others);
    const openmenu = () => {
      const newItem = { ...item, menuOpen: !item.menuOpen };
      const newMyQuotes = [...others, { ...newItem }];
      console.log("newMyQuotes", newMyQuotes);
    };
    return (
      <View
        style={{
          marginVertical: SIZES.base,
          // height: Dimensions.get("window").height,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", marginRight: 20 }}>
          {/* Book Cover */}

          <View style={{ flex: 1, marginLeft: SIZES.radius }}>
            {/* Book name and author */}
            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={{ uri: `$url/images/profile/$item.profile_image` }}
                style={{
                  width: 40,
                  height: 40,
                  // left: -10,
                  // figure out your image aspect ratio
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.lightGray,
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                {item.name}
              </Text>
            </View>

            {/* Book Info */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                height: "100%",
                paddingRight: 10,
              }}
            >
              <Image
                source={{ uri: `${url}/images/quotes/${item.backgroundImage}` }}
                style={{
                  width: imgSize,
                  height: imgSize,
                  // left: -10,
                  // figure out your image aspect ratio
                  aspectRatio: 3 / 3,
                }}
              />
            </View>
            <View
              style={{
                boxSizing: "inherit",
                backgroundRepeat: "no-repeat",
                padding: 0,
                margin: 0,
                marginTop: 0.35714,
                marginRight: 0.71429,
                marginLeft: 0.71429,
                fontSize: 0.85714,
                wordBreak: "break-word",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,.87)",
                }}
              >
                {item.caption}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
              <Image
                source={icons.page_filled_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.lightGray,
                }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.lightGray,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                {item.pageNo}
              </Text>

              <Image
                source={icons.read_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.lightGray,
                }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.lightGray,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                {item.readed}
              </Text>
            </View>

            {/* Genre */}
            <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
              <QuoteGenres Ctgys={Ctgys} genreData={item.genre} />
            </View>
          </View>
        </View>

        {/* Bookmark Button */}
        <QuoteMenu item={item} navigation={navigation} />
      </View>
    );
  };

  return (
    <View style={{ marginTop: SIZES.radius }}>
      <View>
        <FlatList
          data={myQuotes}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.quote_id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Quotes;
