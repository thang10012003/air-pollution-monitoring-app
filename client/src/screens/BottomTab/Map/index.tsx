import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from 'react-native-maps';
import axiosClient from "../../../apis/axiosClient";
import { LocationType } from "../../../models/LocationModel";
import TextDefault from "../../../components/TextDefault";
import Colors from '../../../constants/Colors'
import Row from "../../../components/Row";
import { LoadingModal } from "../../../modals";
import { ButtonPrimary } from "../../../components";
import ButtonComponent from "../../../components/ButtonComponent";
import {Entypo} from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { addLocation, locationSelector } from "../../../redux/reducers/locationReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/BottomTabNavigator/MapNavigator";

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, "DataPosDetailScreen">;
const  Map = () =>{
    const [locations, setlocations] = useState<LocationType []>([]);
    const [currentPos, setcurrentPos] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0); // Index hiện tại trong danh sách  
    const [isloading, setisloading] = useState(true);
    const dispatch = useDispatch();
    const locationselector = useSelector(locationSelector)
    const navigation = useNavigation<DashboardNavigationProp>();
    
    const fetchLocations = async() => {
        try {
            const api = '/api/location'
            // const res = await axiosClient.get<Location[]>(api);
            const res  = await axiosClient.get(api);
            setlocations(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchLocations();
        console.log(locationselector)
        // requestLocationPermission()
    },[])
    const initialRegion = {
        latitude: 10.7319314,
        longitude: 	106.6967669,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    }
    const handleDetailPosData = (id:string, name:string) =>{
        navigation.navigate("DataPosDetailScreen",{id, name})
    }
    // Dùng useEffect để log khi locations thay đổi
    // useEffect(() => {
    //     console.log("Updated locations: ", locations);
    //     setlocations(locations);
    // }, [locations]);  // Chỉ chạy khi locations thay đổi
    const mapRef = useRef<MapView | null>(null);
  // Hàm di chuyển đến vị trí tiếp theo
    const moveToNextLocation = () => {
        if (locations.length > 0) {
        const nextIndex = (currentIndex + 1) % locations.length; // Vòng lặp lại từ đầu khi hết danh sách
        setCurrentIndex(nextIndex);
        const nextLocation = locations[nextIndex];
        setcurrentPos(nextLocation.name)
        const region: Region = {
            latitude: Number(nextLocation.latitude),
            longitude: Number(nextLocation.longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };

        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000); // Di chuyển trong 1 giây
        }
        }
    };
  // Xử lý để chuyển đến vị trí đầu tiên trong danh sách
  const centerOnFirstLocation = () => {
    if (locations.length > 0) {
      const firstLocation = locations[0];
      const region: Region = {
        latitude: Number(firstLocation.latitude),
        longitude: Number(firstLocation.longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      
      // Dùng animateToRegion để di chuyển bản đồ đến vị trí của location đầu tiên
      if (mapRef.current) {
        mapRef.current.animateToRegion(region, 1000);
      }
    }
  };
    // Gọi hàm centerOnFirstLocation sau khi locations đã có dữ liệu
    useEffect(() => {
        if (locations.length > 0) {
          centerOnFirstLocation();
          setisloading(false)
        }
      }, [locations]);
    return(
        <View style = {styles.container}>
            <View style={{width: '100%', height:60, justifyContent:'center', alignItems:"center", marginTop: 20, backgroundColor:'white'}}>
                <Row full direction="column">
                    <TextDefault center size={16} color={Colors.light.backgroundSecond}>Vi tri hien tai</TextDefault>
                    <TextDefault center size={16} color={Colors.light.backgroundSecond} bold>{currentPos}</TextDefault>

                </Row>
            </View>
            
            {locations.length > 0 ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    showsMyLocationButton
                    showsUserLocation={true}
                    initialRegion={initialRegion}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            coordinate={{
                                latitude: Number(location.latitude), // Chuyển latitude từ string thành number
                                longitude: Number(location.longitude), // Chuyển longitude từ string thành number
                            }}
                            title={location.name}
                            description="Description"
                            onPress={() => handleDetailPosData(location.id,location.name)}
                        />

                    ))}
                    <Marker coordinate={{ latitude: Number(locationselector.latitude), longitude: Number(locationselector.longitude) }}
                     title="Your Location"
                     pinColor="blue" />
                </MapView>
                ) : (
                    <LoadingModal visible={isloading}/>
                )}
            <ButtonComponent 
                text="Vị trí tiếp theo"
                type="primary"
                color={Colors.light.text}
                textColor={Colors.light.textSecond}
                iconFlex="left"
                // icon={<Entypo name="log-out" size={24} color={Colors.light.danger}/>} 
                height={50}
                width={Dimensions.get("screen").width}
                // borderWidth={2}
                radius={-10}
                // borderColor={Colors.light.danger}
                onPress={() => moveToNextLocation()}  
            />
            </View>
        
    )
}
export default Map

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 30,
        backgroundColor: 'white',
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    map:{
        // ...StyleSheet.absoluteFillObject,
        // width: '100%',
        // height: '80%',
        flex: 1
    }
})


// const requestLocationPermission = async () => {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: "Location Permission",
//                 message: "This app needs access to your location.",
//                 buttonNeutral: "Ask Me Later",
//                 buttonNegative: "Cancel",
//                 buttonPositive: "OK"
//             }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// };
// const getUserCurrentPositon = () =>{
//     Geolocation.getCurrentPosition(position =>{
//         console.log(position)
//     })
// }
// useEffect(() => {
//     const checkPermissionAndGetLocation = async () => {
//         const hasPermission = await requestLocationPermission();
//         if (hasPermission) {
//             getUserCurrentPositon();
//         } else {
//             console.log("Location permission denied");
//         }
//     };
//     checkPermissionAndGetLocation();
// }, []);