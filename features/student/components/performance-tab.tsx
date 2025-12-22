import { SegmentedControl } from '@/components/segmented-control';
import { Colors } from '@/constants/Colors';
import { MediumText } from '@/features/shared/components/typography';
import * as React from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FetchCa } from './fetch-ca';
import { ResultSheet } from './result-sheet';

export function PerformanceTab() {
  const [value, setValue] = React.useState<'assessment' | 'result'>(
    'assessment'
  );
  const colorScheme = useColorScheme();
  const purpleColor = Colors[colorScheme ?? 'light'].question;
  const darkColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  return (
    <ScrollView>
      <View className="mb-8 ml-5">
        <SegmentedControl.Root
          value={value}
          onValueChange={(value) => setValue(value as 'assessment' | 'result')}
          className="border border-zinc-800 !bg-transparent rounded-lg p-1"
        >
          <SegmentedControl.Item
            value="assessment"
            className={`flex-1 py-3 px-4  transition-all !bg-transparent duration-200 ${
              value === 'assessment'
                ? `border-b-2 border-[${purpleColor}]`
                : 'border-b-2 border-transparent bg-transparent'
            }`}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <MediumText
                style={[
                  styles.container,
                  {
                    color: darkColor,
                  },
                ]}
              >
                CA
              </MediumText>
            </View>
          </SegmentedControl.Item>
          <SegmentedControl.Item
            value="result"
            className={`flex-1 py-3 px-4  bg-transparent transition-all duration-200 ${
              value === 'result'
                ? `border-b-2 border-[${purpleColor}]`
                : 'border-b-2 border-transparent'
            }`}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <MediumText
                style={[
                  styles.container,
                  {
                    color: darkColor,
                  },
                ]}
              >
                Result Sheet
              </MediumText>
            </View>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </View>
      {value === 'assessment' && <FetchCa />}
      {value === 'result' && <ResultSheet />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: RFValue(12),
  },
});
