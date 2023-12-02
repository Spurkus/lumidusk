import { ReactNode, FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";

interface BoxProps {
  boxName?: string;
  children: ReactNode;
}

const Box: FunctionComponent<BoxProps> = ({ boxName, children }) => {
  return (
    <View
      className={`bg-egggrey rounded-2xl shadow-egggrey py-3 px-4 ${boxName}`}
      style={styles.shadowBox}>
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
