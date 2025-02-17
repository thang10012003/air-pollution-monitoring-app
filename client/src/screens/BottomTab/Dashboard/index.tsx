import { AntDesign, FontAwesome, Foundation } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../../components/Avatar";
import CircleComponent from '../../../components/CircleComponent';
import Row from "../../../components/Row";
import TextDefault from "../../../components/TextDefault";
import Colors from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/reducers/authReducer";
import { addLocation, locationSelector } from "../../../redux/reducers/locationReducer";
import React from "react";
import axiosClient from "../../../apis/axiosClient";
import io from 'socket.io-client';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initSocket, sendLocationToServer, closeSocket, listenToSensorData} from "../../../utils/socket";
import { dateTransfer } from "../../../utils/date";
import {getAddressFromCoordinates_OSM} from '../../../utils/getLocation'
import SuggestionComponent from "../../../components/SuggestionComponent";
import HourListComponent from "./Components/HourListComponent";
import HalfCircleProgress from "./Components/HalfCircleProgress";
// import SemiCircleProgress from "./Components/HalfCircleProgress";
import ForecastDate from "./Components/DateListComponent";
import { Validate } from "../../../utils/validation";
import { useNavigation } from "@react-navigation/native";
import DataDetail from "./DataDetail";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/BottomTabNavigator/DashboardNavigator";
import AQIForecast from "./Components/ForecastComponent";
interface SensorData {
    CO: string;
    airQuality: string;
    humidity: string;
    id: string;
    longitude: string;
    latitude: string;
    rain: string;
    temperature: string;
    dust: string;
    evalute: string,
    time: string,
  }
interface location{
    district: string, 
    city: string,
}
type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, "DashboardScreen">;

