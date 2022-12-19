import React from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
} from "react-native";

const Watermark = () => (
  <Image
    source={require("../../assets/images/logo/HOW2.png")}
    style={{
      position: "absolute",
      //   color: "rgba(255,255,255,0.7)",
      //   backgroundColor: "rgba(0,0,0,0.7)",
      bottom: 3,
      right: 3,
      height: 20,
      width: 66.67,
      opacity: 0.7,
    }}
  />
);
export default Watermark;
