import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AssignmentProgress = {
  answers: Record<string, number | string>;
  lastUpdated?: number;
};

type Store = {
  assignments: Record<string, AssignmentProgress>;
  setAnswer: (
    assignmentId: string,
    questionId: string,
    answer: number | string
  ) => void;
  clearAssignment: (assignmentId: string) => void;
};

export const useAssignmentStore = create<Store>()(
  persist(
    (set) => ({
      assignments: {},
      setAnswer: (assignmentId, questionId, answer) => {
        set((state) => {
          const currentAssignment = state.assignments[assignmentId] || {
            answers: {},
          };
          return {
            assignments: {
              ...state.assignments,
              [assignmentId]: {
                ...currentAssignment,
                answers: {
                  ...currentAssignment.answers,
                  [questionId]: answer,
                },
                lastUpdated: Date.now(),
              },
            },
          };
        });
      },
      clearAssignment: (assignmentId) => {
        set((state) => {
          const { [assignmentId]: _, ...rest } = state.assignments;
          return { assignments: rest };
        });
      },
    }),
    {
      name: 'assignment-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
