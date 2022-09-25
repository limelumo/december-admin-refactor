import 'antd/dist/antd.css';

import { Input } from 'antd';
import usersApi from 'api/usersApi';
import UserAddForm from 'components/Users/UserAddForm';
import useFormat from 'hooks/useFormat';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataTotalCountState, usersDataState } from 'store/userList';
import styled from 'styled-components';

import User from './User';

const UserList = () => {
  const setDataTotalCount = useSetRecoilState(dataTotalCountState);
  const usersData = useRecoilValue(usersDataState);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [result, setResult] = useState(null);

  const { getFormatData } = useFormat(result);

  const { Search } = Input;

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

  return (
    <Section>
      <Wrapper>
        <Search
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onSearch={handleUserSearch}
          style={{ width: 280 }}
          allowClear
        />
        <UserAddForm />
      </Wrapper>

      <ListTable>
        <table>
          <Thead>
            <tr>
              <th>고객명</th>
              <th>보유 계좌수</th>
              <th>이메일</th>
              <th>성별코드</th>
              <th>생년월일</th>
              <th>휴대폰 번호</th>
              <th>최근 로그인</th>
              <th>혜택 수신 동의</th>
              <th>활성화</th>
              <th>가입일</th>
              <th>삭제</th>
            </tr>
          </Thead>

          <Tbody>
            {usersData.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </Tbody>
        </table>
      </ListTable>
    </Section>
  );
};

const Section = styled.section`
  padding: 0 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListTable = styled.div`
  max-width: 100%;
  position: relative;
  transition: opacity 0.3s;
  user-select: none;

  table {
    width: 100%;
    table-layout: auto;
    border-collapse: separate;
    text-align: center;
    border-spacing: 0;
    background-color: white;
  }
`;

const Thead = styled.thead`
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s ease;
  vertical-align: middle;
  overflow-wrap: break-word;

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;

    th {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      text-align: center;
      padding: 16px;
      border-right: 1px solid #f0f0f0;
    }
  }
`;

const Tbody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  overflow-wrap: break-word;
`;

export default React.memo(UserList);
