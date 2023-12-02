import React, { FunctionComponent, useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Box from "./Box";
import { Calendar, CalendarUtils } from "react-native-calendars";

const staticDates = {
  "2023-12-04": {
    startingDay: true,
    textColor: "#282826",
    color: "#6AB13F",
    endingDay: true,
  },
  "2023-12-22": { startingDay: true, textColor: "#282826", color: "#007E93" },
  "2023-12-23": { endingDay: true, textColor: "#282826", color: "#007E93" },
  "2023-12-24": {
    startingDay: true,
    color: "#1A3671",
    endingDay: true,
  },
};

const date = new Date();
const initialDate = CalendarUtils.getCalendarDateString(date);

const getMonthString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const CalendarComponent: FunctionComponent = () => {
  const [selected, setSelected] = useState<string>(initialDate);

  const [markSelected, setMarkSelected] = useState({
    [selected]: {
      selected: true,
      color: "#506E86",
      startingDay: true,
      endingDay: true,
    },
  });

  const [markedDates, setMarkedDates] = useState(staticDates);

  useEffect(() => {
    setMarkSelected({
      [selected]: {
        selected: true,
        color: "#506E86",
        startingDay: true,
        endingDay: true,
      },
    });
  }, [selected]);

  useEffect(() => {
    setMarkedDates(Object.assign(markSelected, staticDates));
  }, [markSelected]);

  const Header = (date: string) => {
    return (
      <Text
        className="text-eggwhite"
        style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 32 }}>
        {getMonthString(date)}
      </Text>
    );
  };

  return (
    <Box boxName="mx-5 py-4 z-10">
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
