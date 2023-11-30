import React, { ReactNode } from "react";
import { View } from "react-native";

interface BoxProps {
  className: string;
  children: ReactNode;
}

const Box: React.FC<BoxProps> = ({ className, children }) => {
  return <View className={className}>{children}</View>;
};

export default Box;
