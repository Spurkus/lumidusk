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
} from "react-native";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useFirebaseAuth } from "../context/AuthContext";

import Blob from "../assets/blob.png";
import Tringle from "../assets/tringle.png";
import Line from "../assets/line.png";
import Google from "../assets/google.png";
import CollapsibleContainer from "../components/CollapsibleComponent";
import ModalComponent from "../components/ModalComponent";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!&@#$%]).{8,24}$/;

type SignUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUp = ({ navigation }: SignUpProps) => {
  const user = useFirebaseAuth();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

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
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidMatch(matchPassword == password);
  }, [matchPassword, password]);

  // Sign up confirmation
  const handleSignUp = async () => {
    if (!username || !validEmail || !validPassword || !validMatch) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: username });
      setModalTitle("Sign Up Success!!");
      setModalText("Thank you for signing up, things will start get better :)");
      setModalHeight(200);
      setModalButton("Continue");
    } catch (error: FirebaseError | unknown) {
      setModalTitle("Error");
      setModalHeight(250);
      setModalButton("Close");
      if (!(error instanceof FirebaseError)) {
        setModalText("Sign up error");
      } else if (error.code === "auth/email-already-in-use") {
        setModalText("Email already in use. Please choose a different email.");
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
        buttons={[
          {
            label: modalButton,
            onPress: () => {
              if (user) {
                toggleModal();
                navigation.navigate("Home");
              } else {
                toggleModal();
              }
            },
          },
        ]}
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
      <View className="mt-24 justify-center">
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
        <View className="form my-5 justify-center space-y-2">
          <View>
            <Text
              className="ml-8 text-eggwhite"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
            >
              Username
            </Text>
            <TextInput
              className={`mx-8 my-1 h-12 rounded-3xl px-4 py-1 ${
                validUsername || !username ? "bg-[#E8E6EA]" : "bg-[#f9e3e3]"
              }`}
              style={{ fontFamily: "Satoshi-Regular", fontSize: 18 }}
              placeholder="watergirl206"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
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
          className={`h-[60px] w-[260px] items-center justify-center rounded-3xl ${
            validEmail && validPassword && validMatch
              ? "bg-eggorange shadow-eggorange"
              : "bg-egglightgrey shadow-egglightgrey"
          }`}
          disabled={!validEmail || !validPassword || !validMatch}
          style={styles.shadowButton}
          onPress={() => handleSignUp()}
        >
          <Text
            className={`${
              validEmail && validPassword && validMatch
                ? "text-grey"
                : "text-eggwhite"
            }`}
            style={
              validEmail && validPassword && validMatch
                ? { fontFamily: "Satoshi-Bold", fontSize: 20 }
                : { fontFamily: "Satoshi-Regular", fontSize: 20 }
            }
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <Image source={Line} />
        <TouchableOpacity
          className="h-[60px] w-[260px] items-center justify-center rounded-3xl bg-[#F3F2F3]"
          onPress={() => {
            setModalTitle("Uhhh");
            setModalHeight(200);
            setModalText("Not implemented yet :/");
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
              Sign Up with Google
            </Text>
          </View>
        </TouchableOpacity>
        <View className="relative space-y-2 text-center">
          <View className="flex flex-row space-x-1">
            <Text
              className="text-egglightgrey"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text
                className="text-[#C9A7E3]"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
              >
                Log in
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

export default SignUp;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
