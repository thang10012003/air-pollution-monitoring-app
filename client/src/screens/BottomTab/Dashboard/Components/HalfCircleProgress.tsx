import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const AQI_LEVELS = [
  { label: "Tốt", color: "#4CAF50", value: 1 },       // Xanh lá
  { label: "Trung bình", color: "#FFC107", value: 2 }, // Vàng
  { label: "Không tốt", color: "#FF5722", value: 3 },  // Cam
  { label: "Nguy hiểm", color: "#D32F2F", value: 4 },  // Đỏ
];

const getAQIInfo = (level: number) => {
  return AQI_LEVELS.find((l) => l.value === level) || AQI_LEVELS[0];
};

const HalfCircleProgress = ({ level = 1 }: { level?: number }) => {
  const { color, label } = getAQIInfo(level);
  const size = 120;
  const radius = size / 2 - 10;
  const strokeWidth = 15;
  const cx = size / 2;
  const cy = size / 2;

  // Xử lý level hợp lệ để tránh NaN
  const safeLevel = Math.max(1, Math.min(level, AQI_LEVELS.length));
  const endAngle = (safeLevel / AQI_LEVELS.length) * Math.PI;

  const x = cx + radius * Math.cos(Math.PI - endAngle);
  const y = cy - radius * Math.sin(Math.PI - endAngle);

  // Kiểm tra xem có lỗi NaN không
  const pathData = isNaN(x) || isNaN(y) 
    ? `M ${cx - radius},${cy} A ${radius},${radius} 0 0 1 ${cx + radius},${cy}`
    : `M ${cx - radius},${cy} A ${radius},${radius} 0 0 1 ${x},${y}`;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2}>
        {/* Vòng nền */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Vòng tiến trình */}
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      {/* Nhãn mức độ */}
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  text: {
    position: "absolute",
    top: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HalfCircleProgress;
