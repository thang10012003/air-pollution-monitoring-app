import { View, Text, StyleSheet } from "react-native"
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { useEffect } from "react";
import { PermissionsAndroid } from 'react-native';


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
const  Map = () =>{
    return(
        <View style = {styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 16.1667,
                    longitude: 	107.8333,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                }}
            >
                <Marker
                    coordinate={{
                        latitude:  16.1667,
                        longitude: 107.8333,
                    }}
                    title="Bình Thạnh"
                    description="Khu vực Bình Thạnh, TP.HCM"
                />
            </MapView>
        </View>
    )
}
export default Map

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'blue',
        flex:1,
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    }
})