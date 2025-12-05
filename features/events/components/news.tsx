import React, { useState } from 'react';
import { View } from 'react-native';
import { FetchEvents } from './fetch-events';

const LIMIT = 20;
export const News = () => {
  const [page, setPage] = useState(1);
  const onEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <View style={{ flex: 1 }}>
      <FetchEvents limit={LIMIT} page={page} onEndReached={onEndReached} />
    </View>
  );
};
