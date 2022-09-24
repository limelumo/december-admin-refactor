import { atom } from 'recoil';

const randomNum = Math.random() + Date.now().toString();

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
export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const dataTotalCountState = atom({
  key: 'dataTotalCountState',
  default: 0,
});

// Modal
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    id: null,
    uuid: randomNum,
    name: '',
    account_count: '',
    email: '',
    gender_origin: 0,
    birth_date: '',
    phone_number: '',
    last_login: '',
    allow_marketing_push: true,
    is_active: true,
    is_staff: true,
    created_at: '',
  },
});
