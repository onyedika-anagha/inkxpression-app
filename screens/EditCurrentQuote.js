import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
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

const EditCurrentQuote = ({ route, navigation }) => {
  const [quote, setQuote] = useState({});
  const getAsyncUser = useCallback(async () => {
    const result = await AsyncStorage.getItem("currentQuote");
    const currentQuote = JSON.parse(result);
    console.log(currentQuote);
    setQuote(currentQuote);
  });
  useEffect(() => {
    getAsyncUser();
    return () => {
      getAsyncUser();
    };
  }, []);
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
            <Text style={{ ...FONTS.h3, color: "#fff" }}>
              Caption and Genre
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            // onPress={() =>
            //   navigation.navigate("EditingPoem", {
            //     quote: quote,
            //   })
            // }
          >
            <Icon
              name="checkmark"
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
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View
        style={{
          height: Dimensions.get("window").height * 0.07,
        }}
      >
        {renderBookInfoSection()}
      </View>

      <View
        style={{
          position: "relative",
          backgroundColor: "white",
          color: "black",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.3,
          marginBottom: 30,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            color: "black",
            width: "100%",
            height: "100%",
            fontSize: 20,
            paddingLeft: 10,
            paddingTop: 20,
            lineHeight: 23,
            flex: 2,
            textAlignVertical: "top",
          }}
          placeholder="Write your caption here..."
          multiline={true}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setQuote(text)}
        />
      </View>
    </View>
  );
};
export default EditCurrentQuote;
