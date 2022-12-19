import React from "react";
import { Dimensions, Image } from "react-native";
// import Image from "react-native-scalable-image";

const FullWidthImage = (url) => (
  <Image
    width={Dimensions.get("window").width} // height will be calculated automatically
    source={url}
  />
);
export default FullWidthImage;
