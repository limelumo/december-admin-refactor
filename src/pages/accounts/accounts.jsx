import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import { Link } from 'react-router-dom';

import Api from '../../api/api';
import { COLUMNS } from './accounts.constants';
import { formatAccountData } from './accounts.utils';

/**
 * - 표기되어야 하는 정보
    - @todo 특정 계좌를 누르면 계좌의 상세화면으로 이동합니다. ??? 계좌 id를 어떻게 해야할까 ???
    - @todo 계좌 수정 기능
    - @todo 목록에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다.
    - @todo 리스트 페이지에서는 검색이 가능해야 합니다.
        - `json-server` 의 Full-text Search API 를 사용하여 구현합니다.
    - @todo 페이지네이션이 되어야 합니다.
        - `json-server` 의 Paginate API 를 사용하여 구현합니다.
 */
const Accounts = () => {
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

  useEffect(() => {
    if (accountsData.isSuccess && usersData.isSuccess) {
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
  }, [accountsData, usersData]);

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
