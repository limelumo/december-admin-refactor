import 'antd/dist/antd.css';

import { Button, PageHeader } from 'antd';
import usersApi from 'api/usersApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accountsState,
  currentPageState,
  dataTotalCountState,
  usersDataState,
  userSettingDataState,
} from 'store/userList';
import styled from 'styled-components';
import { formatUsersData } from 'utils/formatUsersData';

import UserList from './components/UserList';

const Users = () => {
  const currentPage = useRecoilValue(currentPageState);
  const userSettingData = useRecoilValue(userSettingDataState);
  const accountsData = useRecoilValue(accountsState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);
  const setUserSettingData = useSetRecoilState(userSettingDataState);
  const setAccountsData = useSetRecoilState(accountsState);
  const setUsersData = useSetRecoilState(usersDataState);

  const queryClient = useQueryClient();

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

  // useQuery(['users', currentPage], () => usersApi.getUsersData({ _limit: 10, _page: currentPage }), {
  useQuery(['users'], () => usersApi.getUsersData(), {
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
        res.data?.map((user) => {
          return {
            is_active: userSettingData?.find((el) => el.uuid === user.uuid)?.is_active.toString(),
            is_staff: userSettingData?.find((el) => el.uuid === user.uuid)?.is_staff.toString(),
            allow_marketing_push: userSettingData?.find((el) => el.uuid === user.uuid)?.allow_marketing_push.toString(),
            account_count: accountsMatched[user.id],
            ...formatUsersData(user),
          };
        })
      );
    },
  });

  const { mutate: addMutate } = useMutation((newUserInfo) => usersApi.addNewUserData(newUserInfo), {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const handleAdd = () => {
    const newUserInfo = {
      key: count,
      name: `홍길동 ${count}`,
      account_count: 0,
      email: `abc${count}@test.com`,
      password: `test${count}`,
      gender_origin: 0,
      birth_date: new Date().toISOString(),
      phone_number: '010-0000-0000',
      last_login: new Date().toISOString(),
      allow_marketing_push: 'false',
      is_active: 'false',
      created_at: new Date().toISOString(),
    };

    addMutate(newUserInfo);
    setCount(count + 1);
  };

  return (
    <>
      <Section>
        <PageHeader title="고객 리스트" onBack={() => window.location.reload()} />
        <Button onClick={handleAdd} type="primary" style={{ marginRight: 24 }}>
          새로운 고객 추가
        </Button>
      </Section>

      <UserList />
    </>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export default Users;
