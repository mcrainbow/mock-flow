import { atom } from '@reatom/core';
import type { UserState } from '@entities/user/lib';

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
  },
  isAuthed: false,
};

export const userInfoAtom = atom<UserState>(initialState, 'userInfoAtom');
