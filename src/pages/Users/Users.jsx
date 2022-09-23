import usersApi from 'api/usersApi';
import { useQueries } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formatUsersData } from 'utils/formatUsersData';
import {
  currentPageState,
  dataPerPageState,
  dataTotalCountState,
  usersDataState,
  userSettingDataState,
} from 'utils/userListStore';

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
              is_active: userSettingData.find((el) => el.uuid === user.uuid)?.is_active, //TODO: 결과값 여러개 -> userData와 같은 uuid와 object 합치기..
              is_staff: userSettingData.find((el) => el.uuid === user.uuid)?.is_staff, // TODO: 결과값 여러개 -> userData와 같은 uuid와 object 합치기..
              allow_marketing_push: userSettingData.find((el) => el.uuid === user.uuid)?.allow_marketing_push, //TODO: 결과값 여러개 -> userData와 같은 uuid와 object 합치기..
              // TODO: 보유계좌 수 : accounts에 user_id가 같은 갯수 count하여 설정
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
