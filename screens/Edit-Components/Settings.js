import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Modal,
  Dimensions,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Wallpapers from "./Wallpapers";
import TextSetting from "./TextSetting";

const Settings = (props) => {
  const [active, setActive] = React.useState("Wallpaper");
  const [openColorMenu, setOpenColorMenu] = React.useState(false);

  return (
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height * 0.43,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.radius,
          height: 40,
          alignItems: "flex-end",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          borderStyle: "solid",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: SIZES.base, padding: 5 }}
          onPress={() => setOpenColorMenu(false)}
        >
          <Icon
            name="arrow-back-outline"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.gray,
              alignSelf: "flex-end",
            }}
            size={25}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              width: "50%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            },
            active === "Wallpaper"
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.lightBlue,
                  borderStyle: "solid",
                }
              : "",
          ]}
          onPress={() => setActive("Wallpaper")}
        >
          <Text style={{ color: "#000" }}>WALLPAPPER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              width: "50%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            },
            active !== "Wallpaper"
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.lightBlue,
                  borderStyle: "solid",
                }
              : "",
          ]}
          onPress={() => setActive("Text")}
        >
          <Text style={{ color: "#000" }}>TEXT</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {active === "Wallpaper" ? (
          <Wallpapers {...props} />
        ) : (
          <TextSetting
            {...props}
            openColorMenu={openColorMenu}
            setOpenColorMenu={setOpenColorMenu}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default Settings;
