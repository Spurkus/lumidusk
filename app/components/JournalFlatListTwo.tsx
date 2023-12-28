import { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

import Box from "../components/Box";

type Mood = "happy" | "good" | "alright" | "sad" | "depressed";
type itemProps = {
  date: string;
  title: string;
  mood: Mood;
};
type JournalFlatListProps = {
  data: itemProps[];
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
};

const MOOD_COLOURS = {
  happy: "#6AB13F",
  good: "#009B70",
  alright: "#007E93",
  sad: "#005C94",
  depressed: "#1A3671",
};

const JournalFlatListTwo: FunctionComponent<JournalFlatListProps> = ({
  data,
  navigation,
}) => {
  const renderItem = ({ date, title, mood }: itemProps) => {
    const colour = MOOD_COLOURS[mood];
    return (
      <Box className="mx-5 my-2 ">
        <TouchableOpacity
          onPress={() => navigation.navigate("Journal", { dateSelected: date })}
        >
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
    <FlatList
      className="mb-28 mt-3 h-fit"
      data={data}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => renderItem(item)}
      initialNumToRender={10}
    />
  );
};

export default JournalFlatListTwo;
