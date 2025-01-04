import { View, Text, KeyboardType, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactNode, useState } from 'react'
import {AntDesign, FontAwesome} from '@expo/vector-icons/'
import Colors from '../constants/Colors'


interface Props {
    value: string;
    onChange: (val: string) => void;
    affix?: ReactNode;
    placeholder?: string;
    suffix?: ReactNode;
    isPassword?: boolean;
    allowClear?: boolean;
    type?: KeyboardType;
    onEnd?: () => void;
    nameInput?: string,
  }

const InputComponent = (props: Props) => {
    const {
        value,
        onChange,
        affix,
        suffix,
        placeholder,
        isPassword,
        allowClear,
        type,
        onEnd,
        nameInput,
        } = props;
    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

    return (
        <View style={[styles.inputContainer]}>
            {nameInput && (
                <Text style = {styles.nameInput}>
                    {nameInput}
                </Text>
            )}
            {affix ?? affix}
            <TextInput
                style={[styles.input, {fontSize: 18}]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={
                isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
                }>
                {isPassword ? (
                <FontAwesome
                    name={isShowPass ? 'eye-slash' : 'eye'}
                    size={22}
                    color={Colors.light.greyBlack}
                />
                ) : (
                value.length > 0 &&
                allowClear && (
                    <AntDesign name="close" size={22} color={Colors.light.greyBlack} />
                )
                )}
            </TouchableOpacity>
        </View>
    )
}

export default InputComponent


const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      borderRadius: 20,
      borderWidth: 4,
      borderColor: Colors.light.grey,  
      width: '100%',
      minHeight: 56,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: Colors.light.white,
      marginBottom: 19,
    },
  
    input: {
      padding: 0,
      margin: 0,
      flex: 1,
      paddingHorizontal: 14,
      color: Colors.light.text,
    },
    nameInput:{
        position: 'absolute',
        left: 15,
        top: -22,
        fontSize: 16,
        fontWeight: 'bold',
    }
  });