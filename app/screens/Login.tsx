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

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
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
  const handleLogin = () => {
    if (!validEmail || !validPassword) {
      Alert.alert(
        "Well something went wrong...",
        (validEmail ? "" : "Please put in the correct email format :)") +
          (validPassword ? "" : "\nDid you follow the password format?")
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
      <View className="mt-32 justify-center">
        <Text
          className="text-eggwhite self-center"
          style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}>
          Login
        </Text>
        <Text
          className="text-eggwhite self-center mt-1"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 18 }}>
          Welcome back! Please enter your details {":)"}
        </Text>
        <View className="form my-12 justify-center space-y-4">
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
              value={password}
            />
            <Text
              className="text-egglightgrey mx-8 self-end mt-2"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
              forgot password?
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1 items-center space-y-6">
        <TouchableOpacity
          className="justify-center items-center w-[260px] h-[60px] bg-eggorange rounded-3xl shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => handleLogin()}>
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}>
            Login
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
              Login with Google
            </Text>
          </View>
        </TouchableOpacity>
        <View className="relative text-center top-4 space-y-2">
          <View className="flex flex-row space-x-1">
            <Text
              className="text-egglightgrey"
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                className="text-[#C9A7E3]"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
                Sign up
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

export default Login;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
