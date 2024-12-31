import React, { FC, ReactNode } from "react";
import {
  Text,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
// import { styleGlobal } from "src/styles";

interface Props extends RNTextProps {
  children: ReactNode;
  bold?: boolean;
  center?: boolean;
  numberOfLine?: number;
}

const TextDefault: FC<Props> = ({ children, style, bold, center, ...rest }) => {
  return (
    <Text
      numberOfLines={rest.numberOfLines}
      style={[
        // styleGlobal.text,
        style,
        bold && styleText.bold,
        // center && styleText.center,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styleText = StyleSheet.create({
  // center: { textAlign: "center" },
  bold: {
    fontWeight: "bold",
  },
});
export default TextDefault;
