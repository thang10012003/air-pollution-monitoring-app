import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../../../constants/Colors";
import TextDefault from "../../../../components/TextDefault";

// Hàm tạo danh sách giờ và giá trị dự đoán ngẫu nhiên
// const generateHourlyData = (data : number[]) => {
const generateHourlyData = () => {
    const now = new Date();
    const hours = [];
  
    for (let i = 0; i < 10; i++) { // Lấy 7 mốc giờ tiếp theo
      const hour = new Date(now);
      hour.setHours(now.getHours() + i, 0, 0, 0); // Đặt phút, giây, mili giây về 0
  
      const timeString = i === 0 ? "Bây giờ" : hour.getHours().toString().padStart(2, "0") + ":00"; // Lấy giờ tròn (12, 13,...)
  
      hours.push({
        time: timeString,
        value: Math.floor(Math.random() * 101), // Dự đoán giá trị từ 0-100
        // value: data[i]?.toFixed(1) ||  Math.floor(Math.random() * 101)
      });
    }
    // console.log(hours)
  
    return hours;
  };
// Hàm chọn màu theo giá trị dự đoán
const getBackgroundColor = (value: number) => {
  if (value < 40) return "#4CAF50"; // Xanh
  if (value < 70) return "#FFC107"; // Vàng
  return "#F44336"; // Đỏ
};

// const HourlyForecast = (data:number[]) => {
const HourlyForecast = () => {
  // const [hourlyData, setHourlyData] = useState(generateHourlyData(data));
  const [hourlyData, setHourlyData] = useState(generateHourlyData());

  // Giả lập cập nhật dự đoán mỗi 30 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setHourlyData(generateHourlyData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* <TextDefault bold style={styles.title}>Dự đoán theo giờ</TextDefault> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {hourlyData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <TextDefault size={16} style={styles.timeText}>{item.time}</TextDefault>
            <View style={[styles.valueContainer, { backgroundColor: getBackgroundColor(item.value) }]}>
              <TextDefault bold style={styles.valueText}>{item.value}</TextDefault>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  scroll: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    color: "#333",
    paddingBottom: 10,
  },
  valueContainer: {
    width: 50,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 16,
    color: "white",
  },
});

export default HourlyForecast;
