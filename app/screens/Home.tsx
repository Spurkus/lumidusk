import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

import Box from "../components/Box";
import CalendarComponent from "../components/CalendarComponent";

import Bonk from "../assets/bonk.png";
import Bink from "../assets/bink.png";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

// Current Date
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const date = new Date();
const currentDay = days[date.getDay()];
const currentDate = date.toLocaleDateString();

// Auto generate daily quote somehow
const quote = '"remember to be kind to yourself"';

const Home = ({ navigation }: HomeProps) => {
  const user = useFirebaseAuth();
  const modal = useModal();

  const [buttonMessage, setButtonMessage] = useState(
    "Start Today's Journaling",
  );

  const handleSignOut = () => {
    modal.setTitle("Sign Out Confirmation");
    modal.setText("Your notes won't be available until you sign back in");
    modal.setHeight(240);
    modal.setButtons([
      {
        label: "Cancel",
        onPress: () => modal.setVisible(false),
      },
      {
        label: "Confirm",
        onPress: async () => {
          modal.setVisible(false);
          await signOut(auth);
          navigation.navigate("WelcomeScreen");
        },
      },
    ]);
    modal.toggleModal();
  };

  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <Image
        source={Bonk}
        className="absolute top-[100px] h-[275px] w-[100px] self-end"
      />
      <Image
        source={Bink}
        className="absolute top-[350px] h-[400px] w-[300px]"
      />
      <View className="absolute right-4 top-16 self-end">
        <TouchableOpacity
          className="h-[45px] items-center justify-center rounded-3xl bg-egglightorage px-4 shadow-eggorange"
          onPress={() => {
            handleSignOut();
          }}
        >
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-16">
        <View className="ml-6">
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}
          >
            {currentDay} {" :)"}
          </Text>
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Light", fontSize: 24 }}
          >
            {currentDate} {user?.displayName}
          </Text>
        </View>
        <Box className="mx-5 my-6">
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "Satoshi-Regular", fontSize: 24 }}
          >
            {quote}
          </Text>
          <Text
            className="self-end text-[#B4A5A1]"
            style={{ fontFamily: "Satoshi-Medium", fontSize: 14 }}
          >
            Jonathan Yun - 2021
          </Text>
        </Box>
      </View>
      <CalendarComponent setMessage={setButtonMessage} />
      <View className="mt-12 flex-1 items-center space-y-6">
        <TouchableOpacity
          className="h-[60px] items-center justify-center rounded-3xl bg-eggorange px-4 shadow-eggorange"
          style={styles.shadowButton}
        >
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}
          >
            {buttonMessage}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
