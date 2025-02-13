import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  between?: boolean;
  around?: boolean;
  evenly?: boolean;
  start?: boolean;
  center?: boolean;
  end?: boolean;
  direction?: "row" | "column";
  wrap?: boolean;
  full?: boolean;
  rowGap?: number;
  colGap?: number;
}

const Row: React.FC<RowProps> = (props, ...rest) => {
  const {
    direction = "row",
    full,
    wrap = false,
    children,
    style,
    between,
    around,
    evenly,
    start,
    center,
    end,
  } = props;
  const rowStyle = [
    styles.container,
    between && styles.spaceBetween,
    around && styles.spaceAround,
    evenly && styles.spaceEvenly,
    start && styles.flexStart,
    center && styles.flexCenter,
    end && styles.flexEnd,
    {
      flexDirection: direction,
    },
    style,
  ];

  return (
    <View
      style={[
        { width: full ? "100%" : "auto", flexWrap: wrap ? "wrap" : "nowrap" },
        {
          rowGap: props.rowGap,
          columnGap: props.colGap,
        },
        rowStyle,
        {...rest},
      ]}
    >
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  spaceEvenly: {
    justifyContent: "space-evenly",
  },
  flexStart: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  flexCenter: {
    justifyContent: "center",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
});
