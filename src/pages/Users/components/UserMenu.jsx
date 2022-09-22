import 'antd/dist/antd.css';

import { Input, PageHeader, Search, Select, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { currentPageState, dataPerPageState, dataTotalCountState, usersDataState } from '../../../utils/userListStore';

const UserMenu = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const [usersData, setUsersData] = useRecoilState(usersDataState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);

  const currentPage = useRecoilValue(currentPageState);
  const dataPerPage = useRecoilValue(dataPerPageState);

  const { Search } = Input;
  const { Option, OptGroup } = Select;

  const getSearchData = async (searchKeyword) => await axios.get('/users', { params: { q: searchKeyword } });

  const { refetch: searchRefetch } = useQuery(['search-user-data', searchKeyword], () => getSearchData(searchKeyword), {
    onSuccess: (res) => {
      // TODO: setQueryData?
      setUsersData(res.data);
      setDataTotalCount(res.headers['x-total-count']);
    },
    enabled: false,
  });

  const handleUserSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword); // TODO: keyword 셋팅 후 refetch 실행
    searchRefetch(searchKeyword);
  };

  // select
  const getUsersData = async (currentPage) => {
    const response = await axios.get('/users', {
      params: {
        _limit: dataPerPage,
        _page: `${currentPage}`,
        // ${value}: 'true',
      },
    });
    return response;
  };

  const { refetch: selectRefetch } = useQuery(['usersData', currentPage], () => getUsersData(currentPage), {
    onSuccess: (res) => {
      setUsersData(res.data);
      setDataTotalCount(res.headers['x-total-count']);
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    selectRefetch();
  };

  return (
    <MenuContainer title="고객 리스트">
      <Space direction="vertical">
        <Search placeholder="검색어를 입력하세요" allowClear onSearch={handleUserSearch} style={{ width: 240 }} />
      </Space>

      <Select
        defaultValue="활성 고객"
        style={{
          width: 200,
        }}
        onChange={handleChange}
      >
        <OptGroup label="활성화">
          <Option value="is_active">활성 고객</Option>
          <Option value="비활성 고객">비활성 고객</Option>
        </OptGroup>

        <OptGroup label="임직원 계좌">
          <Option value="임직원 계좌 고객">임직원 계좌 보유 고객</Option>
          <Option value="임직원 계좌 미보유 고객">임직원 계좌 미보유 고객</Option>
        </OptGroup>
      </Select>
    </MenuContainer>
  );
};

const MenuContainer = styled(PageHeader)`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(235, 237, 240);
  margin-bottom: 2em;
  user-select: none;

  .ant-input-group-wrapper {
    display: block;
  }
`;

export default UserMenu;
