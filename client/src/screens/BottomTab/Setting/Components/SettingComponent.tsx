import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Colors from '../../../../constants/Colors'
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
}
const SettingComponent = (props: Props) => {
    const {
        icon,
        height='100%', 
        width=50,
        text
        } = props;
    return (
        <TouchableOpacity 
            style={[
                {
                    // width,
                    height
            
                },
                styles.container
            ]} 
            // onPress={}
        >
            <Text style={{fontSize: 18}}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        // backgroundColor:'blue',
        // alignItems:'center',
        justifyContent:'center',
        borderWidth: 0.5,
        borderColor: Colors.light.greyBlack
        
    },
})
export default SettingComponent