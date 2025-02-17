import { View, Text, StyleSheet, Image, Button } from "react-native"
import Colors from '../../../constants/Colors'
import CircleComponent from "../../../components/CircleComponent"
import Avatar from '../../../components/Avatar'
import ButtonComponent from "../../../components/ButtonComponent"
import {Entypo, AntDesign, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux"
import { authSelector, removeAuth } from "../../../redux/reducers/authReducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState } from "react"
import { locationSelector,removeLocation } from "../../../redux/reducers/locationReducer"
import SettingComponent from "./Components/SettingComponent"
import { SpaceComponent } from "../../../components"
import { Validate } from "../../../utils/validation"
import TextDefault from "../../../components/TextDefault"

const  Setting = () =>{
    const url='https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'
    const dispatch = useDispatch();
    const selector = useSelector(authSelector);
    const locationselector = useSelector(locationSelector);
    const [username, setusername] = useState(Validate.extractNameFromEmail(selector.email))
    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Cài đặt</Text>
            </View>
            <View style = {styles.body}> 
                <Image source={{ uri: url }} style={styles.avatar} />
                <SpaceComponent height={20}></SpaceComponent>
                <TextDefault size={20} color={Colors.light.text}>{username}</TextDefault>
                <SpaceComponent height={100}></SpaceComponent>
                <View style={{
                    // flex: 1, 
                    backgroundColor:'white', 
                    width: '90%', 
                    justifyContent:'center',
                    borderWidth: 0.3,
                    borderColor: Colors.light.greyBlack,
                    borderRadius:10,
                    // paddingHorizontal:10,

                    
                }}>
                    <SettingComponent 
                        text="Chỉnh sửa thông tin   " 
                        height={60}
                        textSize={20}
                        iconFlex="left"
                        icon={<AntDesign name="edit" size={24} color="black" />}
                    />
                    <SettingComponent 
                        text="Chế độ xem" 
                        height={60}
                        textSize={20}
                        iconFlex="left"
                        icon={<AntDesign name="eye" size={24} color="black" />}
                    />
                    <SettingComponent 
                        text="Thông báo" 
                        height={60}
                        textSize={20}
                        iconFlex="left"
                        icon={<FontAwesome name="bell" size={24} color="yellow" />}
                    />
                    <SettingComponent 
                        text="Mức cảnh báo" 
                        height={60}
                        textSize={20}
                        iconFlex="left"
                        icon={<MaterialIcons name="data-thresholding" size={24} color="blue" />}
                    />
                </View>
                <View style={{flex:1}}/>
                <ButtonComponent 
                    text="Đăng xuất"
                    type="primary"
                    color={Colors.light.textSecond}
                    textColor={Colors.light.danger}
                    iconFlex="left"
                    icon={<Entypo name="log-out" size={24} color={Colors.light.danger}/>} 
                    height={50}
                    width={200}
                    borderWidth={2}
                    borderColor={Colors.light.danger}
                    // onPress={async()=> dispatch(removeAuth({}), await AsyncStorage.removeItem('auth'))}
                    onPress={async()=> dispatch(
                        removeAuth({}), 
                        await AsyncStorage.setItem('auth',JSON.stringify(selector.email) ),
                        removeLocation({}),
                        // await AsyncStorage.setItem('locationPermission', '' ),
                        await AsyncStorage.removeItem('locationPermission') // Xóa quyền đã lưu
                    )}
                />
            </View>
        </View>
    )
}
export default Setting

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:"white",
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
        fontSize: 30,
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
        borderRadius:100,
    }
})