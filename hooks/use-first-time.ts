import { create } from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type Store = {
  isFirstTime: boolean;
  setFirstTime: () => void;
};

export const useFirstTime = create<Store>()(
  persist(
    (set) => ({
      isFirstTime: true,
      setFirstTime: () => {
        set({ isFirstTime: false });
      },
    }),
    { name: 'isFirstTime', storage: createJSONStorage(() => AsyncStorage) }
  )
);
