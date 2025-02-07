import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const TemperatureHistoryChart = ({ data }: { data: { hour: string; temp: number }[] }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử Nhiệt độ theo giờ</Text>
      <LineChart
        data={{
          labels: data.map((item) => item.hour),
          datasets: [{ data: data.map((item) => item.temp) }],
        }}
        width={screenWidth - 40} // Kích thước biểu đồ
        height={220}
        yAxisSuffix="°C"
        yAxisInterval={1} // Số bước trục Y
        chartConfig={{
          backgroundColor: "#1E2923",
          backgroundGradientFrom: "#3b8d99",
          backgroundGradientTo: "#6b6b83",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "4", strokeWidth: "2", stroke: "#ffa726" },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

// Dữ liệu giả lập: Nhiệt độ mỗi giờ trong ngày
const temperatureData = [
  { hour: "00:00", temp: 24.5 },
  { hour: "03:00", temp: 23.8 },
  { hour: "06:00", temp: 22.1 },
  { hour: "09:00", temp: 25.6 },
  { hour: "12:00", temp: 28.3 },
  { hour: "15:00", temp: 30.2 },
  { hour: "18:00", temp: 27.4 },
  { hour: "21:00", temp: 25.0 },
];



const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default TemperatureHistoryChart
