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

import Blob from "../assets/blob.png";
import Tringle from "../assets/tringle.png";
import Line from "../assets/line.png";
import Google from "../assets/google.png";
import CollapsibleContainer from "../components/CollapsibleComponent";
import ModalComponent from "../components/ModalComponent";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!&@#$%]).{8,24}$/;

type SignUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUp = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
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

  useEffect(() => {
    setValidMatch(matchPassword == password);
  }, [matchPassword]);

  // Sign up confirmation
  const handleSignUp = () => {
    if (!validEmail || !validPassword || !validMatch) {
      Alert.alert(
        "Well something went wrong...",
        (validEmail ? "" : "Please put in the correct email format :)") +
          (validPassword ? "" : "\nDid you follow the password format?") +
          (validMatch ? "" : "\nMake sure that the password matches!!"),
      );
      return;
    }

    Alert.alert(
      "Sign up has not been implemented yet >.<",
      "thanks for understanding :3",
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <ModalComponent
        title={modalTitle}
        text={modalText}
        visible={modalVisible}
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
      <View className="mt-28 justify-center">
        <Text
          className="self-center text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}
        >
          Sign up
        </Text>
        <Text
          className="mt-1 self-center text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 18 }}
        >
          Thank you for signing up to Lumidusk! {":)"}
        </Text>
        <View className="form my-8 justify-center space-y-2">
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
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
              value={password}
            />
            <CollapsibleContainer expanded={focusPassword && !validPassword}>
              <View className="mx-8 my-2 rounded-2xl bg-[#f9e3e3] px-4 py-2 ">
                <Text
                  className="text-egggrey"
                  style={{ fontFamily: "Satoshi-Medium", fontSize: 15 }}
                >
                  8 to 24 characters. Must include uppercase and lowercase
                  letters, a number and a special character.{"\n"}Allowed
                  special characters: ! & @ # $ %
                </Text>
              </View>
            </CollapsibleContainer>
          </View>
          <View>
            <Text
              className="ml-8 text-eggwhite"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
            >
              Re-Enter Password
            </Text>
            <TextInput
              className={`mx-8 my-1 h-12 rounded-3xl px-4 py-1 ${
                validMatch || !matchPassword ? "bg-[#E8E6EA]" : "bg-[#f9e3e3]"
              }`}
              style={{ fontFamily: "Satoshi-Regular", fontSize: 18 }}
              placeholder="•••••••••"
              secureTextEntry={true}
              onChangeText={(text) => setMatchPassword(text)}
              value={matchPassword}
            />
          </View>
        </View>
      </View>
      <View className="flex-1 items-center space-y-6">
        <TouchableOpacity
          className="h-[60px] w-[260px] items-center justify-center rounded-3xl bg-eggorange shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => handleSignUp()}
        >
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <Image source={Line} />
        <TouchableOpacity
          className="h-[60px] w-[260px] items-center justify-center rounded-3xl bg-[#F3F2F3]"
          onPress={() => {
            setModalTitle("Uhhh");
            setModalText("Not implemented yet :/");
            setModalVisible(true);
          }}
        >
          <View className="flex flex-row space-x-2">
            <Image source={Google} className="h-[29px] w-[29px]" />
            <Text
              className="text-grey"
              style={{ fontFamily: "Satoshi-Regular", fontSize: 20 }}
            >
              Sign Up with Google
            </Text>
          </View>
        </TouchableOpacity>
        <View className="relative top-4 space-y-2 text-center">
          <View className="flex flex-row space-x-1">
            <Text
              className="text-egglightgrey"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="text-[#C9A7E3]"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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

export default SignUp;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
