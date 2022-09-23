import 'antd/dist/antd.css';

import { PageHeader, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import usersApi from '../../../api/usersApi';
import { dataTotalCountState, usersDataState } from '../../../utils/userListStore';

const UserMenu = () => {
  const setDataTotalCount = useSetRecoilState(dataTotalCountState);
  const setUsersData = useSetRecoilState(usersDataState);

  const [config, setConfig] = useState('');

  const navigate = useNavigate();

  const { Option, OptGroup } = Select;

  const { refetch: filterRefetch } = useQuery(
    ['filter-user-data', config],
    () => usersApi.getSearchData({ params: config }),
    {
      onSuccess: (res) => {
        setUsersData(res.data);
        setDataTotalCount(res.headers['x-total-count']);
      },
      enabled: false,
      staleTime: 2000,
    }
  );

  useEffect(() => {
    if (config !== '') {
      filterRefetch();
    }
  }, [config, filterRefetch]);

  const handleChange = (value) => {
    if (value === '활성') {
      setConfig({ is_active: true });
    }
    if (value === '비활성') {
      setConfig({ is_active: false });
    }
    if (value === '보유') {
      setConfig({ is_staff: true });
    }
    if (value === '미보유') {
      setConfig({ is_staff: false });
    }
  };

  return (
    <MenuContainer title="고객 리스트">
      <Select defaultValue="Filter" style={{ width: 200 }} onChange={handleChange}>
        <OptGroup label="활성화">
          <Option value="활성">활성 고객</Option>
          <Option value="비활성">비활성 고객</Option>
        </OptGroup>

        <OptGroup label="임직원 계좌">
          <Option value="보유">임직원 계좌 보유 고객</Option>
          <Option value="미보유">임직원 계좌 미보유 고객</Option>
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
