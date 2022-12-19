import React, { useState } from "react";
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
  TouchableHighlight,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../constants/styles";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector, useStore } from "react-redux";
import * as actions from "./../redux/actions";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";
import axios from "axios";

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

const AddStory = ({ route, navigation }) => {
  const [Info, setInfo] = useState({
    cover: "",
    title: "",
    description: "",
    story: "",
    story_id: 0,
  });
  const { user_id } = route.params;
  const [image, setImage] = useState(
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  );
  const [base64, setBase64] = useState(
    "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const url = useSelector((state) => state.url);
  const user = useSelector((state) => state.user);
  // console.log("add: user", user);
  const nextPage = async () => {
    console.log("url", url);
    console.log("image", base64);
    axios
      .post(`${url}/api/save/bookInfo`, {
        user_id,
        bookName: title,
        bookCover: `data:image/gif;base64,${base64}`,
        description,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.type === "success") {
          navigation.navigate("WriteStory", {
            Info: { ...Info, story_id: data.story_id },
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Sorry!",
            textBody: data.message,
            button: "close",
          });
        }
      })
      .catch(function (error) {
        // alert(error.statusText);
        // setLoading(false);
        console.log(error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Sorry!",
          textBody: `Sorry! ${error.AxiosError}`,
          button: "close",
        });
      });
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
            <Text style={{ ...FONTS.h3, color: "#fff" }}>Add Story Info</Text>
          </View>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={() => nextPage()}
          >
            {image !== null && title.length > 0 && description.length > 0 ? (
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
            ) : (
              <Text style={{ ...FONTS.body4, color: "#fff" }}>SKIP</Text>
            )}
          </TouchableOpacity>
        </View>

        <LineDivider />
        {/* Book Cover */}
      </View>
    );
  }
  const AddCover = () => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [3.5, 4],
        quality: 1,
      });
      // let pickerResult = await ImagePicker.launchImageLibraryAsync({
      //   base64: true,
      //   allowsEditing: false,
      //   aspect: [4, 3],
      // });

      console.log("result", result);
      console.log("base64", result.base64);

      if (!result.cancelled) {
        const newInfo = { ...Info, cover: result.uri };
        setImage(result.uri);
        setBase64(result.base64);
        setInfo(newInfo);
      }
    };
    return (
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.097)",
          shadowColor: "rgba(11, 13, 49, 0.37)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 3,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image === null ? (
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{ flex: 1, flexDirection: "row", padding: 10 }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1.5,
                width: 100,
                height: 100,
                //   aspectRatio: 2 / 3,
                borderColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Icon
                name="add"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.lightBlue,
                  //   alignSelf: "flex-end",
                }}
                size={25}
                color="#fff"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 8,
              }}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                Add a cover
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => pickImage()}>
            <ImageBackground
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                flexDirection: "row",
                padding: 10,
              }}
              blurRadius={5}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1.5,
                  width: 50,
                  height: 100,
                  //   aspectRatio: 2 / 3,
                  // borderColor: COLORS.white,
                  // borderWidth: 1,
                  // borderRadius: 5,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 80,
                    height: 100,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 8,
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                  Change Cover
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const Infos = ({ setDescription, setTitle }) => {
    return <></>;
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View>{renderBookInfoSection()}</View>
      <AddCover />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          //   top: -150,
        }}
      >
        <TextInput
          style={{
            backgroundColor: COLORS.black,
            color: "white",
            width: "100%",
            height: 100,
            fontSize: 20,
            paddingLeft: 10,
            paddingTop: 20,
            lineHeight: 50,
            margin: 20,
            textAlignVertical: "top",
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
          placeholder="Story Title"
          placeholderTextColor="#fffff35"
          onChangeText={(text) => {
            setTitle(text), setInfo({ ...Info, title: text });
          }}
          autoFocus={false}
        />
        <TextInput
          style={{
            backgroundColor: COLORS.black,
            color: "white",
            width: "100%",
            height: 100,
            fontSize: 20,
            paddingLeft: 10,
            paddingTop: 20,
            lineHeight: 50,
            margin: 20,
            textAlignVertical: "top",
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          placeholder="Story Description"
          multiline={true}
          placeholderTextColor="#fffff35"
          onChangeText={(text) => {
            setDescription(text), setInfo({ ...Info, description: text });
          }}
        />
      </View>
      {/* <View style={{ flexGrow: 5 }}></View> */}
    </View>
  );
};
export default AddStory;
