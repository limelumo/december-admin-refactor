import 'antd/dist/antd.css';

import { Button, Input, PageHeader } from 'antd';
import usersApi from 'api/usersApi';
import useFormat from 'hooks/useFormat';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountsState, dataTotalCountState, usersDataState, userSettingDataState } from 'store/userList';
import styled from 'styled-components';
import { formatUsersData } from 'utils/formatUsersData';

import UserList from './components/UserList';

const Users = () => {
  const userSettingData = useRecoilValue(userSettingDataState);
  const accountsData = useRecoilValue(accountsState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);
  const setUserSettingData = useSetRecoilState(userSettingDataState);
  const setAccountsData = useSetRecoilState(accountsState);
  const setUsersData = useSetRecoilState(usersDataState);

  const [count, setCount] = useState(2);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [result, setResult] = useState(null);

  const queryClient = useQueryClient();

  const { getFormatData } = useFormat(result);

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

  const { refetch, isSuccess, data } = useQuery(
    ['search-user-data', searchKeyword],
    () => usersApi.getSearchData({ q: searchKeyword }),
    {
      enabled: false,
      staleTime: 2000,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setResult(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (result !== null) {
      getFormatData();
      setDataTotalCount(result.length);
      setSearchKeyword('');
    }
  }, [result]);

  const handleUserSearch = () => refetch();

  const handleAdd = () => {
    const newUserInfo = {
      key: count,
      name: `홍길동 ${count}`,
      account_count: 0,
      email: `hong${count}@test.com`,
      password: `hong${count}`,
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

        <Wrapper>
          <Input.Search
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={handleUserSearch}
            style={{ width: 280, marginRight: 16 }}
            allowClear
          />

          <Button onClick={handleAdd} type="primary">
            새로운 고객 추가
          </Button>
        </Wrapper>
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

const Wrapper = styled.div`
  margin-right: 24px;
`;

export default Users;
