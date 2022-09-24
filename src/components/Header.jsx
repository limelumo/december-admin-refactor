import { LogoutOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { clearStorage } from '../utils/storage';

const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearStorage();
    navigate('/login');
  };

  return (
    <Container>
      <Title>
        <MenuUnfoldOutlined />
        <span>{props.pageName}</span>
      </Title>
      <Utils>
        <span>{props.userName}</span>
        <Logout onClick={handleLogout}>
          <LogoutOutlined />
          <span>로그아웃</span>
        </Logout>
      </Utils>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  height: 80px;
  background-color: #fff;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Title = styled.div`
  margin: auto 0;
  font-size: 18px;
  font-weight: 600;
  span {
    padding-left: 10px;
  }
`;

const Utils = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
const Logout = styled.button`
  outline: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;

  span {
    padding-left: 10px;
  }
`;
