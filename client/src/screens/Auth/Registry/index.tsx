import { AntDesign } from '@expo/vector-icons/';
import React, { useState } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { InputComponent, SpaceComponent } from "../../../components";
import Row from "../../../components/Row";
import TextDefault from "../../../components/TextDefault";
import Colors from "../../../constants/Colors";

export default function RegistryScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
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
                </View>
                <View style={styles.formContainer}>
                    <TextDefault bold size={32} color={Colors.light.text}>Bắt đầu nào</TextDefault>
                    <InputComponent 
                        value={email} 
                        placeholder="Nhập email" 
                        onChange={val => setEmail(val)}
                        allowClear
                        nameInput="Email"
                        affix={<AntDesign name="user" size={20} color={Colors.light.greyBlack}/>}
                    />
                    <InputComponent
                        value={password} 
                        placeholder="Nhập mật khẩu" 
                        onChange={val => setPassword(val)}
                        allowClear
                        isPassword
                        nameInput="Mật khẩu"
                        affix={<AntDesign name="lock" size={20} color={Colors.light.greyBlack}/>}
                    />   
                    <InputComponent
                        value={confirmPassword} 
                        placeholder="Xác nhận mật khẩu" 
                        onChange={val => setConfirmPassword(val)}
                        allowClear
                        isPassword
                        nameInput="Xác nhận mật khẩu"
                        affix={<AntDesign name="lock" size={20} color={Colors.light.greyBlack}/>}
                    />     
                    <TouchableOpacity style={styles.button}>
                        <TextDefault color={Colors.light.textSecond} bold size={20}>Đăng ký</TextDefault>
                    </TouchableOpacity>
                    <Row full between>
                        <SpaceComponent height={1.5} width={90} backgroundColor={Colors.light.backgroundSecond}/>
                        <TextDefault color={Colors.light.text}>Hoặc đăng ký bằng</TextDefault>
                        <SpaceComponent height={1.5} width={90} backgroundColor={Colors.light.backgroundSecond}/>
                    </Row>
                    <Row full evenly>
                        <TouchableOpacity>
                            <Image source={require('../../../../assets/images/googleIcon.png') }></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../../../assets/images/facebookIcon.png')} style={{width: 32, height: 32}}></Image>
                        </TouchableOpacity>
                    </Row>
                    <Row>
                        <TextDefault color={Colors.light.text} size={18}>Đã có tài khoản?</TextDefault>
                        <TouchableOpacity>
                            <TextDefault bold color={Colors.light.text} size={18}>Đăng nhập</TextDefault>
                        </TouchableOpacity>
                    </Row>
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
  },
  imageContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    //   flexDirection:'column',
      // opacity: 0.5,
  },
  image:{
      height: 150,
      width: 150,
      marginTop: 30,
      // marginBottom:200,
  },
  text:{
      color:Colors.light.text
  },
  formContainer:{
    flex: 3,
    backgroundColor: Colors.light.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: 30,
    paddingHorizontal: 20,

  },
  button: {
    width: "100%",
    height: 60,
    // padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.backgroundSecond,
    alignItems:'center',
    justifyContent:'center',
  }
})