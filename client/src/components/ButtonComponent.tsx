import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
  } from 'react-native';
  import React, {ReactNode} from 'react';
  import TextDefault from './TextDefault';
  import Colors from '../constants/Colors';
  
  interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    textFont?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
  }
  
  const ButtonComponent = (props: Props) => {
    const {
      icon,
      text,
      textColor,
      textStyles,
      color,
      styles,
      onPress,
      iconFlex,
      type,
      disable,
    } = props;
  
    return type === 'primary' ? (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          disabled={disable}
          onPress={onPress}
          style={[

            {
              backgroundColor: color,
              marginBottom: 17,
              width: '90%',
            },
            styles,
          ]}>
          {icon && iconFlex === 'left' && icon}
          <TextDefault  
            color={textColor ?? Colors.light.white}
            style={[
              textStyles,
              {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center',
              },
            ]}
          >
            {text}
          </TextDefault>
          {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={onPress}>
        <TextDefault
          color={type === 'link' ? Colors.light.text : Colors.light.textSecond}
        >
        {text}
        </TextDefault>
      </TouchableOpacity>
    );
  };
  
  export default ButtonComponent;