import { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useModal } from "../context/ModalContext";
import { FirebaseError } from "firebase/app";
import { useFirebaseAuth } from "../context/AuthContext";
import { useJournalData } from "../context/JournalContext";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

import Box from "../components/Box";
import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";

import Bonk from "../assets/bonk.png";
import Bink from "../assets/bink.png";

type JournalProps = NativeStackScreenProps<RootStackParamList, "JournalSearch">;
type Mood = "happy" | "good" | "alright" | "sad" | "depressed";
type itemProps = {
  date: string;
  title: string;
  mood: Mood;
};

const MOOD_COLOURS = {
  happy: "#6AB13F",
  good: "#009B70",
  alright: "#007E93",
  sad: "#005C94",
  depressed: "#1A3671",
};

const mockupData: itemProps[] = [
  { date: "2023-12-20", title: "its been sad", mood: "sad" },
  { date: "2023-12-21", title: "im :( rn", mood: "depressed" },
  { date: "2023-12-22", title: "third avenue", mood: "alright" },
  { date: "2023-12-23", title: "oh yea lolz", mood: "sad" },
  { date: "2023-12-24", title: "Empty", mood: "sad" },
  { date: "2023-12-25", title: "Bonk", mood: "happy" },
  { date: "2023-12-26", title: "Sadge", mood: "depressed" },
  { date: "2023-12-27", title: "Genshin Impact", mood: "alright" },
  { date: "2023-12-28", title: "Silly guy!!", mood: "good" },
  { date: "2023-12-29", title: "honestly", mood: "sad" },
  { date: "2023-12-30", title: "bruh", mood: "sad" },
  { date: "2023-12-31", title: "oopsies >.<", mood: "happy" },
];

const JournalSearch = ({ navigation }: JournalProps) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const renderItem = ({ date, title, mood }: itemProps) => {
    const colour = MOOD_COLOURS[mood];
    return (
      <Box className="mx-5 my-2 ">
        <TouchableOpacity onPress={() => console.log(colour)}>
          <View className="flex-row">
            <View
              className="w-9 rounded-2xl"
              style={{
                backgroundColor: colour,
                shadowColor: colour,
                shadowOpacity: 0.65,
                shadowRadius: 10,
              }}
            />
            <View className="ml-5">
              <Text
                className="text-eggwhite"
                style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 24 }}
              >
                {title}
              </Text>
              <Text
                className="text-[#B4A5A1]"
                style={{ fontFamily: "Satoshi-Medium", fontSize: 16 }}
              >
                {date}
              </Text>
            </View>
            <View className="my-auto ml-auto">
              <FontAwesomeIcon
                style={{ color: "#5F5F5A" }}
                size={30}
                icon={faAngleRight}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Box>
    );
  };
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-eggblack">
        <Image
          source={Bonk}
          className="absolute top-[100px] h-[275px] w-[100px] self-end"
        />
        <Image
          source={Bink}
          className="absolute top-[350px] h-[400px] w-[300px]"
        />
        <View className="mt-8">
          <View className="mx-6 mb-2">
            <Text
              className="text-eggwhite"
              style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 48 }}
            >
              Search!
            </Text>
          </View>
          <SearchBar search={searchPhrase} setSearch={setSearchPhrase} />
          <FlatList
            className="mt-3"
            data={mockupData}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => renderItem(item)}
            initialNumToRender={10}
          />
        </View>
      </SafeAreaView>
      <NavigationBar navigation={navigation} />
    </View>
  );
};

export default JournalSearch;
