import { View, Text, StyleSheet } from "react-native"
import MapView, { Marker } from 'react-native-maps'

const  Map = () =>{
    return(
        <View style = {styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 21.028511,
                    longitude: 105.804817,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
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