function  Dashboard (){
    const navigation = useNavigation<DashboardNavigationProp>();
    const [loading, setLoading] = useState<boolean>(true);
    const [sensorData, setSensorData] = useState<SensorData|null>(null)
    const dispatch = useDispatch();
    const authselector = useSelector(authSelector);
    const locationselector = useSelector(locationSelector);
    const [dataset, setdataset] = useState()
    const [location, setLocation] = useState({})
    const [address, setaddress] = useState<location|null>(null)
    const [COpredicted, setCOpredicted] = useState([])
    const [CO2predicted, setCO2predicted] = useState([])
    const [Dustpredicted, setDustpredicted] = useState<number[]>([])
    const descriptions: { [key: string]: string } = {
        "good": "Tốt",
        "Moderate": "Trung bình",
        "Unhealthy": "Không tốt", 
        "Hazardous": "Nguy hiểm"
    };
    const colors: { [key: string]: string } = {
        "Good": Colors.light.green,
        "Moderate": Colors.light.yellow,
        "Unhealthy": Colors.light.orange, 
        "Hazardous": Colors.light.danger 
    };
    const level: { [key: string]: number } = {
        "Good": 1,
        "Moderate": 2,
        "Unhealthy": 3, 
        "Hazardous": 4
    };

    const fetchDataPredicted = async () =>{
        try {
            if (!sensorData?.id) {
                console.log("sensorData.id không tồn tại");
                return;
            }
            const api = `api/history/${sensorData?.id}`
            // const res = await axiosClient.get<Location[]>(api);
            const res  = await axiosClient.get(api);      
            const data = res.data
            if (!data?.realPredictions || !Array.isArray(data.realPredictions)) {
                console.error("Dữ liệu không hợp lệ hoặc không có realPredictions");
                return;
            }
            // Trích xuất cột 0 (nhiệt độ)
            const CO = data.realPredictions.map((row: number[]) => row[0] ?? null);
            const CO2 = data.realPredictions.map((row: number[]) => row[1] ?? null);
            const Dust = data.realPredictions.map((row: number[]) => row[2] ?? null);
            setCOpredicted(CO)
            setCO2predicted(CO2)
            setDustpredicted(Dust)
            // setdataset(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    const requestLocationPermission = async () => {
        // Xóa trạng thái quyền lưu trữ trước đó (Nếu cần reset mỗi lần đăng xuất)
        await AsyncStorage.removeItem('locationPermission');
      
        let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      
        if (status === 'granted') {
            console.log("Quyền GPS được cấp!");
            await AsyncStorage.setItem('locationPermission', 'granted');
      
            let location = await Location.getCurrentPositionAsync({});
            dispatch(addLocation({
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString()
            }));
          console.log("📍 Vị trí hiện tại:", location);
          return  location.coords;
        }
      
        if (status === 'denied' && canAskAgain) {
          console.log("Người dùng từ chối quyền GPS. Hỏi lại...");
          Alert.alert(
            "Quyền GPS bị từ chối",
            "Ứng dụng cần quyền truy cập vị trí. Bạn có muốn cấp lại không?",
            [
              { text: "Hủy", style: "cancel" },
              { text: "Thử lại", onPress: () => requestLocationPermission() },
            ]
          );
          return;
        }
      
        if (status === 'denied' && !canAskAgain) {
          console.log("Người dùng đã chọn 'Không hỏi lại'.");
          Alert.alert(
            "Quyền GPS bị vô hiệu hóa",
            "Bạn đã từ chối quyền vị trí. Hãy vào Cài đặt để cấp lại quyền.",
            [
              { text: "Hủy", style: "cancel" },
              { text: "Mở Cài Đặt", onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }
      };
    useEffect(() => {
        initSocket();
        // Lắng nghe dữ liệu cảm biến liên tục
        listenToSensorData((data) => {
            console.log("Data server gửi về :", data)
            setSensorData(data); // Cập nhật dữ liệu khi có thông tin mới
        },authselector.email);
        (async() => {
            const loc = await requestLocationPermission();
            if(loc){
                setLocation(loc);
                console.log("GỬi dịnh vị:", loc)
                sendLocationToServer(loc.latitude.toString(), loc.longitude.toString());
                const address = await getAddressFromCoordinates_OSM(loc.latitude.toString(), loc.longitude.toString());
                setaddress(address)
            }
        })();
        return ()=> {
            closeSocket();
        };
    },[]);
    // 🌟 Dùng useEffect riêng để lưu packetId khi sensorData thay đổi
    const packetIdRef = useRef<string | null>(null);
    useEffect(() => {
        (async () => {
            if (sensorData && sensorData.id && sensorData.id !== packetIdRef.current) {
                await AsyncStorage.setItem("packetId", sensorData.id);
                packetIdRef.current = sensorData.id; // Cập nhật ID đã lưu trước đó
            }
            
        })();
        fetchDataPredicted()
    }, [sensorData]); // 🔥 Chạy lại khi sensorData thay đổi
    return(
        // <View style = {styles.container}>
        <ScrollView style = {styles.container}>
            <StatusBar style="dark" backgroundColor="#A2EEE9"/>
            <SafeAreaView style={[{flex: 1, backgroundColor: Colors.light.grey}]}>
                <LinearGradient 
                    colors={['#A2EEE9', '#B8DCE3', '#FFFFFF']} 
                    // colors={['#A2EEE9', '#B8DCE3', '#FF0606']} 
                    style={styles.linearGradient}
                >
                    <Row direction="column" full  between style={[{flex:1}]}>
                        <Row direction="row" full between style={[{paddingTop: 30}]}>
                            <Row direction="row" >
                                <Avatar url='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'/>
                                <Row direction="column" style={[{marginLeft:20}]}>
                                    <TextDefault style={styles.text}>Chào buổi sáng</TextDefault>
                                    <TextDefault bold style={styles.text}>{Validate.extractNameFromEmail(authselector.email)}</TextDefault>
                                </Row>

                            </Row>
                            <CircleComponent size={40} color={Colors.light.background}>
                                <View>
                                    <FontAwesome name="bell" size={24} color='yellow'/>
                                    <View style = {styles.badge}></View>
                                </View>
                            </CircleComponent>
                        </Row>
                            
                        <TouchableOpacity style={styles.boxContainer} 
                        onPress={()=>{
                        // navigation.navigate("DataDetailScreen",{sensorData})
                        if (sensorData && address) {
                            navigation.navigate("DataDetailScreen", { sensorData, location:address });
                          } else {
                            console.error("SensorData is null");
                          }
                        }}>
                            {/* <View style={styles.boxContainer}> */}
                                <Image source={require('../../../../assets/images/sun.png')} style={styles.iconSun}/>
                                <Row direction="column" start>
                                    {/* <TextDefault style={styles.text}>Quận 7, TP.HCM</TextDefault> */}
                                    <TextDefault style={styles.text}>{address?.district}</TextDefault>
                                    <TextDefault style={styles.text}>{address?.city}</TextDefault>
                                    <Row evenly>
                                        <TextDefault bold style={styles.text}>{dateTransfer.getTime(sensorData?.time)}</TextDefault>
                                        <View style={styles.number}>
                                            <Image style={styles.icon} source={require('../../../../assets/images/temperature.png')}/>
                                            {<TextDefault style={styles.text}>{sensorData?.temperature} °C</TextDefault>}
                                        </View>
                                        <View style={styles.number}>
                                            <Image style={styles.icon} source={require('../../../../assets/images/humidity.png')}/>
                                            <TextDefault style={styles.text}>{sensorData?.humidity}%</TextDefault>
                                        </View>
                                    </Row>
                                </Row>
                                <Image source={require('../../../../assets/images/cloud.png')} style={styles.cloud}/>
                            {/* </View> */}
                        </TouchableOpacity>
                    </Row>
                </LinearGradient>
                <View style={styles.body}>
                    <Row direction="row" colGap={10} style={[{height: 120}]}>
                        <View style={[styles.box,{flex: 1, flexDirection:"column", height: '100%', alignItems:'center'}]}>
                            <Row direction="row">
                                <Image style={styles.icon} source={require('../../../../assets/images/dust.png')}/>
                                <TextDefault style={[{color: Colors.light.greyBlack}]}>BỤI MỊN 2.5</TextDefault>
                            </Row>
                            <TextDefault bold style={[{color: Colors.light.text, fontSize: 25, paddingVertical:10}]}>{sensorData?.dust}</TextDefault>
                            {/* <TextDefault bold style={[{color: Colors.light.text, fontSize: 20}]}>Thấp</TextDefault> */}
                        </View>
                        <View style={[styles.box, {flex: 2, height: "100%"}]}>
                            <TextDefault style={[{color: Colors.light.greyBlack}]}>Đánh giá chất lượng</TextDefault>
                            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
                                <HalfCircleProgress level={level[sensorData?.evalute || 1]}></HalfCircleProgress>
                                {/* <TextDefault bold style={[{color: colors[ sensorData?.evalute|| Colors.light.text], fontSize: 20}]}>{descriptions[ sensorData?.evalute|| "good"]}</TextDefault> */}
                            </View>
                        </View>
                    </Row>
                    <View style={styles.box}>
                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <Foundation name="lightbulb" size={32} color={Colors.light.yellow}/>
                            <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Lời khuyên dành cho bạn</TextDefault>
                        </View>
                        <SuggestionComponent iconType={sensorData?.evalute}/>
                        
                    </View>
                    {Dustpredicted && Dustpredicted.length > 0 &&(
                        <View style={styles.box}>
                            <View style={[{flexDirection:'row', alignItems:'center'}]}>
                                <FontAwesome name="hourglass-1" size={32} color={Colors.light.yellow}/>
                                <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán theo giờ của bụi PM2.5</TextDefault>
                            </View>
                            {/* <View style={{height:1, width:'100%', backgroundColor:Colors.light.text,marginTop:10}}/> */}
                            <HourListComponent data={Dustpredicted}></HourListComponent>

                        </View>
                    )}
                    {CO2predicted && CO2predicted.length > 0 &&(
                        <View style={styles.box}>
                            <View style={[{flexDirection:'row', alignItems:'center'}]}>
                                <FontAwesome name="hourglass-1" size={32} color={Colors.light.yellow}/>
                                <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán theo giờ của CO2</TextDefault>
                            </View>

                                <HourListComponent data={CO2predicted}></HourListComponent>
                        </View>
                    )}
                    {COpredicted && COpredicted.length > 0 &&(
                        <View style={styles.box}>
                            <View style={[{flexDirection:'row', alignItems:'center'}]}>
                                <FontAwesome name="hourglass-1" size={32} color={Colors.light.yellow}/>
                                <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán theo giờ của CO</TextDefault>
                            </View>

                                <HourListComponent data={COpredicted}></HourListComponent>
                        </View>
                    )}
                    <View style={styles.box}>
                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <AntDesign name="calendar" size={32} color={Colors.light.yellow}/>
                            <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán trong 3 ngày tới</TextDefault>
                        </View>
                        <AQIForecast
                            data={[
                                { day: "Hôm nay", aqi: 30 },
                                { day: "Ngày mai", aqi: 80 },
                                { day: "Ngày mốt", aqi: 30 },
                            ]}
                        />
                    </View>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}   
export default Dashboard

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    linearGradient: {
        height: 230,
        borderBottomLeftRadius:45,
        borderBottomRightRadius:45,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    text:{
        color:Colors.light.text,
        fontSize:18,
    }, 
    badge:{
        height:8,
        width: 8,
        backgroundColor:Colors.light.warning,
        borderRadius: 9,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    boxContainer: {
        // height: 100,
        width: '100%',
        padding: 15,
        borderRadius:20,
        backgroundColor: Colors.light.grey,
        justifyContent:'flex-start',
        elevation: 10,
        alignItems:'center',
        flexDirection:'row',
        marginBottom: 10,
    },
    iconSun: {
        height:50,
        width: 50,
        marginRight: 20,
    },
    icon:{
        height: 28,
        width: 28,
        marginRight: 0,
    },
    number:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10,
    },
    cloud:{
        height: 80,
        width: 150,
        position:'absolute',
        opacity: 0.9,
        top: -40,
        right: 0,
    },
    body:{
        backgroundColor: Colors.light.grey,
        // backgroundColor: Colors.light.warning,
        flex: 1,
        // flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingTop: 30,
    
    },
    box:{
        minHeight: 80,
        padding: 5,
        backgroundColor: Colors.light.grey,
        borderRadius: 20,
        elevation: 5,
        marginBottom: 20,
    }
})