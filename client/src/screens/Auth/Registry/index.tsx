import { AntDesign } from '@expo/vector-icons/';
import React, { useState } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { InputComponent, SpaceComponent } from "../../../components";
import Row from "../../../components/Row";
import TextDefault from "../../../components/TextDefault";
import Colors from "../../../constants/Colors";
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../Login';
import { LoadingModal } from '../../../modals';
import authenticationAPI from '../../../apis/authAPI';

const initValue = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  
export default function RegistryScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [values, setValues] = useState(initValue);
    const [isRemember, setIsRemember] = useState(true);
    const [isloading, setIsloading] = useState(false)
    const navigation = useNavigation();

    const handelRegistry = async() => {
        // setIsloading(true);
        const api = '/register';
        try {
            const res = await authenticationAPI.HandleAuthentication(
                api,
                // {email: values.email},
                values,
                'post',
            );
            console.log(res.data)
            setIsloading(false)
        } catch (error) {
            console.log(error);
            setIsloading(false);
        }
    }

    const handleChangeValue = (key: string, value: string) => {
        const data: any = {...values};
    
        data[`${key}`] = value;
    
        setValues(data);
      };
    
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
            source={require('../../../../assets/images/cloud_bg.png')}
            resizeMode="cover"
            style = {styles.imageBackground}
            imageStyle={{opacity:0.7}}
            >
                <LoadingModal visible={isloading}>

                </LoadingModal>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../../assets/images/logo.png')} style={styles.image}></Image>
                </View>
                <View style={styles.formContainer}>
                    <TextDefault bold size={32} color={Colors.light.text}>Bắt đầu nào</TextDefault>
                    <InputComponent 
                        value={values.email} 
                        placeholder="Nhập email" 
                        onChange={val => handleChangeValue('email',val)}
                        allowClear
                        nameInput="Email"
                        affix={<AntDesign name="user" size={20} color={Colors.light.greyBlack}/>}
                    />
                    <InputComponent
                        value={values.password} 
                        placeholder="Nhập mật khẩu" 
                        onChange={val => handleChangeValue("password", val)}
                        allowClear
                        isPassword
                        nameInput="Mật khẩu"
                        affix={<AntDesign name="lock" size={20} color={Colors.light.greyBlack}/>}
                    />   
                    <InputComponent
                        value={values.confirmPassword} 
                        placeholder="Xác nhận mật khẩu" 
                        onChange={val => handleChangeValue("confirmPassword", val)}
                        allowClear
                        isPassword
                        nameInput="Xác nhận mật khẩu"
                        affix={<AntDesign name="lock" size={20} color={Colors.light.greyBlack}/>}
                    />     
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={handelRegistry}
                    >
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
                        <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        >
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