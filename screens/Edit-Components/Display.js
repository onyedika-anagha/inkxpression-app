import React, { useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  ImageBackground,
} from "react-native";
import Watermark from "./Watermark";

const Display = (prop) => {
  const pan = useRef(new Animated.ValueXY()).current;

  let { quote, bg, textColor, alignment, fontSize } = prop;
  console.log(alignment);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: undefined,
          // figure out your image aspect ratio
          aspectRatio: 3 / 3,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Text
          style={{
            color: textColor,
            textAlign: alignment,
            fontSize,
            fontWeight: "bold",
          }}
        >
          {quote}
        </Text>
      </Animated.View>
      <Watermark />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default Display;
