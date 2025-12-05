import React from 'react';
import { View } from 'react-native';
import { FetchEvents } from './fetch-events';

export const News = () => {
  return (
    <View style={{ flex: 1 }}>
      <FetchEvents />
    </View>
  );
};
