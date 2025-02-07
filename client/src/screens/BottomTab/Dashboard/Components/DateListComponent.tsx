import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../../../constants/Colors";
import TextDefault from "../../../../components/TextDefault";

const AQI_LEVELS = [
  { min: 0, max: 50, color: "#4CAF50" },   // Xanh lá - Tốt
  { min: 51, max: 100, color: "#FFC107" }, // Vàng - Trung bình
  { min: 101, max: 150, color: "#FF5722" }, // Cam - Không tốt
  { min: 151, max: 200, color: "#D32F2F" }, // Đỏ - Nguy hiểm
];

const getAQIColor = (aqi: number) => {
  const level = AQI_LEVELS.find((l) => aqi >= l.min && aqi <= l.max);
  return level ? level.color : "#BDBDBD";
};

const ForecastDate = ({ data }: { data: { day: string; aqi: number }[] }) => {
  return (
    <View style={styles.container}>
      <TextDefault bold size={18} style={styles.title}>
        Dự báo trong 3 ngày tới
      </TextDefault>
      <FlatList
        data={data}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TextDefault bold style={styles.day}>{item.day}</TextDefault>
            <View style={[styles.aqiBox, { backgroundColor: getAQIColor(item.aqi) }]}>
              <TextDefault bold color="#fff">{item.aqi}</TextDefault>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  title: {
    marginBottom: 10,
    color: Colors.light.text,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  day: {
    fontSize: 16,
    color: Colors.light.text,
  },
  aqiBox: {
    width: 50,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForecastDate;
