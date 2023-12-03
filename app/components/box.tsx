import { ReactNode, FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";

interface BoxProps {
  boxName?: string;
  children: ReactNode;
}

const Box: FunctionComponent<BoxProps> = ({ boxName, children }) => {
  return (
    <View
      className={`rounded-2xl bg-egggrey px-4 py-3 shadow-egggrey ${boxName}`}
      style={styles.shadowBox}
    >
      {children}
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  shadowBox: {
    shadowOpacity: 0.75,
    shadowRadius: 26,
  },
});
