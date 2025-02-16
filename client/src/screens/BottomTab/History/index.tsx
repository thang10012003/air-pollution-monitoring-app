import { ScrollView, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from '../../../constants/Colors';
import { Dimensions } from "react-native";
import { SpaceComponent } from "../../../components";
import TextDefault from "../../../components/TextDefault";
import React, { useEffect, useState } from "react";
import DateList from "./Components/DateList";
import TemperatureHistoryChart from "./Components/TemperatureHistoryChart ";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const History = () => {
    const [date, setdate] = useState("");
    const handleGetDate = (date: string) =>{
        setdate(date)
    }
    useEffect(() => {
        const getPacketId = async () => {
            const id = await AsyncStorage.getItem("packetId");
            if (id) {
                console.log("Lấy dữ liệu từ packet có ID:", id);
                
            }
        };
    
        getPacketId();
    },[])
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 3,
            },
        ],
        legend: ["AQI"],
    };

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
    
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        fillShadowGradientFrom: "#092F36",
        fillShadowGradientTo: "#C0E9F1",
        fillShadowGradientFromOpacity: 1,
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <ScrollView   style={{flex: 1, backgroundColor: 'blue'}}> */}
                <DateList />
                <TextDefault bold size={24} color={Colors.light.text}>Chất lượng không khí</TextDefault>
                <SpaceComponent width={screenWidth} height={20} />
                
                {/* Biểu đồ AQI */}
                <LineChart
                    data={data}
                    width={screenWidth - 40}
                    height={256}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        borderRadius: 16, 
                        padding: 10,            
                    }}
                />
                <TemperatureHistoryChart data={temperatureData}></TemperatureHistoryChart>
            </ScrollView>
        // </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 20,
        paddingTop: 100,
    },
});
