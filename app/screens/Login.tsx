import React, { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useModal } from "../context/ModalContext";

import Blob from "../assets/blob.png";
import Tringle from "../assets/tringle.png";
import Line from "../assets/line.png";
import Google from "../assets/google.png";
import GuestLogin from "../components/GuestLogin";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!&@#$%]).{8,24}$/;

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const modal = useModal();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  // Testing the validity of inputs
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  // Sign up confirmation
  const handleLogin = async () => {
    if (!validEmail || !validPassword) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      modal.setTitle("Login Success!!");
      modal.setText(
        "Welcome back to lumidusk, things will start get better :)",
      );
      modal.setHeight(200);
      modal.setButtons([
        {
          label: "Continue",
          onPress: () => {
            navigation.navigate("Home");
            modal.setVisible(false);
          },
        },
      ]);
      modal.setBackDropPress({
        onBackdropPress: () => {
          navigation.navigate("Home");
          modal.setVisible(false);
        },
      });
    } catch (error: FirebaseError | unknown) {
      modal.setTitle("Error");
      modal.setHeight(250);
      modal.setButtons([
        { label: "Close", onPress: () => modal.setVisible(false) },
      ]);
      if (!(error instanceof FirebaseError)) {
        modal.setText("Login error");
      } else if (
        error.code === "auth/user-notfound" ||
        error.code === "auth/wrong-password"
      ) {
        modal.setText(
          "Invalid email used or incorrect password. Please try again",
        );
      } else if (error.code === "auth/too-many-requests") {
        modal.setText(
          "Too many unsuccessful login attempts. Please try again later.",
        );
      } else {
        modal.setText("Login error: " + error.message);
      }
    }
    modal.toggleModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-eggblack">
        <Image
          source={Blob}
          className="absolute mb-24 h-[238px] w-[162px] self-end "
        />
        <Image
          source={Tringle}
          className="absolute top-[380px] h-[160px] w-[82px]"
        />
        <View className="mt-32 justify-center">
          <Text
            className="self-center text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}
          >
            Login
          </Text>
          <Text
            className="mt-1 self-center text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 18 }}
          >
            Welcome back! Please enter your details {":)"}
          </Text>
          <View className="my-12 justify-center space-y-4">
            <View>
              <Text
                className="ml-8 text-eggwhite"
                style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
              >
                Email
              </Text>
              <TextInput
                className={`mx-8 my-1 h-12 rounded-3xl px-4 py-1 ${
                  validEmail || !email ? "bg-[#E8E6EA]" : "bg-[#f9e3e3]"
                }`}
                style={{ fontFamily: "Satoshi-Regular", fontSize: 18 }}
                placeholder="example@mail.com"
                keyboardType="email-address"
                inputMode="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View>
              <Text
                className="ml-8 text-eggwhite"
                style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
              >
                Password
              </Text>
              <TextInput
                className={`mx-8 my-1 h-12 rounded-3xl px-4 py-1 ${
                  validPassword || !password ? "bg-[#E8E6EA]" : "bg-[#f9e3e3]"
                }`}
                style={{ fontFamily: "Satoshi-Regular", fontSize: 18 }}
                placeholder="•••••••••"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <Text
                className="mx-8 mt-2 self-end text-egglightgrey"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
              >
                forgot password?
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 items-center space-y-6">
          <TouchableOpacity
            className={`h-[60px] w-[260px] items-center justify-center rounded-3xl ${
              validEmail && validPassword
                ? "bg-eggorange shadow-eggorange"
                : "bg-egglightgrey shadow-egglightgrey"
            }`}
            disabled={!validEmail || !validPassword}
            style={styles.shadowButton}
            onPress={() => handleLogin()}
          >
            <Text
              className={`${
                validEmail && validPassword ? "text-grey" : "text-eggwhite"
              }`}
              style={
                validEmail && validPassword
                  ? { fontFamily: "Satoshi-Bold", fontSize: 20 }
                  : { fontFamily: "Satoshi-Regular", fontSize: 20 }
              }
            >
              Login
            </Text>
          </TouchableOpacity>
          <Image source={Line} />
          <TouchableOpacity
            className="h-[60px] w-[260px] items-center justify-center rounded-3xl bg-[#F3F2F3]"
            onPress={() => {
              modal.setTitle("Uhhh");
              modal.setText("Not implemented yet :/");
              modal.setHeight(200);
              modal.setButtons([
                { label: "Close", onPress: () => modal.setVisible(false) },
              ]);
              modal.toggleModal();
            }}
          >
            <View className="flex flex-row space-x-2">
              <Image source={Google} className="h-[29px] w-[29px]" />
              <Text
                className="text-grey"
                style={{ fontFamily: "Satoshi-Regular", fontSize: 20 }}
              >
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View className="relative top-4 space-y-2 text-center">
            <View className="flex flex-row space-x-1">
              <Text
                className="text-egglightgrey"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
                <Text
                  className="text-[#C9A7E3]"
                  style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="self-center">
              <GuestLogin navigation={navigation} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
