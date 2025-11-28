import { RotatingSquaresSpinner } from '@/components/loaders';
import React from 'react';
import { Modal, View } from 'react-native';

type Props = {
  visible: boolean;
};

export const LoadingModal = ({ visible }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <RotatingSquaresSpinner />
      </View>
    </Modal>
  );
};
