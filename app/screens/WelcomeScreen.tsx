import React from "react";
import { withExpoSnack } from "nativewind";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import Flower from "../assets/flower.png";
import Crystal from "../assets/crystal.png";
import Penguin from "../assets/penguin.png";

interface WelcomeScreenProps {
  onLayout: () => void | Promise<void>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLayout }) => {
  return (
    <SafeAreaView className="flex-1 bg-eggblack" onLayout={onLayout}>
      <View className="mt-20">
        <Image
          source={Crystal}
          className="absolute w-[138px] h-[162px] self-end mb-24 shadow-eggorange"
          style={styles.shadowOne}
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
          className="absolute w-[140px] h-[150px] mt-[220px] shadow-eggpink"
          style={styles.shadowOne}
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
          style={styles.shadowFive}>
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
  shadowOne: {
    shadowOpacity: 0.25,
    shadowRadius: 18,
  },
  shadowFive: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
