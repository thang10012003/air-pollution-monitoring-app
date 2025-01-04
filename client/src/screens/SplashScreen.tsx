import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, ActivityIndicator} from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const SplashScreen = () => {
  return (
      <SafeAreaView style={styles.container}>
        <ImageBackground 
        source={require('../../assets/images/cloud_bg.png')}
        resizeMode="cover"
        style = {styles.imageBackground}
        imageStyle={{opacity:0.7}}
        >
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.image}></Image>
                {/* <Text style={[styles.text,{fontWeight:'bold',fontSize:32}]}>Chào mừng bạn{'\n'}</Text>
                <Text style={[styles.text,{fontWeight:'normal',fontSize:16}]}>Theo dõi tình trạng không khí ngay hôm nay</Text> */}
                <ActivityIndicator color={Colors.light.greyBlack} size={30}/>
            </View>
            {/* <View style={styles.btn}>  */}
                {/* <ButtonPrimary 
                title='Đăng nhâp' onPress={()=>{}}
                />
                <ButtonSecond title="Đăng ký" onPress={()=>{}}
                /> */}
            {/* </View> */}


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
  },
  imageContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'column',
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
export default SplashScreen