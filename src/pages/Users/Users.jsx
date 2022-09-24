import usersApi from 'api/usersApi';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formatUsersData } from 'utils/formatUsersData';
import {
  accountsState,
  currentPageState,
  dataTotalCountState,
  usersDataState,
  userSettingDataState,
} from 'utils/userListStore';

import UserList from './components/UserList';
import UserListPagination from './components/UserListPagination';
import UserMenu from './components/UserMenu';

const Users = () => {
  const currentPage = useRecoilValue(currentPageState);

  const [usersData, setUsersData] = useRecoilState(usersDataState);
  const [userSettingData, setUserSettingData] = useRecoilState(userSettingDataState);
  const [accountsData, setAccountsData] = useRecoilState(accountsState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);

  const { data: accounts } = useQuery(['accounts'], usersApi.getAccountsData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    onSuccess: (res) => setAccountsData(res.data),
  });

  const { data: userSetting } = useQuery(['userSetting'], usersApi.getUserSettingData, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    // eslint-disable-next-line no-implicit-coercion
    enabled: !!accounts,
    onSuccess: (res) => setUserSettingData(res.data),
  });

  // params를 비워두고 재활용

 useQuery(
    ['users', currentPage],
    () => usersApi.getUsersData({ _limit: 10, _page: currentPage }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      // eslint-disable-next-line no-implicit-coercion
      enabled: !!userSetting,
      onSuccess: (res) => {
        setDataTotalCount(res.headers['x-total-count']);

        const accountsUserId = accountsData.map((el) => el.user_id);
        const accountsMatched = accountsUserId.reduce((accu, curr) => {
          accu[curr] = (accu[curr] || 0) + 1;
          return accu;
        }, {});

        setUsersData(
          res.data.map((user) => {
            return {
              is_active: userSettingData?.find((el) => el.uuid === user.uuid)?.is_active,
              is_staff: userSettingData?.find((el) => el.uuid === user.uuid)?.is_staff,
              allow_marketing_push: userSettingData?.find((el) => el.uuid === user.uuid)?.allow_marketing_push,
              account_count: accountsMatched[user.id],
              ...formatUsersData(user),
            };
          })
        );
      },
    }
  );

  return (
    <>
      <UserMenu />
      <UserList />
      <UserListPagination />
    </>
  );
};

export default Users;
