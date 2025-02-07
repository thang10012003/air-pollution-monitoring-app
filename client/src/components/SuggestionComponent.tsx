import { ReactNode } from "react";
import { View } from "react-native";
import TextDefault from "./TextDefault";
import React from "react";
import Colors from "../constants/Colors";

const emojiMap: { [key: string]: ReactNode } = {
    "Good": "😁",       // Mặt cười vui vẻ
    "Moderate": "🙂",   // Mặt bình thường
    "Unhealthy": "😷",  // Mặt đeo khẩu trang
    "Hazardous": "☠️"  // Đầu lâu cảnh báo
};
const suggestion: { [key: string]: string } = {
    "Good": "Điều kiện không khí tốt",
    "Moderate": "Điều kiện không khí bình thường", 
    "Unhealthy": "Cần trang bị khẩu trang", 
    "Hazardous": "Hạn chế ra đường nếu không cần thiết"
};
const colors: { [key: string]: string } = {
    "Good": Colors.light.green,
    "Moderate": Colors.light.yellow,
    "Unhealthy": Colors.light.orange, 
    "Hazardous": Colors.light.danger 
};
interface Props {
    iconType?: string,
    background? : string,
    style?: string, 
    title?: string,
    full?: boolean,

}


const SuggestionComponent = (props: Props) =>{
    const {
        background,
        style,
        title,
        iconType,
        full
    }  = props
    
    return (
            <View style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors[iconType || "Moderate"],
                    marginHorizontal: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                },
                full && { width: '100%' },
                // background && { backgroundColor: background }
            ]}>
                {iconType && <TextDefault size={14} color={Colors.light.textSecond}>{suggestion[iconType]}</TextDefault>} 
                {iconType && (
                <TextDefault style={{ fontSize: 24 }}>
                    {emojiMap[iconType] || "❓"} 
                </TextDefault>

            )}
        </View>
    )
}

export default SuggestionComponent;