import { View, Text } from 'react-native'
import React from 'react'

interface Props {
    value: number,
} 
const AqiComponent = (props: Props) => {
    const {
        value,
    } = props

    // Xác định màu nền dựa vào giá trị của AQI
    let backgroundColor = '#00FF00'; // Mặc định là xanh (nếu value < 50)
    if (value >= 50 && value < 80) {
        backgroundColor = '#FFFF00'; // Vàng nếu value từ 50 đến 79
    } else if (value >= 80) {
        backgroundColor = '#FF0000'; // Đỏ nếu value >= 80
    }
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{value}</Text>
        </View>
    )
}

export default AqiComponent