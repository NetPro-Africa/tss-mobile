import { SegmentedControl } from '@/components/segmented-control';
import { Colors } from '@/constants/Colors';
import { MediumText } from '@/features/shared/components/typography';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FetchAssignments } from './fetch-assignments';
type Value = 'pending' | 'completed' | 'elapsed';
export function AssignmentTabs() {
  const [value, setValue] = React.useState<Value>('pending');
  const colorScheme = useColorScheme();
  const purpleColor = Colors[colorScheme ?? 'light'].question;
  const darkColor = Colors[colorScheme ?? 'light'].tabIconDefault;

  return (
    <View className="flex-1">
      <View className="mb-4 px-[15px]">
        <SegmentedControl.Root
          value={value}
          onValueChange={(value) => setValue(value as Value)}
          className="border border-zinc-800 items-center  rounded-sm p-1"
        >
          <SegmentedControl.Item
            value="pending"
            className={`flex-1 py-3 px-4  transition-all !bg-transparent duration-200 ${
              value === 'pending'
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
                Pending
              </MediumText>
            </View>
          </SegmentedControl.Item>
          <SegmentedControl.Item
            value="completed"
            className={`flex-1 py-3 px-4  bg-transparent transition-all duration-200 ${
              value === 'completed'
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
                Completed
              </MediumText>
            </View>
          </SegmentedControl.Item>
          <SegmentedControl.Item
            value="elapsed"
            className={`flex-1 py-3 px-4  bg-transparent transition-all duration-200 ${
              value === 'elapsed'
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
                Elapsed
              </MediumText>
            </View>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </View>
      <View className="px-[15px] flex-1 pb-[100px]">
        {value === 'pending' && <FetchAssignments status={value} navigate />}
        {value === 'completed' && (
          <FetchAssignments status={value} navigate={false} />
        )}
        {value === 'elapsed' && (
          <FetchAssignments status={value} navigate={false} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: RFValue(12),
  },
});
