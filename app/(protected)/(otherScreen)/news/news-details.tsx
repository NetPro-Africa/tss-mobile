import { Colors } from '@/constants/Colors';
import { useNews } from '@/features/events/store/useNews';
import { Spacer } from '@/features/shared/components/spacer';
import { ThemedView } from '@/features/shared/components/ThemedView';
import {
  BoldText,
  MediumText,
  NormalText,
} from '@/features/shared/components/typography';
import { Header } from '@/features/shared/components/ui/header';
import { Stack } from '@/features/shared/components/ui/stack';

import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

const NewsDetails = () => {
  const news = useNews((state) => state.news);
  const colorScheme = useColorScheme();
  const titleColor = Colors[colorScheme ?? 'light'].title;
  const textColor = Colors[colorScheme ?? 'light'].text;
  return (
    <View>
      <Header />
      <BoldText>Details</BoldText>
      <Spacer />
      <ThemedView style={styles.container}>
        <Stack gap={12}>
          <MediumText style={[styles.title, { color: titleColor }]}>
            {news?.title}
          </MediumText>
          <NormalText style={{ color: textColor }}>{news?.content}</NormalText>
        </Stack>
      </ThemedView>
    </View>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
  },
});
