import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";

type NavigationBarProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
};

const NavigationBar = ({ navigation }: NavigationBarProps) => {
  return (
    <View className="fill h-20 flex-row justify-between border-t border-egggrey bg-eggblack px-16">
      <TouchableOpacity className="bottom-2 my-auto">
        <FontAwesomeIcon
          icon={faChartSimple}
          style={{
            shadowColor: "#FFFFE3",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            color: "#FFFFE3",
          }}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="bottom-2 my-auto"
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesomeIcon
          icon={faHouse}
          style={{
            shadowColor: "#FFFFE3",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            color: "#FFFFE3",
          }}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="bottom-2 my-auto"
        onPress={() => navigation.navigate("JournalSearch")}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            shadowColor: "#FFFFE3",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            color: "#FFFFE3",
          }}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;
