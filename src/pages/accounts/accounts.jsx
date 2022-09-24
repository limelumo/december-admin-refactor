import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Api from '../../api/api';
import { COLUMNS } from './accounts.constants';
import { formatAccountData } from './accounts.utils';

const { Search } = Input;

const Accounts = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accounts, setAccounts] = useState();

  const [accountsData, usersData] = useQueries([
    {
      queryKey: ['accounts'],
      queryFn: () => Api.getAllAccounts(),
      staleTime: 180000,
    },
    {
      queryKey: ['users'],
      queryFn: () => Api.getAllUsers(),
      staleTime: 180000,
    },
  ]);

  const accountSearchResult = useQuery(
    ['account-search-result', searchInput],
    () => Api.getAllAccounts({ q: searchInput }),
    {
      enabled: searchInput !== '',
      staleTime: 180000,
    }
  );

  const handleSearchInput = (input) => {
    setSearchInput(input.trim());
  };

  useEffect(() => {
    if (searchInput === '' && accountsData.isSuccess && usersData.isSuccess) {
      setAccounts(
        accountsData.data.map((account, i) => {
          const { user_id } = account;
          const userName = usersData.data?.find((el) => el.id === user_id)?.name;
          return {
            key: i,
            ...formatAccountData(account),
            user_name: <Link to={`/user/${user_id}`}>{userName}</Link>,
          };
        })
      );
    }
  }, [accountsData, usersData, searchInput]);

  useEffect(() => {
    const { isSuccess, data } = accountSearchResult;
    if (isSuccess) {
      setAccounts(() =>
        data?.map((account, i) => {
          const { user_id } = account;
          const userName = usersData.data?.find((el) => el.id === user_id)?.name;
          return {
            key: i,
            ...formatAccountData(account),
            user_name: <Link to={`/user/${user_id}`}>{userName}</Link>,
          };
        })
      );
    }
  }, [accountSearchResult.isSuccess, accountSearchResult.data]);

  return (
    <>
      {accountsData?.isLoading || usersData?.isLoading ? (
        <div>Loading...</div>
      ) : accountsData?.isError || usersData?.isError ? (
        <>
          <div>{accountsData?.isError && accountsData.error.message}</div>
          <div>{usersData?.isError && usersData.error.message}</div>
        </>
      ) : (
        <>
          <Search
            placeholder="검색어를 입력하세요"
            allowClear
            onSearch={handleSearchInput}
            style={{ width: 240, marginBottom: '20px' }}
          />
          <Table
            columns={COLUMNS}
            dataSource={accounts}
            scroll={{
              x: 1500,
            }}
            sticky
            style={{ whiteSpace: 'nowrap' }}
          />
        </>
      )}
    </>
  );
};

export default Accounts;
