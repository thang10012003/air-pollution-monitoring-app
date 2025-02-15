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
        <View style={{flex: 1, paddingTop: 30}}>
            {(title || back) && (
                <Row
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    minWidth: 48,
                    minHeight: 48,
                    justifyContent: 'flex-start',
                    flex: 1,
                    backgroundColor:'blue'
                }}>
                    {back && (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{marginRight: 12}}>
                            <AntDesign size={24} color={Colors.light.text} name='arrowleft' />
                        </TouchableOpacity>
                    )}
                    {title ? (
                    <TextDefault
                        size={16}
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
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={{flex: 1}}>{children}</View>
    );
    
  return (
    <SafeAreaView style={{justifyContent: 'center', alignItems:'center', flex: 1}}>
        {headerComponent()}
    </SafeAreaView>
  )
}

export default ContainerComponent