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
          className="absolute mb-24 h-[162px] w-[138px] self-end "
        />
        <Text
          className="ml-8 mt-10 text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 48 }}
        >
          Welcome to
        </Text>
        <Text
          className="ml-8 text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}
        >
          Lumidusk
        </Text>
        <Text
          className="mr-8 mt-8 w-[350px] self-end text-right text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
        >
          your personal sanctuary for nothing each day, one emotion at a time{" "}
          {":)"}
        </Text>
        <Image
          className="absolute mt-[220px] h-[150px] w-[140px]"
          source={Flower}
        />
        <Image
          className="mb-12 mr-4 mt-24 h-[222px] w-[178px] self-end"
          source={Penguin}
        />
      </View>
      <View className="flex-1 items-center space-y-6">
        <TouchableOpacity
          className="h-[60px] w-[260px] items-center justify-center rounded-3xl bg-eggorange shadow-eggorange"
          style={styles.shadowButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            className="text-egglightgrey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
          >
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
