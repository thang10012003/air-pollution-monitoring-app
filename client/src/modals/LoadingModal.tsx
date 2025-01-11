import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import TextDefault from '../components/TextDefault';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visible, mess} = props;

  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={'#ffffff'} size={32} />
        <TextDefault color={'#ffffff'}> Loading</TextDefault>
      </View>
    </Modal>
  );
};

export default LoadingModal;