import { atom } from 'recoil';

export const loginUser = atom({
  key: 'userName',
  default: '',
});
