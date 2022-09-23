import { atom } from 'recoil';

export const usersDataState = atom({
  key: 'usersDataState',
  default: [],
});

export const userSettingDataState = atom({
  key: 'userSettingDataState',
  default: [],
});

// Pagination
export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const dataTotalCountState = atom({
  key: 'dataTotalCountState',
  default: 0,
});

export const dataPerPageState = atom({
  key: 'dataPerPageState',
  default: 10,
});

// Modal
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    id: null,
    name: '',
    account_count: '',
    email: '',
    gender_origin: 0,
    birth_date: '',
    phone_number: '',
    last_login: '',
    allow_marketing_push: '',
    is_active: '',
    created_at: '',
  },
});
