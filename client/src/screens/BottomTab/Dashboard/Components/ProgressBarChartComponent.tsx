import React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import Row from "../../../../components/Row";
import TextDefault from "../../../../components/TextDefault";
import Colors from '../../../../constants/Colors'
interface Props {
    title?:string,
    value?:number,
    color?:string,
}
const ProgressBarChart = (props: Props) => {
const {title = "--", value = 0, color = 'blue'} = props;
  return (
    <View style={{ padding: 10}}>
        <Row direction="row" between >
            <TextDefault size={20} color={Colors.light.text}>{title && title=='Dust'?"Bụi PM2.5" : title}</TextDefault>
            <TextDefault size={20} color={Colors.light.text}>{value}</TextDefault>

        </Row>
        <Progress.Bar progress={Math.max(0, Math.min(1, value / 100))} width={300} color={color} />
      {/* <Text>{title}</Text>
      <Progress.Bar progress={0.8} width={300} color="#4A90E2" /> */}
{/* 
      <Text>Work</Text>
      <Progress.Bar progress={0.6} width={300} color="#E94E77" />

      <Text>Friends</Text>
      <Progress.Bar progress={0.5} width={300} color="#9B59B6" />

      <Text>Music</Text>
      <Progress.Bar progress={0.7} width={300} color="#E74C3C" />

      <Text>Travel</Text>
      <Progress.Bar progress={0.3} width={300} color="#2ECC71" />

      <Text>Food</Text>
      <Progress.Bar progress={0.9} width={300} color="#F4A62A" /> */}
    </View>
  );
};

export default ProgressBarChart;
