import type { UserInfo } from './UserInfo';

export interface UserState {
  user: UserInfo;
  isAuthed: boolean;
}
