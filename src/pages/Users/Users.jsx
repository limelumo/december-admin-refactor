import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import usersApi from '../../api/usersApi';
import { formatUsersData } from '../../utils/formatUsersData';
import {
  currentPageState,
  dataPerPageState,
  dataTotalCountState,
  originalDataState,
  usersDataState,
  userSettingDataState,
} from '../../utils/userListStore';
import UserList from './components/UserList';
import UserListPagination from './components/UserListPagination';
import UserMenu from './components/UserMenu';

const Users = () => {
  const currentPage = useRecoilValue(currentPageState);
  const dataPerPage = useRecoilValue(dataPerPageState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);
  const setUsersData = useSetRecoilState(usersDataState);

  const [userSettingData, setUserSettingData] = useRecoilState(userSettingDataState);

  useQueries([
    {
      queryKey: ['users', currentPage],
      queryFn: () => usersApi.getUsersData({ params: { _limit: dataPerPage, _page: currentPage } }),
      onSuccess: (res) => {
        setDataTotalCount(res.headers['x-total-count']);
        setUsersData(
          res.data.map((user) => {
            return {
              ...formatUsersData(user),
              is_active: userSettingData.find((el) => el.uuid === user.uuid)?.is_active,
              is_staff: userSettingData.find((el) => el.uuid === user.uuid)?.is_staff,
              allow_marketing_push: userSettingData.find((el) => el.uuid === user.uuid)?.allow_marketing_push,
              // TODO: 보유계좌 수
            };
          })
        );
      },
    },
    {
      queryKey: ['userSetting'],
      queryFn: () => usersApi.getUserSettingData(),
      onSuccess: (res) => setUserSettingData(res.data),
      keepPreviousData: true,
    },
  ]);

  return (
    <>
      <UserMenu />
      <UserList />
      <UserListPagination />
    </>
  );
};

export default Users;
