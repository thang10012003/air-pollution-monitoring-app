import { AntDesign } from '@expo/vector-icons/';
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { InputComponent, SpaceComponent } from "../../../components";
import Row from "../../../components/Row";
import TextDefault from "../../../components/TextDefault";
import Colors from "../../../constants/Colors";
import { TopologyClosedEvent } from 'mongodb';
import authenticationAPI from '../../../apis/authAPI';
import { useNavigation } from '@react-navigation/native';
import { LoadingModal } from '../../../modals';
import { Validate } from '../../../utils/validation';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
    email: '',
    password: '',
  };
export default function LoginScreen(){
    const [isRemember, setIsRemember] = useState(true);
    const [isloading, setIsloading] = useState(false);
    const [values, setValues] = useState(initValue);
    const navigation = useNavigation();
    const emailValidation = Validate.email(values.email);
    const [errorMessage, seterrorMessage] = useState('')
    const passwordValidation = Validate.password(values.password);
    const dispatch = useDispatch();
    useEffect(() => { 
        const getEmail = async () => {
            const email = await AsyncStorage.getItem("auth");
            if(email){
                handleChangeValue("email", JSON.parse(email))
                console.log(values.email)
            }
        }
        getEmail()
    },[])
    const handleLogin = async() => {
        if(emailValidation){
            seterrorMessage('');
            if(passwordValidation){
                // setIsloading(true)
                const api = `/login`;
                try {
                    const res = await authenticationAPI.HandleAuthentication(
                        api,
                        {
                            email: values.email,
                            password: values.password,
                        },
                        "post"
                    );
                    dispatch(addAuth(res.data))

                    await AsyncStorage.setItem("auth",  
                        isRemember? JSON.stringify(res.data): res.data.email)

                    setIsloading(false);
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            }else{
                seterrorMessage("Mật khẩu ít nhất 6 kí tự!!!")
            }
        }else{
            seterrorMessage("Email không hợp lệ!!!")
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
                <LoadingModal visible={isloading}/>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../../assets/images/logo.png')} style={styles.image}></Image>
                </View>
                <View style={styles.formContainer}>
                    <TextDefault bold size={32} color={Colors.light.text}>Chào bạn quay trở lại </TextDefault>
                    <InputComponent 
                        value={values.email} 
                        placeholder="Nhập email" 
                        onChange={val => handleChangeValue("email",val)}
                        allowClear
                        nameInput="Email"
                        affix={<AntDesign name="user" size={20} color={Colors.light.greyBlack}/>}
                    />
                    <InputComponent
                        value={values.password} 
                        placeholder="Nhập password" 
                        onChange={val => handleChangeValue("password",val)}
                        allowClear
                        isPassword
                        nameInput="Mật khẩu"
                        affix={<AntDesign name="lock" size={20} color={Colors.light.greyBlack}/>}
                    />   
                    <Row full between>
                        <Row>
                            <Switch
                                trackColor={{true: Colors.light.tabIconSelected}}
                                thumbColor={Colors.light.backgroundSecond}
                                value={isRemember}
                                onChange={() => setIsRemember(!isRemember)}
                            />
                            <TouchableOpacity
                                onPress={() => setIsRemember(!isRemember)}
                            >
                                <TextDefault color={Colors.light.text} size={16}>Lưu mật khẩu</TextDefault>
                            </TouchableOpacity>
                        </Row>
                        <TouchableOpacity>
                            <TextDefault bold color={Colors.light.text} size={16}>Quên mật khẩu</TextDefault>
                        </TouchableOpacity>
                    </Row>     
                    <Row full start direction='row'>
                        {errorMessage && <TextDefault size={16} bold color={Colors.light.danger}>{errorMessage}</TextDefault>}
                    </Row>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={(handleLogin)}
                    >
                        <TextDefault color={Colors.light.textSecond} bold size={20}>Đăng nhập</TextDefault>
                    </TouchableOpacity>
                    <Row full between>
                        <SpaceComponent height={0.5} width={90} backgroundColor={Colors.light.backgroundSecond}/>
                        <TextDefault color={Colors.light.text}>Hoặc đăng nhập bằng</TextDefault>
                        <SpaceComponent height={0.5} width={90} backgroundColor={Colors.light.backgroundSecond}/>
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
                        <TextDefault color={Colors.light.text} size={18}>Chưa có tài khoản?</TextDefault>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('RegistryScreen')}
                        >
                            <TextDefault bold color={Colors.light.text} size={18}>Đăng ký</TextDefault>
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
    //   justifyContent: 'flex-end',
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
    flex: 4,
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