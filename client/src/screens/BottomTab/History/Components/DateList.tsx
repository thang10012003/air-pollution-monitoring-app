import { View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ContainerComponent } from '../../../../components';
import TextDefault from '../../../../components/TextDefault';
import Colors from '../../../../constants/Colors'
import Row from '../../../../components/Row';


interface DateListProps {
  onDateSelect: (date: string) => void;
}

const DateList = ({onDateSelect}:DateListProps) => {
  const currentDate = new Date();
  const formatDate = (date: Date): string => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Lấy thứ trong tuần
    const day = date.getDate(); // Lấy ngày
    const month = date.getMonth() + 1; // Lấy tháng (0-based index)
    const year = date.getFullYear(); // Lấy năm
  
    return `${dayOfWeek}, ${day} tháng ${month}, ${year}`;
  };
  const formatDateInYear = (date: Date): string => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Lấy thứ trong tuần
    const day = String(date.getDate()).padStart(2, '0'); // Định dạng ngày thành 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Định dạng tháng thành 2 chữ số
    const year = date.getFullYear(); // Lấy năm
  
    return `${year}-${month}-${day}`;
  };
  const [dateChosen, setdateChosen] = useState(formatDate(currentDate))
  const getDaysInMonth = () => {
    const currentDate = new Date(); // Lấy ngày hiện tại
    const year = currentDate.getFullYear(); // Lấy năm hiện tại
    const month = currentDate.getMonth(); // Lấy tháng hiện tại (0-based index)
    // Tạo một đối tượng Date ở ngày 0 của tháng kế tiếp, sau đó lấy ngày
    const numDate =  new Date(year, month + 1, 0).getDate();
    // return new Date(year, month + 1, 0).getDate();
    return Array.from({ length: numDate }, (_, i) => i + 1);
  };
  const getDayOfWeek = (day: number) => {
    const currentDate = new Date(); // Lấy ngày hiện tại
    const year = currentDate.getFullYear(); // Lấy năm hiện tại
    const month = currentDate.getMonth(); // Lấy tháng hiện tại (0-based index)
    const date = new Date(year, month , day); // month - 1 vì tháng bắt đầu từ 0
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return daysOfWeek[date.getDay()];
  };

  const handleDateChange = (day: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const newDate = new Date(year, month, day); // Tạo đối tượng Date mới
    setdateChosen(formatDate(newDate)); // Cập nhật định dạng ngày được chọn
    return formatDateInYear(newDate)
  };
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const numDate = getDaysInMonth();
  return (
    <View style={styles.container}>
      <Row direction={"column"} >
        <TextDefault bold color={Colors.light.text} style={{paddingVertical: 5}} size={20}>Điều kiện không khí</TextDefault>
        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        >
          {numDate.length > 0 && numDate.map((day) => {
            // console.log(day);
            const isSelected = selectedDate === day; // Kiểm tra ngày được chọn
            return(
              <View 
                key={day}
                style={styles.itemContainer}>
                  <TouchableOpacity
                  onPress={()=> {
                    const formattedDate = handleDateChange(day)
                    onDateSelect(formattedDate)
                    setSelectedDate(day); // Cập nhật ngày được chọn
                  }}
                  style={[
                    // styles.textContainer,
                    // isSelected ? { backgroundColor: "#2C67F2" } : { backgroundColor: "transparent" } // Đổi màu nền
                  ]}
                  >
                    <View 
                    style={[styles.textContainer,
                      isSelected ? { backgroundColor: "#2C67F2" } : { backgroundColor: "transparent" } // Đổi màu nền
                    ]
                    }>
                      <TextDefault  style={[isSelected ? { color: Colors.light.textSecond } : { color:Colors.light.text }]}>{day}</TextDefault>
                    </View>
                  </TouchableOpacity>
                  <TextDefault size={16} color={Colors.light.text}>{getDayOfWeek(day)}</TextDefault>
              </View>

            )}     
          )}
        </ScrollView>
        <TextDefault color={Colors.light.text} size={16}> {dateChosen}</TextDefault>

      </Row>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: Colors.light.white,

  },
  scroll:{
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // rowGap: 20,
    gap:20,
    padding: 10,
  },
  itemContainer: {
    // backgroundColor:'green',
    justifyContent: 'space-between',
    alignItems:'center',  
  },
  textContainer: {
    height: 60,
    width: 60,
    backgroundColor:'white',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 3,
    borderColor: Colors.light.text  
  },
})
export default DateList