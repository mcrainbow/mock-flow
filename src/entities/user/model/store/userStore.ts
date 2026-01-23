import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UserState } from '@entities/user/lib';

interface UserStore extends UserState {
  // Actions
  setUser: (user: Partial<UserState['user']>) => void;
  setAuth: (isAuthed: boolean) => void;
  updateUserStats: (stats: {
    completed_interviews?: number;
    skipped_interviews?: number;
    started_interviews?: number;
  }) => void;
  incrementStartedInterviews: () => void;
  incrementCompletedInterviews: () => void;
  incrementSkippedInterviews: () => void;
  reset: () => void;
}

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    completed_interviews: 0,
    skipped_interviews: 0,
    started_interviews: 0,
  },
  isAuthed: false,
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Actions
        setUser: (userData) =>
          set((state) => ({
            user: { ...state.user, ...userData },
          }), false, 'setUser'),

        setAuth: (isAuthed) =>
          set({ isAuthed }, false, 'setAuth'),

        updateUserStats: (stats) =>
          set((state) => ({
            user: {
              ...state.user,
              ...stats,
            },
          }), false, 'updateUserStats'),

        incrementStartedInterviews: () =>
          set((state) => ({
            user: {
              ...state.user,
              started_interviews: state.user.started_interviews + 1,
            },
          }), false, 'incrementStartedInterviews'),

        incrementCompletedInterviews: () =>
          set((state) => ({
            user: {
              ...state.user,
              completed_interviews: state.user.completed_interviews + 1,
            },
          }), false, 'incrementCompletedInterviews'),

        incrementSkippedInterviews: () =>
          set((state) => ({
            user: {
              ...state.user,
              skipped_interviews: state.user.skipped_interviews + 1,
            },
          }), false, 'incrementSkippedInterviews'),

        reset: () =>
          set(initialState, false, 'reset'),
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthed: state.isAuthed,
        }),
      }
    )
  )
);

