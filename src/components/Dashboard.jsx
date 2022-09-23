import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/storage';
import { PieChartOutlined, BankOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../assets/logo_white.png';
import styled from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pageName, setPageName] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  // useEffect(()=>{
  //   if(pathname === 'users') {
  //     setPageName('사용자 목록')
  //   }
  // });

  const handleLogout = () => {
    clearStorage();
    navigate('/');
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" style={{ padding: 24 }}>
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" onClick={(info)=>{
          setPageName(info.key)
        }}>
          <Menu.Item key="1" name="dashboard">
            <PieChartOutlined />
            <span>대시보드</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item key="2" name="accounts">
            <BankOutlined />
            <span>계좌 목록</span>
            <Link to="/accounts" />
          </Menu.Item>
          <Menu.Item key="3" name="users">
            <UserOutlined />
            <span>사용자 목록</span>
            <Link to="/users" />
          </Menu.Item>
          <Logout onClick={handleLogout}>
            <LogoutOutlined />
            <span>로그아웃</span>
          </Logout>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
          title={pageName}
        />
        <Content
          style={{
            margin: '16px',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

const Logout = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 14px;
  outline: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;

  span {
    padding-left: 10px;
  }

  &:hover {
    color: #fff;
  }
`;
