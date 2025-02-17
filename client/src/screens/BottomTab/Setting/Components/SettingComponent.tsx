import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Colors from '../../../../constants/Colors'
import TextDefault from '../../../../components/TextDefault';
import Row from '../../../../components/Row';
import {FontAwesome} from '@expo/vector-icons';

interface Props {
    icon?: ReactNode;
    text: string;
    color?: string;
    textColor?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    height: number ;
    width?: number;
    row?: boolean;
    borderColor?: string,
    borderWidth?: number,
    radius?: number,
    textSize?:number,
}
const SettingComponent = (props: Props) => {
    const {
        icon,
        height='100%', 
        width=50,
        text,
        iconFlex,
        textColor,
        textSize
        } = props;
    return (
        <TouchableOpacity 
            style={[
                {
                    // width,
                    height,
                },
                styles.container
            ]} 
            // onPress={}
        >
            <Row full direction='row' start>
                {icon && iconFlex === 'left' && icon}
                <TextDefault  
                color={textColor ?? "black"}
                style={[
                    // textStyles,
                    {
                    marginLeft: icon ? 12 : 0,
                    fontSize: 16,
                    // textAlign: 'center',
                    },
                ]}
                size={textSize}
                >
                    {text}
                </TextDefault>
                {icon && iconFlex === 'right' && icon}
                <View style={{flex:1}}/>
                <FontAwesome name="angle-right" size={24} color="black" />
            </Row>
            {/* <Text style={{fontSize: 18}}>{text}</Text> */}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        // width: '100%',
        // backgroundColor:'blue',
        // alignItems:'center',
        justifyContent:'center',
        // borderWidth: 0.5,
        // borderColor: Colors.light.greyBlack,
        borderBottomColor:Colors.light.greyBlack,
        borderBottomWidth:0.2,
        paddingHorizontal:20,
        // borderRadius:10,
        
    },
})
export default SettingComponent