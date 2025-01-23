import { StyleSheet, View } from "react-native";
import {
    LineChart,
} from "react-native-chart-kit";
// import {LineChart} from "react-native-gifted-charts";

import Colors from '../../../constants/Colors';

import { Dimensions } from "react-native";
import { SpaceComponent } from "../../../components";
import TextDefault from "../../../components/TextDefault";
import React from "react";
import DateList from "./Components/DateList";

const screenWidth = Dimensions.get("window").width;
 
const  History = () =>{
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 3 // optional
          }
        ],
        legend: ["AQI"], // optional
      };
    const chartConfig = {
        backgroundGradientFrom: '#white',
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: 'white',
        backgroundGradientToOpacity: 0.5,
        // backgroundGradientToOpacity: 1,
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        // color:(opacity = 1) => `rgba(41, 78, 132, ${opacity})`,
        color:(opacity = 1) =>  Colors.light.greyBlack,
        strokeWidth: 2, // optional, default 3
        barPercentage:0.5,
        // useShadowColorFromDataset: true, // optional
        fillShadowGradientFrom: '#092F36',
        fillShadowGradientTo: "#C0E9F1",
    };
    // const chartConfig = {
    //     backgroundGradientFrom: '#A7D8D4',  // Màu xanh nhạt gợi lên sự trong lành của không khí
    //     backgroundGradientFromOpacity: 0.6,
    //     backgroundGradientTo: '#E3F6F7',  // Màu xanh nhạt, ánh sáng mềm mại
    //     backgroundGradientToOpacity: 0.8,
    //     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // Đoạn đường biểu đồ màu tối (để dễ đọc)
    //     strokeWidth: 2,  // Chiều rộng đường vẽ
    //     barPercentage: 0.5,  // Độ rộng của cột
    //     fillShadowGradientFrom: '#1A3A42',  // Màu xám đậm, kết hợp với các màu sắc sáng hơn
    //     fillShadowGradientTo: '#A7D8D4',  // Màu xanh dương nhạt
    //     // useShadowColorFromDataset: true,  // Sử dụng màu sắc của dữ liệu làm màu bóng đổ
    // };
    return(
        <View style = {styles.container}>

            <DateList/>
            <TextDefault bold size={24} color={Colors.light.text}>Chất lượng không khí</TextDefault>
            <SpaceComponent width={screenWidth} height={20}/>
            <LineChart
                data={data}
                width={screenWidth-40}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                style={{
                    // marginVertical: 8,
                    borderRadius: 16, // Bo góc của biểu đồ    
                    padding: 10,            
                }}
            />

        </View>
    )
}
export default History

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 30,
    },
})