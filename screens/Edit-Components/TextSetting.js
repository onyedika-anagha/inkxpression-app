import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TouchableHighlight,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import ColorPicker from "./ColorPicker";

const TextSetting = (props) => {
  const {
    alignment,
    setAlignment,
    fontSize,
    setFontSize,
    textColor,
    openColorMenu,
    setOpenColorMenu,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  //   const ColorPicker = () => (
  //     <Modal
  //       animationType="slide"
  //       transparent={false}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         alert("Modal has been closed.");
  //       }}
  //     >
  //       <View style={{ marginTop: 22 }}>
  //         <View>
  //           <Text>Hello World!</Text>

  //           <TouchableHighlight
  //             onPress={() => {
  //               setModalVisible(!modalVisible);
  //             }}
  //           >
  //             <Text>Hide Modal</Text>
  //           </TouchableHighlight>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  return (
    <>
      {openColorMenu ? (
        <ColorPicker {...props} />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 20,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                height: 42,
                flexGrow: 8,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ebeaea",
                borderRadius: 4,
                shadowColor: "rgba(11, 13, 49, 0.37)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 3,
                marginRight: 6,
              }}
            >
              <Text style={{ paddingLeft: 6 }}>ReemKufi Regular </Text>
              <Icon
                name="arrow-forward-ios"
                size={12}
                color="#000"
                style={{ paddingRight: 6 }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: 42,
                flexGrow: 2,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ebeaea",
                borderRadius: 4,
                shadowColor: "rgba(11, 13, 49, 0.37)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 3,
                marginRight: 6,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (alignment === "left") {
                    setAlignment("center");
                  } else if (alignment === "center") {
                    setAlignment("right");
                  } else {
                    setAlignment("left");
                  }
                }}
                style={{ paddingLeft: 8 }}
              >
                {alignment === "left" ? (
                  <Icon name="format-align-left" size={25} color="#000" />
                ) : alignment === "center" ? (
                  <Icon name="format-align-center" size={25} color="#000" />
                ) : (
                  <Icon name="format-align-right" size={25} color="#000" />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingRight: 8 }}>
                <Text style={{ fontSize: 25 }}>©</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 20,
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                width: 32,
                height: 42,
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: textColor,
                borderRadius: 4,
                shadowColor: "rgba(11, 13, 49, 0.37)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 3,
                marginRight: 6,
              }}
              onPress={() => {
                setOpenColorMenu(true);
              }}
            ></TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: 42,
                flexGrow: 8,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ebeaea",
                borderRadius: 4,
                shadowColor: "rgba(11, 13, 49, 0.37)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 3,
                marginRight: 6,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Slider
                style={{
                  width: "90%",
                  height: 40,
                }}
                minimumValue={1}
                maximumValue={30}
                minimumTrackTintColor={COLORS.lightBlue}
                thumbTintColor="#fff"
                value={fontSize}
                onValueChange={(value) => setFontSize(value)}
                step={1}
                // style={{ paddingLeft: 10 }}
              />
              <Text style={{ paddingRight: 8 }}>{fontSize}</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default TextSetting;
