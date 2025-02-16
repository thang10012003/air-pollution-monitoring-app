import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AQIForecastProps {
  data: { day: string; aqi: number }[];
}

const getAQIColor = (aqi: number) => {
  if (aqi < 50) return "#4CAF50"; // Xanh lá
  if (aqi < 100) return "#FFC107"; // Vàng
  return "#F44336"; // Đỏ
};

const AQIForecast: React.FC<AQIForecastProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Dự báo trong 3 ngày tới</Text> */}
        {/* <Text style={styles.subtitle}>AQI</Text> */}
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.dayText}>{item.day}</Text>
          <View style={[styles.aqiBox, { backgroundColor: getAQIColor(item.aqi) }]}>
            <Text style={styles.aqiText}>{item.aqi}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  aqiBox: {
    minWidth: 35,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  aqiText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default AQIForecast;
