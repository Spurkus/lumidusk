import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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
  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <Image
        source={Bonk}
        className="absolute w-[100px] h-[275px] top-[100px] self-end"
      />
      <Image
        source={Bink}
        className="absolute w-[300px] h-[400px] top-[350px]"
      />
      <View className="mt-16">
        <View className="ml-6">
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}>
            {currentDay} {" :)"}
          </Text>
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "ClashGrotesk-Light", fontSize: 24 }}>
            {currentDate}
          </Text>
        </View>
        <Box boxName="my-6 mx-5">
          <Text
            className="text-eggwhite"
            style={{ fontFamily: "Satoshi-Regular", fontSize: 24 }}>
            {quote}
          </Text>
          <Text
            className="text-[#B4A5A1] self-end"
            style={{ fontFamily: "Satoshi-Medium", fontSize: 14 }}>
            Jonathan Yun - 2021
          </Text>
        </Box>
      </View>
      <CalendarComponent />
      <View className="flex-1 items-center mt-12 space-y-6">
        <TouchableOpacity
          className="justify-center items-center w-[260px] h-[60px] bg-eggorange rounded-3xl shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => navigation.navigate("SignUp")}>
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}>
            Start Today's Journaling
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
