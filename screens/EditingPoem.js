import React, { useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Share,
  Dimensions,
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Display from "./Edit-Components/Display";
import Settings from "./Edit-Components/Settings";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 5 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray2,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const EditingPoem = ({ route, navigation }) => {
  const { quote } = route.params;
  const getbgs = () => {
    var res = [];
    for (let index = 1; index < 100; index++) {
      var element = {
        id: index,
        bg: { uri: `https://picsum.photos/500/?random=${index}` },
      };
      res.push(element);
    }
    return res;
  };
  const bgs = getbgs();
  console.log(bgs);
  //   const bgs = [
  //     {
  //       id: 1,
  //       bg: { uri: "https://picsum.photos/200?random=1" },
  //     },
  //     {
  //       id: 2,
  //       bg: { uri: "https://picsum.photos/200" },
  //     },
  //     {
  //       id: 3,
  //       bg: require("../assets/images/bg/orsrc43544.png"),
  //     },
  //     {
  //       id: 4,
  //       bg: require("../assets/images/bg/orsrc50671.jpg"),
  //     },
  //     {
  //       id: 5,
  //       bg: require("../assets/images/bg/orsrc60857.jpg"),
  //     },
  //     {
  //       id: 6,
  //       bg: require("../assets/images/bg/orsrc67559.jpg"),
  //     },
  //   ];
  const defaultBg = bgs.filter((prop) => prop.id === 1);
  console.log(defaultBg);
  const [bg, setBg] = React.useState(defaultBg[0].bg);
  const [textColor, setTextColor] = React.useState("#000");
  const [alignment, setAlignment] = React.useState("left");
  const [fontSize, setFontSize] = React.useState(9);

  const setQuote = async (currentQuote) =>
    await AsyncStorage.setItem("currentQuote", currentQuote);

  const viewShotRef = useRef();
  const captureViewShot = () => {
    viewShotRef.current.capture().then((uri) => {
      console.log("do something with ", uri);
      Sharing.shareAsync(uri);
    }),
      (error) => console.error("Oops, snapshot failed", error);
  };
  const next = () => {
    const currentQuote = {
      quote,
      textColor,
      alignment,
      fontSize,
      //   uri,
      bg,
    };
    const data = JSON.stringify(currentQuote);
    setQuote(data);
    navigation.navigate("EditCurrentQuote");
  };
  function renderBookInfoSection() {
    return (
      <View>
        {/* Color Overlay */}
        <View
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: COLORS.black,
          }}
        ></View>

        {/* Navigation header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            height: 40,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="arrow-back-outline"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightBlue,
                alignSelf: "flex-end",
              }}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ ...FONTS.h3, color: "#fff" }}>Design</Text>
          </View>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={captureViewShot}
          >
            <Icon
              name="arrow-forward"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightBlue,
                alignSelf: "flex-end",
              }}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <LineDivider />
        {/* Book Cover */}
      </View>
    );
  }
  if (quote) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Book Cover Section */}
        <View
          style={{
            height: Dimensions.get("window").height * 0.07,
            // paddingBottom: 10,
          }}
        >
          {renderBookInfoSection()}
        </View>

        {/* Description */}
        <View style={{ flex: 1, flexDirection: "column" }}>
          <ViewShot
            ref={viewShotRef}
            style={{
              height: Dimensions.get("window").height * 0.5,
            }}
            options={{
              format: "jpg",
              quality: 1.0,
            }}
          >
            <Display
              quote={quote}
              bg={bg}
              textColor={textColor}
              alignment={alignment}
              fontSize={fontSize}
            />
          </ViewShot>
          <Settings
            setBg={setBg}
            bgs={bgs}
            setTextColor={setTextColor}
            textColor={textColor}
            alignment={alignment}
            setAlignment={setAlignment}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </View>
      </View>
    );
  } else {
    navigation.goBack();
    return <></>;
  }
};
export default EditingPoem;
