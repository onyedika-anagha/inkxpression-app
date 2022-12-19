import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
//redux

const Wallpapers = (props) => {
  const { bgs, setBg, setTextColor } = props;
  const dispatch = useDispatch();
  const myWallpapers = useSelector((state) => state.myWallpapers);
  // console.log("myWallpapers", myWallpapers);
  const [mybgs, setMybgs] = React.useState(myWallpapers);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setBg(result.uri);
      const newBgs = [
        ...mybgs,
        {
          id: mybgs.length + 1,
          bg: { uri: result.uri },
        },
      ];
      dispatch(actions.setWallpaper(newBgs));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => pickImage()}>
        {/* Book Cover */}
        <LinearGradient
          // Button Linear Gradient
          colors={["#6982ef", "#d3d3d3"]}
          style={{
            marginTop: 10,
            marginRight: SIZES.radius,
            width: 80,
            height: 80,
            borderRadius: 10,
            shadowColor: "rgba(11, 13, 49, 0.37)",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/add-camera-icon-3.jpg")}
            resizeMode="cover"
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* <Icon
            name="images-outline"
            size={40}
            color="#000"
            style={{ paddingRight: 6 }}
          /> */}
        </LinearGradient>
      </TouchableOpacity>
      {mybgs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginTop: 10,
            marginRight: SIZES.radius,
          }}
          onPress={() => {
            const bg = mybgs.filter((prop) => prop.id === item.id);
            setBg(bg[0].bg);
          }}
        >
          <Image
            source={item.bg}
            resizeMode="cover"
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              shadowColor: "rgba(11, 13, 49, 0.37)",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 3,
            }}
          />
        </TouchableOpacity>
      ))}
      {bgs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginTop: 10,
            marginRight: SIZES.radius,
          }}
          onPress={() => {
            const bg = bgs.filter((prop) => prop.id === item.id);
            setBg(bg[0].bg);
          }}
        >
          {/* Book Cover */}
          <Image
            source={item.bg}
            resizeMode="cover"
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              shadowColor: "rgba(11, 13, 49, 0.37)",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 3,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Wallpapers;
