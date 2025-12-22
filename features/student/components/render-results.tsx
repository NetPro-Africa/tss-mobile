import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Menu } from '@/features/shared/components/menu';
import { useGetSession, useGetTerms } from '../api/use-get-terms';
import { Results } from './results';

export const RenderResults = () => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  const {
    data: terms,
    isPending: isTermPending,
    isError: isTermError,
  } = useGetTerms();

  const {
    data: sessions,
    isPending: isSessionPending,
    isError: isSessionError,
  } = useGetSession();

  const { width } = useWindowDimensions();

  if (isTermError || isSessionError) {
    throw new Error('Failed to load results');
  }

  const cardWidth = width - 30;
  if (isTermPending || isSessionPending) {
    return (
      <LoadingLists
        renderItem={() => <LoadingCard height={200} width={cardWidth} />}
        length={10}
      />
    );
  }

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.menuContainer}>
        <Menu
          data={terms.semesters.map((term) => ({
            label: term.name,
            value: term.id.toString(),
          }))}
          onSelect={setSelectedTerm}
          selectedValue={selectedTerm}
        />
        <Menu
          data={sessions.sessions.map((session) => ({
            label: session.name,
            value: session.id.toString(),
          }))}
          onSelect={setSelectedSession}
          selectedValue={selectedSession}
        />
      </View>
      <Results
        selectedTerm={selectedTerm || terms.semesters[0].id.toString()}
        selectedSession={selectedSession || sessions.sessions[0].id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
