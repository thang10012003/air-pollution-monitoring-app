import { View, Text, StyleSheet } from "react-native"

const  History = () =>{
    return(
        <View style = {styles.container}>
            <Text>History</Text>
        </View>
    )
}
export default History

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
})