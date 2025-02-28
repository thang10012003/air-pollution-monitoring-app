import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {ContainerComponent} from '../../../components'
import ProgressBarChart from '../Dashboard/Components/ProgressBarChartComponent'
import TextDefault from '../../../components/TextDefault'
import HalfCircleProgress from '../Dashboard/Components/HalfCircleProgress'
import Colors from '../../../constants/Colors'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/BottomTabNavigator/MapNavigator'
import { dateTransfer } from '../../../utils/date'
import Row from '../../../components/Row'
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { locationSelector } from '../../../redux/reducers/locationReducer'

type DataDetailRouteProp = RouteProp<RootStackParamList, "DataPosDetailScreen">;

const DataPosDetail = ({route} : { route: DataDetailRouteProp }) => {
const [location, setlocation] = useState(route.params)
const [data, setData] = useState(""); // ✅ Lưu sensorData vào state
  const level: { [key: string]: number } = {
      "Good": 1,
      "Moderate": 2,
      "Unhealthy": 3, 
      "Hazardous": 4
  };
  const fetchDataPredicted = async () =>{
      try {
          // if (!sensorData?.id) {
          //     console.log("sensorData.id không tồn tại");
          //     return;
          // }
          // const api = `api/history/${sensorData?.id}`
          // // const res = await axiosClient.get<Location[]>(api);
          // const res  = await axiosClient.get(api);      
          // const data = res.data
          // if (!data?.realPredictions || !Array.isArray(data.realPredictions)) {
          //     console.error("Dữ liệu không hợp lệ hoặc không có realPredictions");
          //     return;
          // }
          // // Trích xuất cột 0 (nhiệt độ)
          // const CO = data.realPredictions.map((row: number[]) => row[0] ?? null);
          // const CO2 = data.realPredictions.map((row: number[]) => row[1] ?? null);
          // const Dust = data.realPredictions.map((row: number[]) => row[2] ?? null);
          // setCOpredicted(CO)
          // setCO2predicted(CO2)
          // setDustpredicted(Dust)
          // setdataset(res.data);
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <ContainerComponent back title='Thông tin chi tiết'>
      <View style = {style.container}>
        <View style={style.header}> 
          <TextDefault bold size={20} color={Colors.light.text}>{location.name}</TextDefault>
        </View>
        <View style={style.body}>
          {/* <HalfCircleProgress level={level[sensorData?.evaluate || 1]} size = {200}></HalfCircleProgress> */}
          <View>
            <Row direction='row' colGap={10}>
            <SimpleLineIcons name="refresh" size={24} color={Colors.light.text} />
            {/* <TextDefault color={Colors.light.text} size={18}>Cập nhật lần cuối: {dateTransfer.getTime(data?.time)}</TextDefault> */}
            </Row>
          </View>
          <View style={style.chart}>
            {/* <ProgressBarChart title='CO2' value={Number(data.airQuality)} color='#4A90E2'/>
            <ProgressBarChart title='CO' value={Number(data.CO)} color='#E94E77'/>
            <ProgressBarChart title='Dust' value={Number(data.dust)} color="#9B59B6"/>
            <ProgressBarChart title='Nhiệt độ' value={Number(data.temperature)} color='#E74C3C'/>
            <ProgressBarChart title='Độ ẩm' value={Number(data.humidity)} color='#2ECC71'/> */}
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
export default DataPosDetail