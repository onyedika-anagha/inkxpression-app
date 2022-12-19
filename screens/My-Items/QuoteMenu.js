import React, { useState } from "react";
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
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const QuoteMenu = (props) => {
  const [Opened, setOpened] = useState(false);
  const { item, navigation } = props;
  return Opened ? (
    <>
      <TouchableOpacity
        style={{ position: "absolute", top: 5, right: 15 }}
        onPress={() => setOpened(false)}
      >
        <Icon
          name="ellipsis-vertical-outline"
          style={{
            width: 25,
            height: 25,
            // tintColor: COLORS.lightBlue,
          }}
          size={25}
          color="#fff"
        />
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          top: 32,
          right: 0,
          backgroundColor: COLORS.white,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DCDCE925",
          }}
          onPress={() =>
            navigation.navigate("EditQuote", {
              info: item,
            })
          }
        >
          <Text>Edit Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DCDCE925",
          }}
          onPress={() =>
            navigation.navigate("EditDesign", {
              info: item,
            })
          }
        >
          <Text>Edit Design</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DCDCE925",
          }}
        >
          <Text>Save Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DCDCE925",
          }}
          onPress={() => Sharing.shareAsync(item.quote)}
        >
          <Text>Share Quote</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <TouchableOpacity
      style={{ position: "absolute", top: 5, right: 15 }}
      onPress={() => setOpened(true)}
    >
      <Icon
        name="ellipsis-vertical-outline"
        style={{
          width: 25,
          height: 25,
          // tintColor: COLORS.lightBlue,
        }}
        size={25}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

export default QuoteMenu;
