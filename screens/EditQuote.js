import React from "react";
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
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";

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

const EditQuote = ({ route, navigation }) => {
  const { info } = route.params;
  const [quote, setQuote] = React.useState(info.quote);

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
            <Text style={{ ...FONTS.h3, color: "#fff" }}>Compose</Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={() => console.log("Click More")}
          >
            <Icon
              name="document-text-outline"
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

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={() =>
              navigation.navigate("EditDesign", {
                info: { ...info, quote },
              })
            }
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
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View>{renderBookInfoSection()}</View>

      <View
        style={{
          position: "relative",
          backgroundColor: "white",
          color: "black",
          width: "100%",
          height: "100%",
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
          placeholder="Write your original quote here..."
          multiline={true}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setQuote(text)}
          value={quote}
        />
      </View>
    </View>
  );
};
export default EditQuote;
