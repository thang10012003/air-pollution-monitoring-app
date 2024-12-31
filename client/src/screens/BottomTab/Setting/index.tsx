import { View, Text, StyleSheet, Image } from "react-native"
import Colors from '../../../constants/Colors'
import CircleComponent from "../../../components/CircleComponent"
import Avatar from '../../../components/Avatar'

const  Setting = () =>{
    const url='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'
    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Cài đật</Text>
            </View>
            <View style = {styles.body}> 
                <Image source={{ uri: url }} style={styles.avatar} />
            </View>
        </View>
    )
}
export default Setting

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
    },
    header:{
        width: '100%',
        height: 150,
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent: 'center',

    },
    text:{
        fontSize: 20,
        color: Colors.light.text,
        fontWeight: 'bold',
    },
    body:{
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        height: 100, 
        width: 100,
    }
})