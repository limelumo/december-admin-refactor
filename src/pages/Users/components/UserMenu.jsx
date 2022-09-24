import 'antd/dist/antd.css';

import { PageHeader, Select } from 'antd';
import usersApi from 'api/usersApi';
import useFormat from 'hooks/useFormat';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const UserMenu = () => {
  const [config, setConfig] = useState('');
  const [result, setResult] = useState(null);

  const { getFormatData } = useFormat(result);

  const { Option, OptGroup } = Select;

  const { refetch, isSuccess, data } = useQuery(['filter-user-data', config], () => usersApi.getSearchData(config), {
    enabled: false,
    staleTime: 2000,
  });

  useEffect(() => {
    if (config !== '') {
      refetch();
    }
  }, [config, refetch]);

  useEffect(() => {
    if (isSuccess) {
      setResult(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (result !== null) {
      getFormatData();
    }
  }, [result]);

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
    <MenuContainer title="고객 리스트" onBack={() => window.location.reload()}>
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
