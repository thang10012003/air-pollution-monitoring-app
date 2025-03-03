import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../../../navigation/BottomTabNavigator/SettingNavigator'
import { RouteProp, useNavigation } from '@react-navigation/native';
import ContainerComponent from '../../../components/ContainerComponent';
import Slider from '@react-native-community/slider';
import Row from '../../../components/Row';
import TextDefault from '../../../components/TextDefault';
import Colors from '../../../constants/Colors'
import ButtonComponent from '../../../components/ButtonComponent';
import { ButtonPrimary } from '../../../components';
import {Entypo, AntDesign, FontAwesome, MaterialIcons} from '@expo/vector-icons';

type ThresholdRouteProp = RouteProp<RootStackParamList, "ThresholdScreen">;

const Threshold = ({route}: {route:ThresholdRouteProp}) => {
  const [dustValue, setDustValue] = useState(0)
  const [COValue, setCOValue] = useState(0)
  const [CO2Value, setCO2Value] = useState(0)
  const navigation = useNavigation()
  const handleSave = () =>{
    Alert.alert(
      'Thành công 🎉',
      `Cài đặt mức cảnh báo thành công`, // Nội dung
      [{ text: 'OK', onPress: () => navigation.goBack()}]
    );
    
  }
  return (
    <ContainerComponent back title='Thiết lập cảnh báo'>
      <View style={styles.container}>
        <Row direction='row' between>
          <TextDefault color={Colors.light.text} size={20} bold>Bụi PM2.5</TextDefault>
          <TextDefault color={Colors.light.text} size={20}>{dustValue}</TextDefault>
        </Row>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={dustValue}
          onValueChange={(values) => setDustValue(values)}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#1E90FF"
          // maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1E90FF"
          style={{marginTop:20, }}
          step={5}
        />
        <Row direction='row' between>
          <TextDefault color={Colors.light.text} size={20} bold>Khí CO</TextDefault>
          <TextDefault color={Colors.light.text} size={20}>{COValue}</TextDefault>
        </Row>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={COValue}
          onValueChange={(values) => setCOValue(values)}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#1E90FF"
          // maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1E90FF"
          style={{marginTop:20, }}
          step={5}
        />
        <Row direction='row' between>
          <TextDefault color={Colors.light.text} size={20} bold>Khí CO2</TextDefault>
          <TextDefault color={Colors.light.text} size={20}>{CO2Value}</TextDefault>
        </Row>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={CO2Value}
          onValueChange={(values) => setCO2Value(values)}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#1E90FF"
          // maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1E90FF"
          style={{marginTop:20, marginBottom:100}}
          step={5}
        />
        <ButtonComponent
          // <ButtonComponent 
          text="Lưu"
          type="primary"
          color={Colors.light.text}
          textColor={Colors.light.textSecond}
          iconFlex="left"
          icon={<Entypo name="save" size={24} color={Colors.light.textSecond}/>} 
          height={50}
          width={200}
          borderWidth={2}
          borderColor={Colors.light.textSecond}
          onPress={()=>handleSave()}
        />
      </View>


    </ContainerComponent>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    paddingTop:100,
    // justifyContent:'center'
  },
})
export default Threshold