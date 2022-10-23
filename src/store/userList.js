import { atom } from 'recoil';

export const usersDataState = atom({
  key: 'usersDataState',
  default: [],
});

export const userSettingDataState = atom({
  key: 'userSettingDataState',
  default: [],
});

export const accountsState = atom({
  key: 'accountsState',
  default: [],
});

// Pagination
export const dataTotalCountState = atom({
  key: 'dataTotalCountState',
  default: 0,
});

