import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {ContainerComponent} from '../../../components'
import ProgressBarChart from './Components/ProgressBarChartComponent'
import TextDefault from '../../../components/TextDefault'
import HalfCircleProgress from './Components/HalfCircleProgress'
import Colors from '../../../constants/Colors'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/BottomTabNavigator/DashboardNavigator'
import { dateTransfer } from '../../../utils/date'
import Row from '../../../components/Row'
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { locationSelector } from '../../../redux/reducers/locationReducer'

type DataDetailRouteProp = RouteProp<RootStackParamList, "DataDetailScreen">;

const DataDetail = ({route} : { route: DataDetailRouteProp }) => {
  // const [sensorData, setsensorData] = useState(route.params)
  const { sensorData, location } = route.params; // ✅ Lấy đúng dữ liệu từ params
  const [data, setData] = useState(sensorData); // ✅ Lưu sensorData vào state
  const locationselector = useSelector(locationSelector);
  const [address, setaddress] = useState(location)
  const level: { [key: string]: number } = {
    "Good": 1,
    "Moderate": 2,
    "Unhealthy": 3, 
    "Hazardous": 4
};
  return (
    <ContainerComponent back title='Thông tin chi tiết'>
      <View style = {style.container}>
        <View style={style.header}> 
          <TextDefault bold size={20} color={Colors.light.text}>{address.city},{address.district}</TextDefault>
        </View>
        <View style={style.body}>
          <HalfCircleProgress level={level[sensorData?.evalute || 1]} size = {200}></HalfCircleProgress>
          <View>
            <Row direction='row' colGap={10}>
            <SimpleLineIcons name="refresh" size={24} color={Colors.light.text} />
            <TextDefault color={Colors.light.text} size={18}>Cập nhật lần cuối: {dateTransfer.getTime(data?.time)}</TextDefault>
            </Row>
          </View>
          <View style={style.chart}>
            <ProgressBarChart title='CO2' value={Number(data.airQuality)} color='#4A90E2'/>
            <ProgressBarChart title='CO' value={Number(data.CO)} color='#E94E77'/>
            <ProgressBarChart title='Dust' value={Number(data.dust)} color="#9B59B6"/>
            <ProgressBarChart title='Nhiệt độ' value={Number(data.temperature)} color='#E74C3C'/>
            <ProgressBarChart title='Độ ẩm' value={Number(data.humidity)} color='#2ECC71'/>
          </View>
        </View>

      </View>
    </ContainerComponent>
  )
}

const style = StyleSheet.create({
  container:{
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: 30
  }, 
  body:{
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 50,
  },
  chart: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: 80,
    padding: 5,
    // backgroundColor: Colors.light.textSecond,
    backgroundColor: Colors.light.grey,
    // backgroundColor: '#B8DCE3',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  box:{

}

})
export default DataDetail