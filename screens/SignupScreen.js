import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../constants/styles";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
// import GoogleSvg from "./Google-Svg";
import $ from "jquery";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";

// WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [Loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   expoClientId:
  //     "972795524116-nu4bd6p3jj9h8p5p3n4ljtvve6707d6p.apps.googleusercontent.com",
  //   androidClientId:
  //     "972795524116-a0jpefh9keuhb75viitsdc8oi7um9b4m.apps.googleusercontent.com",
  //   iosClientId:
  //     "972795524116-mjipt12fldcnhslrgerbe0v2ivd4ecaa.apps.googleusercontent.com",
  // });
  const url = useSelector((state) => state.url);
  const onSignUp = (id_token) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          var user = userCredential.user;
          const profile = userCredential.additionalUserInfo.profile;
          console.log(user);
          console.log("user signed in");
          const db = firebase.firestore();
          if (user.emailVerified) {
            const userRef = db.collection("users").doc(user.uid);
            if (userCredential.additionalUserInfo.isNewUser) {
              userRef.set({
                uid: user.uid,
                email: user.email,
                locale: profile.locale,
                first_name: profile.given_name,
                last_name: profile.family_name,
                profile_picture: user.photoURL,
                phone_number: user.phoneNumber,
                createdAt: Date.now(),
              });
            } else {
              userRef.update({
                last_logged_in: Date.now(),
              });
            }
            userRef.onSnapshot((doc) => {
              dispatch(actions.setUserDetails(doc.data()));
              console.log("Current data: ", doc.data());
            });
          } else {
            user
              .sendEmailVerification()
              .then(function () {
                Dialog.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Success",
                  textBody:
                    "Email not verified. Kindy check to verify your account",
                  button: "close",
                });
              })
              .catch(function (error) {
                setLoading(false);
                var errorCode = error.code;
                var errorMessage = error.message;
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Sorry",
                  textBody: errorMessage,
                  button: "close",
                });
              });
          }
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Sorry",
            textBody: errorMessage,
            button: "close",
          });
        });
    });
  };

  // React.useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;

  //     const credential = provider.credential(id_token);
  //     onSignUp(id_token);
  //   }
  // }, [response]);

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      cPassword.length < 1
    ) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Sorry",
        textBody: "Please fill in your details",
      });
    } else if (password !== cPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Sorry",
        textBody: "Password not matching",
      });
    } else {
      setLoading(true);
      axios({
        method: "post",
        url: `${url}/api/user/register`,
        data: { name, email, password },
      })
        .then((response) => response.data)
        .then((data) => {
          console.log("data", data);
          if (data.type === "success") {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: data.message,
              button: "close",
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: "Sorry!",
              textBody: data.message,
              button: "close",
            });
            setLoading(false);
          }
        })
        .catch(function (error) {
          // alert(error.statusText);
          // setLoading(false);
          console.log(error);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Sorry!",
            textBody: `Sorry! ${error.AxiosError}`,
            button: "close",
          });
        });
    }
  };
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
            placeholder="Pen-name..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setName(text)}
          />
        </View>
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
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Comfrim Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setCPassword(text)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.loginText}>Sign Up</Text>
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
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 10,
            }}
          >
            <Icon name="user-plus" size={15} /> Already have an account
          </Text>
        </TouchableOpacity>
      </Animated.View>
      {Loading ? (
        <View
          intensity={60}
          tint="dark"
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
}
