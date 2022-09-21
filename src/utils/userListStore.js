import { atom } from 'recoil';


export const usersDataState = atom({
  key: 'usersDataState',
  default: [],
});

export const currentPageState = atom({
  key: 'currentPageState',
  default: 0,
});

export const dataTotalCountState = atom({
  key: 'dataTotalCountState',
  default: 0,
});

export const dataPerPageState = atom({
  key: 'dataPerPageState',
  default: 10,
});