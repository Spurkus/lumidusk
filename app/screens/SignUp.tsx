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
          (validMatch ? "" : "\nMake sure that the password matches!!")
      );
      return;
    }

    Alert.alert(
      "Sign up has not been implemented yet >.<",
      "thanks for understanding :3"
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <Image
        source={Blob}
        className="absolute w-[162px] h-[238px] self-end mb-24 "
      />
      <Image
        source={Tringle}
        className="absolute w-[82px] h-[160px] top-[380px]"
      />
      <View className="mt-28 justify-center">
        <Text
          className="text-eggwhite self-center"
          style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}>
          Sign up
        </Text>
        <Text
          className="text-eggwhite self-center mt-1"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 18 }}>
          Thank you for signing up to Lumidusk! {":)"}
        </Text>
        <View className="form my-8 justify-center space-y-2">
          <View>
            <Text
              className="text-eggwhite ml-8"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}>
              Email
            </Text>
            <TextInput
              className={`rounded-3xl mx-8 my-1 h-12 py-1 px-4 ${
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
              className="text-eggwhite ml-8"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}>
              Password
            </Text>
            <TextInput
              className={`rounded-3xl mx-8 my-1 h-12 py-1 px-4 ${
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
              <View className="bg-[#f9e3e3] rounded-2xl mx-8 my-2 py-2 px-4 ">
                <Text
                  className="text-egggrey"
                  style={{ fontFamily: "Satoshi-Medium", fontSize: 15 }}>
                  8 to 24 characters. Must include uppercase and lowercase
                  letters, a number and a special character.{"\n"}Allowed
                  special characters: ! & @ # $ %
                </Text>
              </View>
            </CollapsibleContainer>
          </View>
          <View>
            <Text
              className="text-eggwhite ml-8"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}>
              Re-Enter Password
            </Text>
            <TextInput
              className={`rounded-3xl mx-8 my-1 h-12 py-1 px-4 ${
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
          className="justify-center items-center w-[260px] h-[60px] bg-eggorange rounded-3xl shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => handleSignUp()}>
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}>
            Sign up
          </Text>
        </TouchableOpacity>
        <Image source={Line} />
        <TouchableOpacity
          className="justify-center items-center w-[260px] h-[60px] bg-[#F3F2F3] rounded-3xl"
          onPress={() => Alert.alert("uhh... not done yet soz")}>
          <View className="flex flex-row space-x-2">
            <Image source={Google} className="w-[29px] h-[29px]" />
            <Text
              className="text-grey"
              style={{ fontFamily: "Satoshi-Regular", fontSize: 20 }}>
              Sign Up with Google
            </Text>
          </View>
        </TouchableOpacity>
        <View className="relative text-center top-4 space-y-2">
          <View className="flex flex-row space-x-1">
            <Text
              className="text-egglightgrey"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="text-[#C9A7E3]"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text
              className="text-egglightgrey self-center"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
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
