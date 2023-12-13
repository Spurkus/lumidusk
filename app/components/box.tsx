import { ReactNode, FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface BoxProps extends ViewProps {
  children: ReactNode;
}

const Box: FunctionComponent<BoxProps> = ({ children, ...props }) => {
  return (
    <View
      className={`rounded-2xl bg-egggrey px-4 py-3 shadow-egggrey`}
      style={(styles.shadowBox, props.style)}
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
