import { atom } from '@reatom/core';
import type { UserState } from '@entities/user/lib';

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

export const userInfoAtom = atom<UserState>(initialState, 'userInfoAtom');
