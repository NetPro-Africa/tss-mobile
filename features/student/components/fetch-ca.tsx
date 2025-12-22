import { Colors } from '@/constants/Colors';
import { MageFilter } from '@/features/shared/components/icon/filter-icon';
import { LoadingBar } from '@/features/shared/components/loading-bar';
import { LoadingCard } from '@/features/shared/components/loading-card';
import { LoadingLists } from '@/features/shared/components/loading-lists';
import { Spacer } from '@/features/shared/components/spacer';
import { CustomPressable } from '@/features/shared/components/ui/custom-pressable';
import { Stack } from '@/features/shared/components/ui/stack';
import { Wrapper } from '@/features/shared/components/ui/wrapper';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { useGetCA } from '../api/use-get-ca';
import { useGetClasses } from '../api/use-get-classes';
import { useGetSession } from '../api/use-get-session';
import { useGetTerms } from '../api/user-get-terms';
import { useStudent } from '../store/useStudent';
import { TermSingleType } from '../types';
import { BottomSheetComponent } from './bottom-sheet';
import { RenderCAs } from './render-ca';

const { width } = Dimensions.get('window');
export const FetchCa = () => {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const borderColor = Colors[colorScheme ?? 'light'].cardBorder;
  const student = useStudent((state) => state.student);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const {
    data: terms,
    isPending: isPendingTerms,
    isError: isErrorTerms,
  } = useGetTerms({ regnum: student?.regnum as string });
  const {
    data: sessionData,
    isError: isErrorSession,
    isPending: isPendingSession,
  } = useGetSession();
  const {
    data: classData,
    isError: isClassError,
    isPending: isClassPending,
  } = useGetClasses();
  const [value, setValue] = useState('');
  const [session, setSession] = useState(sessionData?.data[0] || '');
  const [singleClass, setSingleClass] = useState(classData?.data[0] || '');
  const [term, setTerm] = useState<TermSingleType>(
    (terms?.data[0] as TermSingleType) ?? 'First Term'
  );

  useEffect(() => {
    if (sessionData?.data.length) {
      setSession(sessionData.data[0]);
    }

    if (classData?.data.length) {
      setSingleClass(classData.data[0]);
    }
  }, [classData?.data, sessionData?.data]);
  const { data, isPending, isError, refetch, isRefetching } = useGetCA({
    classname: singleClass!,
    session,
    term,
    regnum: student?.regnum!,
  });
  const onRefresh = () => {
    refetch();
  };
  const reset = useCallback(() => {
    setSingleClass(classData?.data[0] || '');
    setSession(sessionData?.data[0] || '');
    setTerm((terms?.data[0] as TermSingleType) ?? 'First Term');
  }, [classData?.data, sessionData?.data, terms?.data]);

  if (isError || isErrorSession || isErrorTerms || isClassError) {
    throw new Error('Error fetching data');
  }

  if (isPending || isPendingSession || isPendingTerms || isClassPending) {
    return (
      <Wrapper>
        <LoadingBar />
        <Spacer size={5} />
        <LoadingLists
          horizontal={false}
          renderItem={() => <LoadingCard width={width - 30} height={200} />}
        />
      </Wrapper>
    );
  }

  const dataToRender =
    data?.data.filter((item) =>
      item.subjectName.toLowerCase().includes(value.toLowerCase())
    ) || [];

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Wrapper>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={10}
          alignItems="center"
          style={{ alignItems: 'center' }}
        >
          <View style={[styles.inputContainer, { borderColor }]}>
            <Ionicons
              name="search"
              size={25}
              color={iconColor}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder={'Search by subject name...'}
              style={[styles.input, { color: textColor }]}
              placeholderTextColor={textColor}
              value={value}
              onChangeText={setValue}
              autoCapitalize="none"
            />
          </View>
          <CustomPressable
            onPress={handlePresentModalPress}
            style={{ marginBottom: 15 }}
          >
            <MageFilter size={24} color={iconColor} />
          </CustomPressable>
        </Stack>
        <RenderCAs
          data={dataToRender}
          refetch={onRefresh}
          isRefetching={isRefetching}
        />
      </Wrapper>
      <BottomSheetComponent
        ref={bottomSheetModalRef}
        session={session}
        setSession={setSession}
        sessions={sessionData?.data || []}
        terms={terms?.data || []}
        setTerm={setTerm}
        term={term}
        classes={classData?.data || []}
        setClass={setSingleClass}
        singleClass={singleClass}
        reset={reset}
        onPress={() => {
          bottomSheetModalRef.current?.dismiss();
          refetch();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'NunitoRegular',
    fontSize: 15,
  },
  inputContainer: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
