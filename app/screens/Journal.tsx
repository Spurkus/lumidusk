import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFirebaseAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { CalendarUtils } from "react-native-calendars";
import { FirebaseError } from "firebase/app";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("SCROLLVIEW"); // Makes the thing happy

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

import Box from "../components/Box";
import { days } from "../screens/Home";

import Line from "../assets/line.png";
import { useJournalData } from "../context/JournalContext";

type Mood = "" | "happy" | "good" | "alright" | "sad" | "depressed";

type JournalProps = {
  route: RouteProp<RootStackParamList, "Journal">;
  navigation: NativeStackNavigationProp<RootStackParamList, "Journal">;
};

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const ordinalDay = getOrdinalSuffix(day);

  return `${ordinalDay} of ${month}`;
};

const Journal = ({ route, navigation }: JournalProps) => {
  const user = useFirebaseAuth();
  const modal = useModal();
  const { dateSelected, setDateSelected, setUpdate } = useJournalData();

  const [openDropdown, setOpenDropdowwn] = useState(false);
  const [mood, setMood] = useState<Mood>("");
  const [backgroundColor, setBackgroundColor] = useState("#505050");
  const [moods, setMoods] = useState([
    {
      label: "happy",
      value: "happy",
      containerStyle: {
        backgroundColor: "#6AB13F",
      },
    },
    {
      label: "good",
      value: "good",
      containerStyle: {
        backgroundColor: "#009B70",
      },
    },
    {
      label: "alright",
      value: "alright",
      containerStyle: {
        backgroundColor: "#007E93",
      },
    },
    {
      label: "sad",
      value: "sad",
      containerStyle: {
        backgroundColor: "#005C94",
      },
    },
    {
      label: "depressed",
      value: "depressed",
      containerStyle: {
        backgroundColor: "#1A3671",
      },
    },
  ]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const date = new Date(dateSelected);
  const day = days[date.getDay()];
  const formattedDate = formatDate(date);

  const incrementDate = (amount: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    const newDateString = CalendarUtils.getCalendarDateString(newDate);
    navigation.setParams({ dateSelected: newDateString });
    setDateSelected(newDateString);
  };

  useEffect(() => {
    const selectedMood = moods.find((m) => m.value === mood);
    if (selectedMood) {
      setBackgroundColor(selectedMood.containerStyle.backgroundColor);
    } else {
      setBackgroundColor("#505050");
    }
  }, [mood]);

  const storeData = async () => {
    if (title == "" || mood == "") {
      // Both the title and mood should be selected/written before storing
      return;
    }
    try {
      const journalData = {
        title,
        text,
        mood,
      };

      await AsyncStorage.setItem(
        `journal_${user?.uid}_${dateSelected}`,
        JSON.stringify(journalData),
      );
      setUpdate(true);
    } catch (error) {
      console.error("Error saving journal data:", error);
    }
  };

  const loadJournalData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(
        `journal_${user?.uid}_${dateSelected}`,
      );
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setTitle(parsedData.title);
        setText(parsedData.text);
        setMood(parsedData.mood);
      } else {
        setTitle("");
        setText("");
        setMood("");
      }
    } catch (error) {
      console.error("Error loading journal data:", error);
    }
  };

  useEffect(() => {
    setDateSelected(route.params.dateSelected);
    loadJournalData();
  }, []);

  useEffect(() => {
    loadJournalData();
  }, [dateSelected]);

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener(
      "beforeRemove",
      (e) => {
        if (!(title == "" || mood == "") || (title == "" && mood == "")) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      },
    );

    // Cleanup the listener when the component is unmounted
    return unsubscribeBeforeRemove;
  }, [navigation, title == "", mood == ""]);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled:
        !(title == "" || mood == "") || (title == "" && mood == ""),
    });
  }, [navigation, title == "", mood == ""]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setOpenDropdowwn(false);
      }}
      accessible={false}
      className="z-40"
    >
      <KeyboardAvoidingView
        className="flex-1 flex-col justify-center bg-eggblack"
        keyboardVerticalOffset={10}
        behavior="padding"
        enabled
      >
        <ScrollView
          className="flex-1 bg-eggblack"
          indicatorStyle="white"
          keyboardDismissMode={"interactive"}
          onScrollEndDrag={Keyboard.dismiss}
        >
          <View className="mt-16">
            <View>
              <TouchableOpacity
                className="ml-4 max-w-[60px] flex-row items-center"
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <FontAwesomeIcon
                  style={{ color: "#FFFFE3" }}
                  size={15}
                  icon={faAngleLeft}
                />
                <Text
                  className="bottom-0.5 text-eggwhite"
                  style={{ fontFamily: "Satoshi-Bold", fontSize: 20 }}
                >
                  return
                </Text>
              </TouchableOpacity>
            </View>
            <Box
              className="z-20 mx-5 my-2 shadow-egglightgrey"
              style={{ shadowOpacity: 0.25, shadowRadius: 12 }}
            >
              <View className="flex-row justify-between p-1">
                <View className="my-auto">
                  <TouchableOpacity onPress={() => incrementDate(-1)}>
                    <FontAwesomeIcon
                      style={{ color: "#FFFFE3" }}
                      size={35}
                      icon={faAngleLeft}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    className="text-center text-eggwhite"
                    style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 24 }}
                  >
                    {day}
                  </Text>
                  <Text
                    className="text-center text-eggwhite"
                    style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 24 }}
                  >
                    {formattedDate}
                  </Text>
                  <View className="mx-auto mt-4 max-w-[175px] justify-center">
                    <DropDownPicker
                      style={{
                        borderRadius: 16,
                        borderWidth: 0,
                        backgroundColor: backgroundColor,
                        borderColor: "#282826",
                        minHeight: 43,
                        shadowColor: backgroundColor,
                        shadowOpacity: 0.65,
                        shadowRadius: 10,
                      }}
                      dropDownContainerStyle={{
                        borderRadius: 15,
                        borderWidth: 0,
                        marginTop: 7,
                      }}
                      disableBorderRadius={false}
                      showTickIcon={false}
                      placeholder="select mood"
                      open={openDropdown}
                      value={mood}
                      items={moods}
                      setOpen={setOpenDropdowwn}
                      setValue={setMood}
                      setItems={setMoods}
                      onChangeValue={() => storeData()}
                      labelStyle={{
                        textAlign: "center",
                        fontFamily: "ClashGrotesk-Medium",
                        fontSize: 18,
                        color: "#FFFFE3",
                        left: 12,
                      }}
                      placeholderStyle={{
                        textAlign: "center",
                        fontFamily: "ClashGrotesk-Medium",
                        fontSize: 18,
                        color: "#FFFFE3",
                        left: 10,
                      }}
                      listItemLabelStyle={{
                        textAlign: "center",
                        fontFamily: "ClashGrotesk-Medium",
                        fontSize: 18,
                        color: "#FFFFE3",
                      }}
                    />
                  </View>
                </View>
                <View className="my-auto">
                  <TouchableOpacity onPress={() => incrementDate(1)}>
                    <FontAwesomeIcon
                      style={{ color: "#FFFFE3" }}
                      size={35}
                      icon={faAngleRight}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Box>
            <TextInput
              className="mx-4 my-1 px-4 py-1 text-eggwhite"
              style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 36 }}
              maxLength={25}
              placeholderTextColor="gray"
              placeholder="untitled"
              onChangeText={(text) => setTitle(text)}
              value={title}
              onFocus={() => setOpenDropdowwn(false)}
              onEndEditing={() => storeData()}
            />
            <Image className="self-center" source={Line} />
            <TextInput
              className="my-2rounded-3xl mx-4 mb-48 min-h-full px-4 py-1 text-eggwhite"
              style={{ fontFamily: "Satoshi-Regular", fontSize: 18 }}
              onPressIn={() => {}}
              editable={true}
              multiline={true}
              placeholderTextColor="gray"
              placeholder="start writing :)"
              onChangeText={(text) => setText(text)}
              value={text}
              onFocus={() => setOpenDropdowwn(false)}
              scrollEnabled={false}
              onEndEditing={() => storeData()}
              autoCorrect={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Journal;
