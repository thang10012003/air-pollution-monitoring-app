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
import axiosClient from "../../../apis/axiosClient";

const screenWidth = Dimensions.get("window").width;

const History = () => {
    const formatDateInYear = (date: Date): string => {
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayOfWeek = daysOfWeek[date.getDay()]; // Lấy thứ trong tuần
        const day = String(date.getDate()).padStart(2, '0'); // Định dạng ngày thành 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Định dạng tháng thành 2 chữ số
        const year = date.getFullYear(); // Lấy năm
      
        return `${year}-${month}-${day}`;
      };
    const [date, setdate] = useState(formatDateInYear(new Date()));
    const [error, setError] = useState(false)
    const [packetId, setpacketId] = useState('')
    const [temperatureDataset, setTemperatureDataset] = useState<{ hour: string; value: number; }[]>([])
    const [humidDataset, setHumidDataset] = useState<{ hour: string; value: number }[]>([]);
    const [dustDataset, setDustDataset] = useState<{ hour: string; value: number }[]>([]);   
    const [CODataset, setCODataset] = useState<{ hour: string; value: number }[]>([]);   
    const [CO2Dataset, setCO2Dataset] = useState<{ hour: string; value: number }[]>([]);   
    const handleGetDate = (dateChosen: string) =>{
        setdate(dateChosen)
    }
    interface TimeSeriesEntry {
        hour: number;
        dataset: {
            temperature: number;
            humidity: number;
            CO2: number;
            CO: number;
            dust: number;
        };
        _id:string
      }
      
      interface ApiResponse {
        _id: string;
        dates: {
            date: string;
            timeSeries: TimeSeriesEntry[];
            _id: string;
        }[];
      }
    useEffect(() => {
        const getPacketId = async () => {
            const id = await AsyncStorage.getItem("packetId");
            if (id) {
                console.log("Lấy dữ liệu từ packet có ID:", id);
                setpacketId(id);
            }
        };
    
        getPacketId();
    },[])
  // ✅ Gọi API mỗi khi `date` hoặc `packetId` thay đổi
  useEffect(() => {
    if (!packetId) return; // Chỉ gọi API khi packetId đã được lấy

    const fetchData = async () => {
      try {
        const api = `/api/hourly/${packetId}/${date}`;
        console.log("🔍 Gọi API:", api);
        const response = await axiosClient.get(api);
        console.log("✅ API Response:", response.data);
        // setData(response.data);
        setError(false)


        // Xử lý dữ liệu nhiệt độ
        const processTemperatureData = (apiResponse:ApiResponse, key: "temperature" | "humidity" | "dust" | "CO" | "CO2") => {
            if (!apiResponse?.dates?.length) {
            return [];
            }
            return apiResponse.dates[0].timeSeries.map((entry) => ({
                hour: `${entry.hour.toString().padStart(2, "0")}:00`, // Format giờ thành "HH:00"
                value: Math.round(entry.dataset[key] * 10) / 10, // Làm tròn 1 chữ số thập phân
            }));
        };

        const tempData = processTemperatureData(response.data,"temperature");
        const humidData = processTemperatureData(response.data,"humidity");
        const dustData = processTemperatureData(response.data,"dust");
        const COData = processTemperatureData(response.data,"CO");
        const CO2Data = processTemperatureData(response.data,"CO2");
        
        console.log("Tempdata: ",tempData);
        
        setTemperatureDataset(tempData); // Cập nhật state
        setHumidDataset(humidData)
        setCODataset(COData)
        setCO2Dataset(CO2Data)
        setDustDataset(dustData)

        } catch (error:any) {
            if (error.response?.status === 404) {
                console.warn("⚠️ Không có dữ liệu cho ngày này.");
                // setData(null);
                // setError("Không có dữ liệu cho ngày này.");
            } else {
                // console.error("❌ Lỗi khi gọi API:", error.response ? error.response.data : error.message);
                setError(true);
            }      
        }
    };

    fetchData();
  }, [date, packetId]);


    const temperatureData = [
        { hour: "00:00", value: 24.5 },
        { hour: "03:00", value: 23.8 },
        { hour: "06:00", value: 22.1 },
        { hour: "09:00", value: 25.6 },
        { hour: "12:00", value: 28.3 },
        { hour: "15:00", value: 30.2 },
        { hour: "18:00", value: 27.4 },
        { hour: "21:00", value: 25.0 },
    ];
    
    // const chartConfig = {
    //     backgroundGradientFrom: "white",
    //     backgroundGradientFromOpacity: 0.5,
    //     backgroundGradientTo: "white",
    //     backgroundGradientToOpacity: 0.5,
    //     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    //     strokeWidth: 2,
    //     barPercentage: 0.5,
    //     fillShadowGradientFrom: "#092F36",
    //     fillShadowGradientTo: "#C0E9F1",
    //     fillShadowGradientFromOpacity: 1,
    // };

    return (
        <View style={{flex:1, backgroundColor:Colors.light.background}}>
        <ScrollView contentContainerStyle={styles.container}>
            {/* <ScrollView   style={{flex: 1, backgroundColor: 'blue'}}> */}
                <DateList onDateSelect={handleGetDate}/>
                <SpaceComponent width={screenWidth} height={20} />
                <View style={{ height: 1, backgroundColor: Colors.light.text, width:'100%', marginVertical: 10 }} />
                <TextDefault bold size={24} color={Colors.light.text}>Chất lượng không khí</TextDefault>
                <SpaceComponent width={screenWidth} height={20} />
                {error && (
                    <TextDefault color="red" size={20} style={{ textAlign: "center" }}>
                        Không có dữ liệu để hiển thị
                    </TextDefault>
                )}

                {/* Chỉ hiển thị biểu đồ nếu không có lỗi */}
                {!error && temperatureDataset.length > 0 &&(
                    <>
                        {/* Biểu đồ nhiệt độ */}
                        <TemperatureHistoryChart data={temperatureDataset} title="Nhiệt độ" gradientColors={["#1E2923","#3b8d99","#6b6b83"]} unitData="°C"/>
                        <TemperatureHistoryChart data={humidDataset} title="Độ ẩm" gradientColors={["#1E3C72", "#2A5298", "#F2994A"]}/>
                        <TemperatureHistoryChart data={dustDataset} title="Bụi PM2.5" gradientColors={["#A8E063", "#56AB2F", "#004E92"]}/>
                        <TemperatureHistoryChart data={CO2Dataset} title="CO2" gradientColors={["#56CCF2", "#2F80ED", "#1B1F3B"]}/>
                        <TemperatureHistoryChart data={CODataset} title="CO" gradientColors={["#FF7E5F", "#FEB47B", "#D16BA5"]}/>
                    </>
                )}
                {/* Biểu đồ AQI
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
                <TemperatureHistoryChart data={temperatureData}></TemperatureHistoryChart> */}
            </ScrollView>
         </View>
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
        paddingTop: 80,
    },
});
