import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  backgroundColor?: string,
}

const SpaceComponent = (props: Props) => {
  const {width, height, backgroundColor} = props;

  return (
    <View
      style={{
        width,
        height,
        backgroundColor
      }}
    />
  );
};

export default SpaceComponent;