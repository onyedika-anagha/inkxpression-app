import React, { useRef } from "react";
import { View, Image, Animated, Easing } from "react-native";
import { COLORS } from "./theme";

const Loader = () => {
  const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    runAnimationFn();
    console.log(fadeAnim);
  }, []);

  const runAnimationFn = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        overflow: "hidden",
        backgroundColor: COLORS.black,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeAnim,
        }}
      >
        <Image
          source={require("../assets/images/logo/loader-logo.png")}
          style={{
            width: 200,
            height: 60,
          }}
        />
      </Animated.View>
    </View>
  );
};
export default Loader;
