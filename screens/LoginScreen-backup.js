import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Animated,
  Image,
  KeyboardAvoidingView,
} from "react-native";
// import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../constants/styles";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
// import { auth, firebase, provider } from "../firebase";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";
// import GoogleSvg from "./Google-Svg";
import $ from "jquery";
import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(true);
  const [stop, setStop] = useState(false);
  const [user_id, setUser_id] = useState(0);

  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);

  const getAsyncUser = useCallback(async () => {
    const result = await AsyncStorage.getItem("user_id");
    const user_id = Number(result);
    setUser_id(user_id);
  });

  getAsyncUser();
  const checkIfLoggedin = () => {
    if (user_id > 0 && stop === false) {
      $.ajax({
        url: `${url}/api/user/${user_id}`,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log("userData", data);
          dispatch(actions.setUserDetails(data));
          navigation.navigate("Home");
          setStop(true);
        },
      });
    }
  };
  // const checkIfLoggedin = () => {
  //   const userData = user.data;
  //   console.log("user", user);
  //   const isEmpty = (obj) => {
  //     return Object.keys(obj).length === 0;
  //   };
  //   if (!isEmpty(user)) {
  //     navigation.navigate("Dashboard");
  //   }
  // };

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   expoClientId:
  //     "972795524116-nu4bd6p3jj9h8p5p3n4ljtvve6707d6p.apps.googleusercontent.com",
  //   androidClientId:
  //     "972795524116-a0jpefh9keuhb75viitsdc8oi7um9b4m.apps.googleusercontent.com",
  //   iosClientId:
  //     "972795524116-mjipt12fldcnhslrgerbe0v2ivd4ecaa.apps.googleusercontent.com",
  // });
  const setUserId = async (user_id, user) => {
    await AsyncStorage.setItem("user_id", `${user_id}`);
    await AsyncStorage.setItem("user", `${user}`);
  };
  const handleSignIn = async () => {
    if (email.length < 1 || password.length < 1) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Sorry",
        textBody: "Please fill in your details",
      });
    } else {
      setLoading(true);
      $.ajax({
        url: `${url}/api/user/login`,
        data: { email: email, password: password },
        type: "post",
        dataType: "json",
        success: function (data) {
          console.log("type", data.type);
          if (data.type === "success") {
            $.ajax({
              url: `http://localhost:8000/api/user/${data.id}`,
              type: "get",
              dataType: "json",
              success: function (data) {
                console.log("userData", data);
                dispatch(actions.setUserDetails(data));
                const user = JSON.stringify(data);
                setUserId(data.id, user);
                navigation.navigate("Home");
              },
            });
          } else {
            console.log("else");
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: "Sorry!",
              textBody: data.message,
              button: "close",
            });
            setLoading(false);
          }
        },
        error: function (data) {
          // alert(data.statusText);
          setLoading(false);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Sorry!",
            textBody: `Sorry! ${data.statusText}`,
            button: "close",
          });
        },
      });
    }
  };

  useEffect(() => {
    return checkIfLoggedin();
  });
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
    }).start();
  };
  fadeIn();
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <Root>
      <Animated.View
        style={[
          styles.myContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          style={styles.loginImg}
          source={require("../assets/images/logo/loader-logo.png")}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            handleSignIn();
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.glassButton,
            {
              display: "flex",
              flexDirection: "row",
              width: "80%",
            },
          ]}
          // onPress={() => promptAsync()}
        >
          {/* <GoogleSvg /> */}
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
              alignContent: "center",
              fontSize: 10,
            }}
          >
            Sign In Using Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.glassButton,
            {
              width: "80%",
            },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 10,
            }}
          >
            <Icon name="user-plus" size={15} /> Sign Up
          </Text>
        </TouchableOpacity>
      </Animated.View>
      {Loading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/images/logo/loader-logo.png")}
            style={{
              width: 200,
              height: 60,
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </Root>
  );
};
export default LoginScreen;
