import { ImageBackground, Text, Image, View, StyleSheet, SafeAreaView} from "react-native";
// import background from "../../../../assets/cloud_bg.png";
import {ButtonPrimary, ButtonSecond} from '../..//../components/Button'
import Colors from '../../../constants/Colors'


export default function IntroScreen(){
    return(
        // <View style= {styles.imageBackground}>
        <SafeAreaView style={styles.container}>
            <ImageBackground 
            source={require('../../../../assets/images/cloud_bg.png')}
            resizeMode="cover"
            style = {styles.imageBackground}
            imageStyle={{opacity:0.7}}
            >
                <View style={styles.imageContainer}>
                    <Image source={require('../../../../assets/images/logo.png')} style={styles.image}></Image>
                    <Text style={[styles.text,{fontWeight:'bold',fontSize:32}]}>Chào mừng bạn{'\n'}</Text>
                    <Text style={[styles.text,{fontWeight:'normal',fontSize:16}]}>Theo dõi tình trạng không khí ngay hôm nay</Text>
                </View>
                <View style={styles.btn}>
                    <ButtonPrimary 
                    title='Đăng nhâp' onPress={()=>{}}
                    />
                    <ButtonSecond title="Đăng ký" onPress={()=>{}}
                    />
                </View>

            </ImageBackground>
        </SafeAreaView>

    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground:{
        flex: 1,
        justifyContent: 'flex-end',
        // opacity:0.8

        // justifyContent:'center',
        // alignItems:'center'
    },
    imageContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        // opacity: 0.5,
    },
    image:{
        height: 200,
        width: 200,
        bottom:170,
        // marginBottom:200,
    },
    btn: {
        // flex:1,
        width:'100%',
        minHeight: 65,
        minWidth: 'auto',
        flexDirection: "row",
        // backgroundColor: 'blue',
    },
    text:{
        color:Colors.light.text
    }
})