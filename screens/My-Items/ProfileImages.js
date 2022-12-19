import React, { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../constants/styles";
import { FONTS, COLORS, SIZES, icons } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileImages = (props) => {
  const [image, setImage] = useState(null);
  const { profile, setProfile, url } = props;

  const pickImage = async (prop) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const newProfile =
        prop === "bg"
          ? { ...profile, profileBg: { uri: result.uri } }
          : { ...profile, dp: { uri: result.uri } };
      setProfile(newProfile);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => pickImage("bg")}>
        <ImageBackground
          source={{ uri: `${url}/images/bg/${profile.bg_image}` }}
          style={{
            width: undefined,
            padding: 16,
            paddingTop: 48,
            paddingBottom: 48,
            marginTop: -30,
            // marginBottom: -15,
            justifyContent: "center",
            alignItems: "center",
            height: 150,
          }}
          imageStyle={{ opacity: 1 }}
        ></ImageBackground>
      </TouchableOpacity>
      <Image
        source={{ uri: `${url}/images/profile/${profile.profile_image}` }}
        style={[styles.avatar, { top: -50, marginLeft: 30 }]}
      />
      <TouchableOpacity
        onPress={() => pickImage("dp")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderColor: COLORS.white,
          borderWidth: 1,
          left: 32,
          top: -82,
          backgroundColor: COLORS.black,
          justifyContent: "center",
          alignItems: "center",
          //   position: "absolute",
          // tintColor: COLORS.lightBlue,
        }}
      >
        <Icon
          name="camera-outline"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
          }}
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImages;
