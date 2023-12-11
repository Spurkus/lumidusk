import React, { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useFirebaseAuth } from "../context/AuthContext";

import Blob from "../assets/blob.png";
import Tringle from "../assets/tringle.png";
import Line from "../assets/line.png";
import Google from "../assets/google.png";
import ModalComponent from "../components/ModalComponent";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const user = useFirebaseAuth();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  // Modal Component
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalHeight, setModalHeight] = useState(1);
  const [modalButton, setModalButton] = useState("Close");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
      const user = await signInWithEmailAndPassword(auth, email, password);
      setModalTitle("Login Success!!");
      setModalText("Welcome back to lumidusk, things will start get better :)");
      setModalHeight(200);
      setModalButton("Continue");
    } catch (error: FirebaseError | unknown) {
      setModalTitle("Error");
      setModalHeight(250);
      setModalButton("Close");
      if (!(error instanceof FirebaseError)) {
        setModalText("Login error");
      } else if (error.code === "auth/user-notfound") {
        setModalText("Invalid email used. Please try again");
      } else if (error.code === "auth/wrong-password") {
        setModalText("Incorrect password. Please try again");
      } else if (error.code === "auth/too-many-requests") {
        setModalText(
          "Too many unsuccessful login attempts. Please try again later.",
        );
      } else {
        setModalText("Sign up error: " + error.message);
      }
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <ModalComponent
        title={modalTitle}
        text={modalText}
        height={modalHeight}
        visible={modalVisible}
        button={modalButton}
        buttonFunction={() => {
          if (user) {
            toggleModal();
            navigation.replace("Home");
          } else {
            toggleModal();
          }
        }}
        toggleModal={toggleModal}
      />
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
        <View className="form my-12 justify-center space-y-4">
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
            setModalTitle("Uhhh");
            setModalText("Not implemented yet :/");
            setModalHeight(200);
            setModalButton("Close");
            setModalVisible(true);
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
          <TouchableOpacity onPress={() => navigation.replace("Home")}>
            <Text
              className="self-center text-egglightgrey"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
            >
              continue as guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
