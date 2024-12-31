import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet, Image, Platform} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../../constants/Colors"
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from "../../../components/Avatar";
import Row from "../../../components/Row";
import TextDefault from "../../../components/TextDefault";
import CircleComponent from '../../../components/CircleComponent'
import {AntDesign, FontAwesome, Foundation} from "@expo/vector-icons";
import iconSet from "@expo/vector-icons/build/Fontisto";

function  Dashboard (){
    return(
        <View style = {styles.container}>
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
                                    <TextDefault bold style={styles.text}>Nguyễn Thắng</TextDefault>
                                </Row>

                            </Row>
                            <CircleComponent size={40} color={Colors.light.background}>
                                <View>
                                    <FontAwesome name="bell" size={24} color='yellow'/>
                                    <View style = {styles.badge}></View>
                                </View>
                            </CircleComponent>
                        </Row>
                        <View style={styles.boxContainer}>
                            <Image source={require('../../../../assets/images/sun.png')} style={styles.iconSun}/>
                            <Row direction="column" start>
                                <TextDefault style={styles.text}>Quận 7, TP.HCM</TextDefault>
                                <Row>
                                    <TextDefault bold style={styles.text}>10:00</TextDefault>
                                    <View style={styles.number}>
                                        <Image style={styles.icon} source={require('../../../../assets/images/temperature.png')}/>
                                        <TextDefault style={styles.text}>37 C</TextDefault>
                                    </View>
                                    <View style={styles.number}>
                                        <Image style={styles.icon} source={require('../../../../assets/images/humidity.png')}/>
                                        <TextDefault style={styles.text}>20%</TextDefault>
                                    </View>
                                </Row>
                            </Row>
                            <Image source={require('../../../../assets/images/cloud.png')} style={styles.cloud}/>
                        </View>
                    </Row>
                </LinearGradient>
                <View style={styles.body}>
                    <Row direction="row" colGap={10} style={[{height: 120}]}>
                        <View style={[styles.box,{flex: 1, flexDirection:"column", height: '100%'}]}>
                            <Row direction="row">
                                <Image style={styles.icon} source={require('../../../../assets/images/dust.png')}/>
                                <TextDefault style={[{color: Colors.light.greyBlack}]}>BỤI MỊN 2.5</TextDefault>
                            </Row>
                            <TextDefault bold style={[{color: Colors.light.text, fontSize: 32}]}>50</TextDefault>
                            <TextDefault bold style={[{color: Colors.light.text, fontSize: 20}]}>Thấp</TextDefault>
                        </View>
                        <View style={[styles.box, {flex: 2, height: "100%"}]}>
                            <TextDefault style={[{color: Colors.light.greyBlack}]}>AQI</TextDefault>
                            <TextDefault bold style={[{color: Colors.light.text, fontSize: 20}]}>Tốt</TextDefault>
                        </View>
                    </Row>
                    <View style={styles.box}>
                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <Foundation name="lightbulb" size={32} color={Colors.light.yellow}/>
                            <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Lời khuyên dành cho bạn</TextDefault>
                        </View>
                        
                    </View>
                    <View style={styles.box}>
                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <FontAwesome name="hourglass-1" size={32} color={Colors.light.yellow}/>
                            <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán theo giờ</TextDefault>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                            <AntDesign name="calendar" size={32} color={Colors.light.yellow}/>
                            <TextDefault bold style={[{color: Colors.light.greyBlack, width: 'auto'}]}>Dự đoán trong 3 ngày tới</TextDefault>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
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
        marginRight: 10,
    },
    number:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 20,
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