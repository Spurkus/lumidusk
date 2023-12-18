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
import { FirebaseError } from "firebase/app";

import Box from "../components/Box";
import CalendarComponent from "../components/CalendarComponent";
import { CalendarUtils } from "react-native-calendars";

import Bonk from "../assets/bonk.png";
import Bink from "../assets/bink.png";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

// Current Date
export const days = [
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
const initialDate = CalendarUtils.getCalendarDateString(date);

// Auto generate daily quote somehow
const quote = '"remember to be kind to yourself"';

const Home = ({ navigation }: HomeProps) => {
  const user = useFirebaseAuth();
  const modal = useModal();

  const [buttonMessage, setButtonMessage] = useState(
    "Start Today's Journaling",
  );
  const [dateSelected, setDateSelected] = useState(initialDate);

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
          try {
            await signOut(auth);
            navigation.navigate("WelcomeScreen");
            modal.setVisible(false);
          } catch (error: FirebaseError | unknown) {
            modal.setVisible(false);
            modal.setTitle("Error");
            modal.setHeight(240);
            if (!(error instanceof FirebaseError)) {
              modal.setText("Login error");
            } else {
              modal.setText("Login error: " + error.message);
            }
            modal.setVisible(true);
          }
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
      <CalendarComponent
        setMessage={setButtonMessage}
        selected={dateSelected}
        setSelected={setDateSelected}
      />
      <View className="mt-12 flex-1 items-center space-y-6">
        <TouchableOpacity
          className="h-[60px] items-center justify-center rounded-3xl bg-eggorange px-4 shadow-eggorange"
          style={styles.shadowButton}
          onPress={() =>
            navigation.navigate("Journal", { dateSelected: dateSelected })
          }
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
