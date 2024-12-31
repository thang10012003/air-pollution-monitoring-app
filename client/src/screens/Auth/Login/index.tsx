import { useState } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, ImageBackground,Image } from "react-native";
import Colors from "../../../constants/Colors"


export default function LoginScreen(){
    // const [isRemember, setIsRemember] = useState(false);
    // const [userInput, setUserInput] = useState<LoginBody>({
    //   username: "",
    //   password: "",
    // });
    // const { onLogin, isLoading } = useLogin();
    // const handleSubmit = async (body: LoginBody) => {
    //   await onLogin(body).then(async (res) => {
    //     if (!res) return;
    //     Toast.show({
    //       type: "success",
    //       text1: "Login successfully!",
    //     });
    //     if (isRemember) {
    //       await Helper.saveUserLoginData(userInput);
    //     }
    //   });
    // };
    // const handleLogin = async () => {
    //   const missingField = Helper.verifyField(userInput, [EKeyCheck.STRING]);
  
    //   if (missingField.length > 0) {
    //     return Toast.show({
    //       type: "error",
    //       text1: "Filed required!",
    //       text2: missingField.join(", "),
    //     });
    //   }
    //   await handleSubmit(userInput);
    // };
  
    // const handleChangeInput = (key: string, value: string) => {
    //   setUserInput({
    //     ...userInput,
    //     [key]: value,
    //   });
    // };
  
    return (
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
              {/* <ButtonPrimary 
              title='Đăng nhâp' onPress={()=>{}}
              />
              <ButtonSecond title="Đăng ký" onPress={()=>{}}
              /> */}
          </View>

      </ImageBackground>
  </SafeAreaView>
    );
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