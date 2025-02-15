import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Row from './Row';
import TextDefault from './TextDefault';
interface Props {
    isScroll?: boolean;
    title?: string;
    children: ReactNode;
    back?: boolean;
  }
const ContainerComponent = (props: Props) => {

    const {children, isScroll, title, back} = props;

    const navigation: any = useNavigation();
    const headerComponent = () => {
        return (
        <View style={{flex:1}}>
            {(title || back) && (
                <Row
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                    minWidth: 48,
                    minHeight: 48,
                    justifyContent: 'flex-start',
                    alignItems:'center',
                    // backgroundColor:'blue', 
                    columnGap: 70,
                }}>
                    {back && (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{marginRight: 12}}>
                            <AntDesign size={32} color={Colors.light.text} name='arrowleft' />
                        </TouchableOpacity>
                    )}
                    {title ? (
                    <TextDefault
                        size={24}
                        bold
                        style={{color: Colors.light.text}}
                    >{title}</TextDefault>
                    ) : (
                    <></>
                    )}
                </Row>
            )}
            {returnContainer}
        </View>
        );
    };
    const returnContainer = isScroll ? (
        <ScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={{flex: 1}}>{children}</View>
    );
    
  return (
    <SafeAreaView 
        style={{ 
            flex: 1,
            // backgroundColor:'#B8DCE3'
            backgroundColor:'white'
        }}
    >
        {headerComponent()}
    </SafeAreaView>
  )
}

export default ContainerComponent