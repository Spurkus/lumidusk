import {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Text, StyleSheet } from "react-native";
import Box from "./Box";
import { Calendar, CalendarUtils } from "react-native-calendars";

type Mood = "happy" | "good" | "alright" | "sad" | "depressed";

type CustomDate = {
  startingDay: boolean;
  endingDay: boolean;
  textColor: string;
  color: string;
  selected: boolean;
};

type CalendarComponentProps = {
  setMessage: Dispatch<SetStateAction<string>>;
};

const MOOD_COLOURS = {
  happy: "#6AB13F",
  good: "#009B70",
  alright: "#007E93",
  sad: "#005C94",
  depressed: "#1A3671",
};

const date = new Date();
const initialDate = CalendarUtils.getCalendarDateString(date);

// Helper Functions
const getMonthString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const getNewDate = (initialDate: string, count: number) => {
  const date = new Date(initialDate);
  const newDate = date.setDate(date.getDate() + count);
  return CalendarUtils.getCalendarDateString(newDate);
};

const getCustomDate = (
  startingDay: boolean,
  endingDay: boolean,
  mood?: Mood,
  colour?: string,
  selected?: boolean,
  textColor?: string,
): CustomDate => {
  return {
    startingDay,
    endingDay,
    textColor: textColor ? textColor : "#E7E7D6",
    color: mood ? MOOD_COLOURS[mood] : colour ? colour : "",
    selected: selected ? selected : false,
  };
};

const getSelected = (startingDay: boolean, endingDay: boolean): CustomDate => {
  return getCustomDate(
    startingDay,
    endingDay,
    undefined,
    "#506E86",
    true,
    "#FFFFE3",
  );
};

const createDates = (moodMap: Record<string, Mood>) => {
  const transformedDates: Record<string, CustomDate> = {};

  for (const date in moodMap) {
    const mood = moodMap[date];
    const moodPrevious = moodMap[getNewDate(date, -1)];
    const moodAfter = moodMap[getNewDate(date, 1)];

    const dayOfWeek = new Date(date).getDay();

    if (mood === moodPrevious && mood === moodAfter) {
      transformedDates[date] = getCustomDate(
        dayOfWeek === 1,
        dayOfWeek === 0,
        mood,
      );
    } else if (mood === moodPrevious) {
      transformedDates[date] = getCustomDate(dayOfWeek === 1, true, mood);
    } else if (mood === moodAfter) {
      transformedDates[date] = getCustomDate(true, dayOfWeek === 0, mood);
    } else {
      transformedDates[date] = getCustomDate(true, true, mood);
    }
  }

  return transformedDates;
};

const moodMap: Record<string, Mood> = {
  // Temporary mood map, replace with user mood map when implemented
  "2023-12-24": "happy",
  "2023-12-25": "happy",
  "2023-12-26": "happy",
  "2023-12-27": "sad",
  "2023-12-28": "sad",
  "2023-12-29": "alright",
  "2023-12-30": "depressed",
  "2023-12-31": "depressed",
};

const CalendarComponent: FunctionComponent<CalendarComponentProps> = ({
  setMessage,
}) => {
  const userDates = createDates(moodMap);

  const [selected, setSelected] = useState<string>(initialDate);
  const [markSelected, setMarkSelected] = useState({
    [selected]: getSelected(true, true),
  });
  const [markedDates, setMarkedDates] = useState(userDates);

  useEffect(() => {
    setMarkSelected({
      [selected]: getSelected(true, true),
    });

    const todayDate = new Date(initialDate);
    const selectedDate = new Date(selected);

    if (userDates.hasOwnProperty(selected)) {
      setMessage("Edit Created Journal");
    } else if (todayDate < selectedDate) {
      setMessage("Start Future Journaling");
    } else if (todayDate > selectedDate) {
      setMessage("Start Previous Day's Journal");
    } else {
      setMessage("Start Today's Journaling");
    }
  }, [selected]);

  useEffect(() => {
    if (userDates.hasOwnProperty(selected)) {
      userDates[selected].color = "#506E86";
      setMarkedDates(userDates);
    } else {
      setMarkedDates(Object.assign(userDates, markSelected));
    }
  }, [markSelected]);

  const Header = (date: string) => {
    return (
      <Text
        className="text-eggwhite"
        style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 32 }}
      >
        {getMonthString(date)}
      </Text>
    );
  };

  return (
    <Box className="z-10 mx-5 py-4">
      <Calendar
        initialDate={initialDate}
        minDate={"2005-06-07"}
        maxDate={"2100-06-07"}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        disableMonthChange={true}
        hideExtraDays={true}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        renderHeader={(date) => Header(date)}
        markingType="period"
        markedDates={markedDates}
        // Theme of Calendar
        theme={{
          calendarBackground: "#282826",
          arrowColor: "#FF9E85",
          disabledArrowColor: "#d9e1e8",
          textDayHeaderFontSize: 15,
          todayTextColor: "#00adf5",
          dayTextColor: "#B4A5A1", // Date colours
        }}
      />
    </Box>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  shadowOrb: {
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
});
