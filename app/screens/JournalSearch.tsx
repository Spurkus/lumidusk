import { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useModal } from "../context/ModalContext";
import { FirebaseError } from "firebase/app";
import { useFirebaseAuth } from "../context/AuthContext";
import { useJournalData } from "../context/JournalContext";

import NavigationBar from "../components/NavigationBar";
import SearchBar from "../components/SearchBar";
import JournalFlatList from "../components/JournalFlatList";
import JournalFlatListTwo from "../components/JournalFlatListTwo";

import Bonk from "../assets/bonk.png";
import Bink from "../assets/bink.png";

type JournalProps = NativeStackScreenProps<RootStackParamList, "JournalSearch">;
type Mood = "happy" | "good" | "alright" | "sad" | "depressed";
type itemProps = {
  date: string;
  title: string;
  mood: Mood;
};

const JournalSearch = ({ navigation }: JournalProps) => {
  const user = useFirebaseAuth();
  const modal = useModal();
  const { update, setUpdate } = useJournalData();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [journals, setJournals] = useState<itemProps[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMoodData = async () => {
    try {
      setLoading(true);
      const loadedJournals = [];
      const keys = await AsyncStorage.getAllKeys();

      for (const key of keys) {
        if (key.startsWith("journal_") && key.split("_")[1] === user?.uid) {
          const storedData = await AsyncStorage.getItem(key);
          if (storedData) {
            const { title, mood } = JSON.parse(storedData);
            const date = key
              .replace("journal_", "")
              .replace(`${user?.uid}_`, "");

            loadedJournals.push({
              date,
              title,
              mood,
            });
          }
        }
      }

      const filteredJournals = loadedJournals.filter((journal) =>
        journal.title.toLowerCase().includes(searchPhrase.toLowerCase()),
      );

      // Now loadedJournals contains the data in the format you want
      setJournals(filteredJournals);
    } catch (error) {
      console.error("Error loading mood data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoodData();
  }, [user, searchPhrase]);

  useEffect(() => {
    loadMoodData();
    setUpdate(false);
  }, [update]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
      className="z-40"
    >
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
            {loading ? (
              <JournalFlatListTwo data={journals} navigation={navigation} />
            ) : (
              <JournalFlatList data={journals} navigation={navigation} />
            )}
          </View>
        </SafeAreaView>
        <NavigationBar navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default JournalSearch;
