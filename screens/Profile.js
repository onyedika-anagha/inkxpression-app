import React, { useState, useCallback, useEffect } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../constants/styles";
import ProfileImages from "./My-Items/ProfileImages";
import Quotes from "./My-Items/Quotes";
import Stories from "./My-Items/Stories";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 5, top: 2 }}>
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

const Profile = ({ route, navigation }) => {
  const [user_id, setUser_id] = useState(0);
  const [stop, setStop] = useState(false);
  const [profile, setProfile] = useState({});
  console.log(profile);
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState("quotes");

  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);

  const getAsyncUser = useCallback(async () => {
    const result = await AsyncStorage.getItem("user_id");
    const user_id = Number(result);
    setUser_id(user_id);
    if (user_id > 0 && stop === false) {
      axios
        .get(`${url}/api/user/${user_id}`)
        .then((response) => response.data)
        .then((data) => {
          setProfile(data);
          dispatch(actions.setUserDetails(data));
          setStop(true);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  });
  getAsyncUser();
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
            // onPress={() => navigation.goBack()}
          >
            <Text style={{ ...FONTS.h3, color: "#fff" }}>Profile</Text>
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {/* <Text style={{ ...FONTS.h3, color: "#fff" }}>Compose</Text> */}
          </View>

          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={() => console.log("Click More")}
          >
            <Icon
              name="star-outline"
              style={{
                width: 25,
                height: 25,
                // tintColor: COLORS.lightBlue,
                alignSelf: "flex-end",
              }}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={() => console.log("Click More")}
          >
            <Icon
              name="cellular-outline"
              style={{
                width: 25,
                height: 25,
                // tintColor: COLORS.lightBlue,
                alignSelf: "flex-end",
              }}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            // onPress={() =>
            //   navigation.navigate("EditingPoem", {
            //     quote: quote,
            //   })
            // }
          >
            <Icon
              name="menu-outline"
              style={{
                width: 25,
                height: 25,
                // tintColor: COLORS.lightBlue,
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

  const AddBio = () => (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 22, height: "50%", width: "50%" }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          // tintColor: COLORS.lightBlue,
          alignSelf: "center",
          height: 25,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          // margin: "40px auto",
          backgroundColor: "rgba(255, 255, 255, 0.097)",
          shadowColor: "rgba(11, 13, 49, 0.37)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 3,
          padding: 20,
          // flexDirection: "row",
          marginRight: 10,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon
          name="add"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
            alignSelf: "center",
          }}
          size={25}
          color="#fff"
        />
        <Text style={{ color: "#fff" }}>ADD YOUR BIO</Text>
      </TouchableOpacity>
    </>
  );
  const UserBio = () =>
    Object.keys(profile).length > 0 && profile.bio.length > 0 ? (
      <Text>{profile.bio}</Text>
    ) : (
      <AddBio />
    );
  const UserInfo = () => (
    <View style={{ paddingLeft: 20, top: -20 }}>
      <Text style={styles.profilename}>{profile.email}</Text>
      <Text style={styles.itemText}>({profile.name})</Text>
      <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity>
          <Text style={[styles.itemText, { textTransform: "uppercase" }]}>
            {profile.followers} followers
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.itemText,
            {
              textTransform: "uppercase",
            },
          ]}
        >
          {" "}
        </Text>
        <LineDivider />
        <Text
          style={[
            styles.itemText,
            {
              textTransform: "uppercase",
            },
          ]}
        >
          {" "}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.itemText, { textTransform: "uppercase" }]}>
            {profile.following} following
          </Text>
        </TouchableOpacity>
      </View>
      <UserBio />
      <View
        style={[
          {
            borderBottomWidth: 1,
            borderBottomColor: "#DCDCE925",
            marginRight: 10,
            paddingTop: 10,
          },
        ]}
      ></View>
      <View
        style={{
          // borderBottomWidth: 1,
          // borderBottomColor: "#DCDCE925",
          left: 0,
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
          paddingBottom: 10,
          marginRight: 10,
        }}
      >
        <Icon
          name="time-outline"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
            alignSelf: "center",
          }}
          size={25}
          color="#fff"
        />
        <Text style={{ color: "#DCDCE925" }}>Joined {profile.joined}</Text>
      </View>
    </View>
  );
  const NavTab = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        top: -20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#DCDCE925",
        height: 40,
        alignItems: "stretch",
        alignContent: "stretch",
        paddingHorizontal: SIZES.radius,
      }}
    >
      <TouchableOpacity
        style={[
          {
            marginLeft: SIZES.base,
            alignItems: "center",
            justifyContent: "center",
            width: 100,
          },
          active === "quotes"
            ? {
                borderBottomWidth: 2,
                borderBottomColor: COLORS.lightBlue,
                borderStyle: "solid",
              }
            : "",
        ]}
        onPress={() => setActive("quotes")}
      >
        <Text style={{ ...FONTS.h4, color: "#fff" }}>Quotes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          {
            marginLeft: SIZES.base,
            alignItems: "center",
            justifyContent: "center",
            width: 100,
          },
          active === "stories"
            ? {
                borderBottomWidth: 2,
                borderBottomColor: COLORS.lightBlue,
                borderStyle: "solid",
              }
            : "",
        ]}
        onPress={() => setActive("stories")}
      >
        <Text style={{ ...FONTS.h4, color: "#fff" }}>Stories</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text style={{ ...FONTS.h3, color: "#fff" }}>Compose</Text> */}
      </View>
      <TouchableOpacity
        style={{
          marginRigth: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
        // onPress={() =>
        //   navigation.navigate("EditingPoem", {
        //     quote: quote,
        //   })
        // }
      >
        <Icon
          name="menu-outline"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
            alignSelf: "flex-end",
          }}
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View>{renderBookInfoSection()}</View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ProfileImages profile={profile} setProfile={setProfile} url={url} />
        <UserInfo />
        <NavTab />
        {active === "quotes" ? (
          <Quotes navigation={navigation} user_id={user_id} />
        ) : (
          <Stories navigation={navigation} user_id={user_id} />
        )}
      </ScrollView>
    </View>
  );
};
export default Profile;
