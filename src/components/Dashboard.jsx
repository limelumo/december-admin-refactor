import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';

import Header from './Header';
import { BankOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../assets/logo_white.png';
import userAPI from 'apis/userAPI';

const { Footer, Sider } = Layout;

const Dashboard = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const detailPath = useParams();
  const userDetail = detailPath.user_id;
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [pageName, setPageName] = useState('');

  const hadlePageName = () => {
    if (pathName === '/accounts') {
      return '계좌 목록';
    }
    if (pathName === '/users') {
      return '사용자 목록';
    }
  };

  const hadleUserDetailPageName = async (id) => {
    const userInfo = await userAPI.getOneUsersById(id);
    return userInfo;
  };

  useEffect(() => {
    const name = localStorage.getItem('userName');
    setUserName(name);

    if (Boolean(userDetail)) {
      hadleUserDetailPageName(userDetail)
        .then((response) => response)
        .then((data) => {
          const page = data.name + ' 님의 계좌 목록';
          setPageName(page);
        });
    }
    const page = hadlePageName();
    setPageName(page);
  }, [location]);

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
        <Menu theme="dark" defaultSelectedKeys={['accounts']} mode="inline">
          <Menu.Item key="accounts">
            <BankOutlined />
            <span>계좌 목록</span>
            <Link to="/accounts" />
          </Menu.Item>
          <Menu.Item key="users">
            <UserOutlined />
            <span>사용자 목록</span>
            <Link to="/users" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header userName={userName} pageName={pageName} />
        <Outlet />
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
