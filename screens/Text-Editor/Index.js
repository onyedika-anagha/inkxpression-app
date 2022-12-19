import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { COLORS } from "../../constants";

const TempScreen = ({ route, navigation }) => {
  const richText = useRef();
  const { Info } = route.params;
  const [Story, setStory] = useState(Info.story);
  // useEffect(() => {
  //   const { Info } = route.params;
  //   setStory(Info.story);
  //   return () => {};
  // }, [Story]);
  // console.log(route);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black }}>
      <ScrollView
        style={{
          height: Dimensions.get("window").height * 0.93,
          backgroundColor: COLORS.black,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Text>Description:</Text>
          <RichEditor
            ref={richText}
            onChange={(descriptionText) => {
              setStory(descriptionText);
            }}
            initialHeight={Dimensions.get("window").height * 0.93}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#000" }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <RichToolbar
          style={{ backgroundColor: "#000" }}
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            // actions.setStrikethrough,
            actions.insertImage,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.undo,
            actions.redo,
            actions.heading1,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
          ]}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[{ color: tintColor }]}>H1</Text>
            ),
          }}
          selectedButtonStyle={{ color: "#fff" }}
          selectedIconTint="#fff"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TempScreen;
