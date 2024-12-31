import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import colors from './../constants/Colors'


type ButtonPrimaryProps = {
  round?: number;
  onPress: () => void;
  title: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  minWidth?: number;
  disabled?: boolean;
  full?: boolean;
};

const ButtonPrimary = ({
    round = 15,
    full,
    title,

}:ButtonPrimaryProps) =>{
    return (
        <TouchableOpacity
        style={[
            styles.btnPrimary,
            {
                borderRadius: round,
                width:'auto',

            },
            // full && { width: "100%" },


        ]}>
            <Text style={styles.textPrimary}>{title}</Text>
        </TouchableOpacity>
    );
}
const ButtonSecond = ({
    round = 15,
    full,
    title,

}:ButtonPrimaryProps) =>{
    return (
        <TouchableOpacity
        style={[
            styles.btnSecond,
            {
                borderTopLeftRadius: round,
                // borderRadius: round,
                width:'auto',
            },
            // full && { width: "100%" },
        ]}>
            <Text style={styles.textSecond}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    btnPrimary: {
        padding: 10,
        // backgroundColor: colors.light.background,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.light.text,
        // flexDirection: "row",
        flex:1,
    },
    btnSecond: {
        padding: 10,
        backgroundColor: colors.light.backgroundSecond,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.light.textSecond,
        // flexDirection: "row",
        flex: 1,
    },
    textPrimary: {
        color: colors.light.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textSecond:{
        color: colors.light.textSecond,
        fontSize: 20,
        fontWeight:'bold',
    }
})
export {ButtonPrimary, ButtonSecond}
