import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert, // Never delete this alert it breaks the whole thing for some reason
} from "react-native";

import Flower from "../assets/flower.png";
import Crystal from "../assets/crystal.png";
import Penguin from "../assets/penguin.png";

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WelcomeScreen"
>;

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-eggblack">
      <View className="mt-16">
        <Image
          source={Crystal}
          className="absolute w-[138px] h-[162px] self-end mb-24 "
        />
        <Text
          className="text-eggwhite mt-10 ml-8"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 48 }}>
          Welcome to
        </Text>
        <Text
          className="text-eggwhite ml-8"
          style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}>
          Lumidusk
        </Text>
        <Text
          className="text-eggwhite mt-8 mr-8 text-right self-end w-[350px]"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}>
          your personal sanctuary for nothing each day, one emotion at a time{" "}
          {":)"}
        </Text>
        <Image
          className="absolute w-[140px] h-[150px] mt-[220px]"
          source={Flower}
        />
        <Image
          className="self-end mt-24 mb-12 mr-4 w-[178px] h-[222px]"
          source={Penguin}
        />
      </View>
      <View className="flex-1 items-center space-y-6">
        <TouchableOpacity
          className="justify-center items-center w-[260px] h-[60px] bg-eggorange rounded-3xl shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => navigation.navigate("SignUp")}>
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            className="text-egglightgrey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
            continue as guest
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
